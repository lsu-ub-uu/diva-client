import { Button } from '@/components/Button/Button';
import { Pagination } from '@/components/Form/Pagination';
import { ComboboxSelect } from '@/components/FormGenerator/components/ComboboxSelect';
import { Fieldset } from '@/components/Input/Fieldset';
import { Input } from '@/components/Input/Input';
import { Breadcrumbs } from '@/components/Layout/Breadcrumbs/Breadcrumbs';
import { CircleFilledIcon, CloseIcon, FilterIcon, SearchIcon } from '@/icons';
import type { BFFSearchResult } from '@/types/record';
import { useState } from 'react';
import css from './divaOutputSearch.css?url';
import { FieldInfo } from '@/components/FieldInfo/FieldInfo';

export const links = () => [{ rel: 'stylesheet', href: css }];

export const loader = async () => {
  return {
    breadcrumb: 'Publikationer',
  };
};

export default function DivaOutputSearch() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
  const [skansenFilter, setSkansenFilter] = useState(false);
  const [fakultetenFilter, setFakultetenFilter] = useState(false);
  return (
    <div className='search-page'>
      <main>
        <Breadcrumbs />

        <h1>Publikationer</h1>

        <div className='main-search'>
          <Fieldset
            className='search-fieldset'
            label='Sök efter publikationer'
            info={{
              title: 'genericSearchTextVarText',
              body: 'genericSearchTextVarDefText',
            }}
            size='large'
          >
            <Input
              type='search'
              placeholder='Sök på titel, abstract, författare, nyckelord, organisation, utgivningsår, förlag, ISBN, DOI med mera.'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className='search-button' type='submit' aria-label='Sök'>
              <SearchIcon />
            </button>
          </Fieldset>
        </div>
        <div
          style={{
            marginTop: 'var(--gap-l)',
            display: 'flex',
            gap: 'var(--gap-l)',
            alignItems: 'center',
          }}
        >
          <div className='chips'>
            {(fakultetenFilter || skansenFilter) && <span>Aktiva filter:</span>}
            {fakultetenFilter && (
              <button
                className='chip'
                onClick={() => setFakultetenFilter(!fakultetenFilter)}
              >
                Organisation: <em>"Fakulteten för konst och samhälle"</em>{' '}
                <CloseIcon />
              </button>
            )}
            {skansenFilter && (
              <button
                className='chip'
                onClick={() => setSkansenFilter(!skansenFilter)}
              >
                Ämne: <em>"Skansen"</em> <CloseIcon />
              </button>
            )}
          </div>
          <Button
            className='filter-button'
            variant='secondary'
            onClick={() => setFiltersOpen(!filtersOpen)}
            style={
              fakultetenFilter || skansenFilter
                ? { color: 'var(--color-link)' }
                : {}
            }
          >
            <FilterIcon /> {filtersOpen ? 'Dölj filter' : 'Visa filter'}{' '}
            {(fakultetenFilter || skansenFilter) && (
              <CircleFilledIcon style={{ fontSize: '0.8rem' }} />
            )}
          </Button>
        </div>

        {(searchQuery || skansenFilter || fakultetenFilter) && (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 'var(--gap-xl)',
              }}
            >
              <h3>Din sökning gav 3 träffar</h3>
              <Pagination
                query={{
                  search: { rows: { value: 10 }, start: { value: 1 } },
                }}
                searchResults={
                  { fromNo: 1, toNo: 3, totalNo: 3 } as BFFSearchResult
                }
                onRowsPerPageChange={(e) => {}}
              />
            </div>
            <div className='search-results'>
              <div className='search-result-item'>
                <h2>1.</h2>
                <div>
                  <h3>
                    <a href='#'>Bröllopsföljet från Telemarken</a>
                  </h3>
                  <p>Anna Andersson, Bo Berg</p>
                  <p>2021 | Artikel i tidskrift</p>
                </div>
                <img src='https://placeholdit.com/300x400/ffffff/168ba5?text=PDF' />
              </div>
              <div className='search-result-item'>
                <h2>2.</h2>
                <div>
                  <h3>
                    <a href='#'>
                      Hjärtros och Svarten, Spira och Nyman: egennamn på kor,
                      hästar, getter och oxar i svenska boond- och herrgårdar
                      under 300 år
                    </a>
                  </h3>
                  <p>
                    Anna Andersson, Bo Berg, Cecilia Citron, Daniel Dalström,
                    et. al.
                  </p>
                  <p>2022 | Bok</p>
                </div>
                <img src='https://placeholdit.com/300x400/ffffff/168ba5?text=PDF' />
              </div>
              <div className='search-result-item'>
                <h2>3.</h2>
                <div>
                  <h3>
                    <a href='#'>
                      På höga hästar: hästen som maktmedel och statussymbol
                    </a>
                  </h3>
                  <p>Anna Andersson, Bo Berg</p>
                  <p>2016 | Kapitel i bok</p>
                </div>
                <img src='https://placeholdit.com/300x400/ffffff/168ba5?text=PDF' />
              </div>
            </div>
            <Pagination
              query={{
                search: { rows: { value: 10 }, start: { value: 1 } },
              }}
              searchResults={
                { fromNo: 1, toNo: 3, totalNo: 3 } as BFFSearchResult
              }
              onRowsPerPageChange={(e) => {}}
            />
          </>
        )}
      </main>
      <aside data-expanded={filtersOpen}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FilterIcon /> Filter{' '}
          <Button
            style={{ marginLeft: 'auto' }}
            variant='icon'
            onClick={() => setFiltersOpen(false)}
          >
            <CloseIcon />
          </Button>
        </h3>
        <Fieldset size='small' label='Ämne'>
          <ComboboxSelect
            options={[{ label: 'Skansen', value: 'skansen' }]}
            value={skansenFilter ? 'skansen' : ''}
            onChange={() => setSkansenFilter(!skansenFilter)}
          />
        </Fieldset>
        <Fieldset size='small' label='Organisation'>
          <ComboboxSelect
            options={[
              {
                label: 'Fakulteten för konst och samhälle',
                value: 'fakulteten-for-konst-och-samhälle',
              },
            ]}
            value={fakultetenFilter ? 'fakulteten-for-konst-och-samhälle' : ''}
            onChange={() => setFakultetenFilter(!fakultetenFilter)}
          />
        </Fieldset>
        <Fieldset size='small' label='Språk'>
          <ComboboxSelect
            options={[
              {
                label: '',
                value: 'all',
              },
            ]}
            value='all'
          />
        </Fieldset>
        <fieldset className='year-filter'>
          <legend>Utgivningsår</legend>
          <Input type='text' placeholder='Från' />
          –
          <Input type='text' placeholder='Till' />
        </fieldset>
        <Fieldset size='small' label='Publikationstyp'>
          <ComboboxSelect
            options={[
              {
                label: '',
                value: 'all',
              },
            ]}
            value='all'
          />
        </Fieldset>
        <Fieldset size='small' label='Typ av innehåll'>
          <ComboboxSelect
            options={[
              {
                label: '',
                value: 'all',
              },
            ]}
            value='all'
          />
        </Fieldset>
        <Fieldset size='small' label='Nyckelord'>
          <Input />
        </Fieldset>
        <Fieldset size='small' label='Hållbar utveckling'>
          <ComboboxSelect
            options={[
              {
                label: '',
                value: 'all',
              },
            ]}
            value='all'
          />
        </Fieldset>
        <Fieldset size='small' label='Nationell ämneskategori (SSIF)'>
          <ComboboxSelect
            options={[
              {
                label: '',
                value: 'all',
              },
            ]}
            value='all'
          />
        </Fieldset>
        <Fieldset size='small' label='Upphovsperson'>
          <Input placeholder='Sök på namn, affiliering, ORCID' />
        </Fieldset>
      </aside>
    </div>
  );
}
