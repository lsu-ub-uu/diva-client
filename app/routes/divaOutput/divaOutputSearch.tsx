import { Button } from '@/components/Button/Button';
import { ComboboxSelect } from '@/components/FormGenerator/components/ComboboxSelect';
import { Fieldset } from '@/components/Input/Fieldset';
import { Input } from '@/components/Input/Input';
import { CloseIcon, FilterIcon, SearchIcon } from '@/icons';
import css from './divaOutputSearch.css?url';
import { Pagination } from '@/components/Form/Pagination';
import type { BFFDataRecordData, BFFSearchResult } from '@/types/record';
import { useState } from 'react';

export const links = () => [{ rel: 'stylesheet', href: css }];

export const loader = async () => {
  return {
    breadcrumb: 'Publikationer',
  };
};

export default function DivaOutputSearch() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  return (
    <div className='search-page'>
      <main>
        <h1>Publikationer</h1>
        <div className='main-search'>
          <Fieldset
            className='search-fieldset'
            label='Sök efter publikationer'
            size='large'
          >
            <Input
              type='search'
              placeholder='Sök på titel, abstract, författare, utgivningsår, etc.'
            />
            <SearchIcon className='search-icon' />
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
          <Button
            className='filter-button'
            variant='secondary'
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <FilterIcon /> Filter
          </Button>
          <div className='chips'>
            <button className='chip'>
              Organisation: <em>"Fakulteten för konst och samhälle"</em>{' '}
              <CloseIcon />
            </button>
            <button className='chip'>
              Ämne: <em>"Skansen"</em> <CloseIcon />
            </button>
          </div>
        </div>
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
              <p>År: 2022 | Typ: Artikel</p>
            </div>
            <img src='https://placeholdit.com/300x400/ffffff/168ba5?text=PDF' />
          </div>
          <div className='search-result-item'>
            <h2>2.</h2>
            <div>
              <h3>
                <a href='#'>
                  Hjärtros och Svarten, Spira och Nyman: egennamn på kor,
                  hästar, getter och oxar i svenska boond- och herrgårdar under
                  300 år
                </a>
              </h3>
              <p>Anna Andersson, Bo Berg</p>
              <p>År: 2022 | Typ: Artikel</p>
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
              <p>År: 2022 | Typ: Artikel</p>
            </div>
            <img src='https://placeholdit.com/300x400/ffffff/168ba5?text=PDF' />
          </div>
        </div>
        <Pagination
          query={{
            search: { rows: { value: 10 }, start: { value: 1 } },
          }}
          searchResults={{ fromNo: 1, toNo: 3, totalNo: 3 } as BFFSearchResult}
          onRowsPerPageChange={(e) => {}}
        />
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
            value='skansen'
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
            value='fakulteten-for-konst-och-samhälle'
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
        <Fieldset size='small' label='SSIF'>
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
      </aside>
    </div>
  );
}
