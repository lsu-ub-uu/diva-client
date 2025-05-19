import { OutputField } from '@/components/FormGenerator/components/OutputField';

export default function OutputPrototype() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 300px',
        gap: '4rem',
      }}
    >
      <div
        style={{
          display: 'grid',
          gap: '1rem',
          paddingRight: '4rem',
          borderRight: '1px solid #ccc',
        }}
      >
        <h1>
          Towards Sustainable Revolution: Nordic Mobility in the Post-COVID-19
          Era
        </h1>

        <OutputField
          path='output'
          label='Upphovspersoner'
          variant='block'
          textStyle='bodyTextStyle'
          valueNode={
            <div>
              <a href='/asdf'>Jane Doe</a> (Redaktör)
              {', '}John Doe (Författare)
            </div>
          }
        />
        <OutputField
          path='output'
          label='Totalt antal upphovspersoner'
          variant='inline'
          textStyle='bodyTextStyle'
          value='12'
        />
        <OutputField
          path='output'
          label='Upphovsorganisation'
          variant='block'
          textStyle='bodyTextStyle'
          valueNode={
            <div>
              <a href='/asdf'>
                University West, Department of Social and Behavioural Studies,
                Division for Educational Science and Languages.
              </a>
            </div>
          }
        />
        <OutputField
          path='output'
          label='Språk'
          valueNode='Engelska'
          variant='inline'
          textStyle='bodyTextStyle'
        />
        <OutputField
          path='output'
          label='Alternativ titel (Svenska)'
          variant='block'
          textStyle='bodyTextStyle'
          value='Mot hållbar revolution: Nordisk mobilitet i post-COVID-19-eran'
        />
        <OutputField
          path='output'
          label='Typ'
          valueNode='Rapport'
          variant='inline'
          textStyle='bodyTextStyle'
        />
        <OutputField
          path='output'
          label='DiVA Medlem'
          valueNode='Uppsala universitet'
          variant='inline'
          textStyle='bodyTextStyle'
        />
        <OutputField
          path='output'
          label='Ursprung'
          valueNode={
            <div>
              {'Linköping, '}
              <a href='/asdf'>ETC Press</a>, 2012
            </div>
          }
          variant='block'
          textStyle='bodyTextStyle'
        />
        <OutputField
          path='output'
          label='Abstrakt'
          valueNode={
            <p>
              Att begreppsliggöra yrkeskunnande inom olika praxisgemenskaper
              syftar till att belysa innebörden och utvecklingen av
              yrkeskunnande inom olika praxisgemenskaper (Kemmis & Smith, 2008).
              Lärprocesser i förhållande till...<a href='/asdf'>Visa mer</a>
            </p>
          }
          variant='block'
          textStyle='bodyTextStyle'
        />
        <OutputField
          path='output'
          label='Nyckelord'
          valueNode='yrkeskunnande, yrkeslärare'
          variant='inline'
          textStyle='bodyTextStyle'
        />
        <OutputField
          path='output'
          label='SSIF'
          valueNode='(1) Naturvetenskap'
          variant='inline'
          textStyle='bodyTextStyle'
        />
        <OutputField
          path='output'
          label='Ämne'
          valueNode='ÄMNE'
          variant='inline'
          textStyle='bodyTextStyle'
        />
        <div>
          <h3>Identifierare</h3>
          <OutputField
            path='output'
            label='DiVA-ID'
            valueNode='diva-output:8386679258172694'
            variant='inline'
            textStyle='bodyTextStyle'
          />
          <OutputField
            path='output'
            label='ISBN'
            valueNode='978-92-893-8293-9 (Online)'
            variant='inline'
            textStyle='bodyTextStyle'
          />
          <OutputField
            path='output'
            label='DOI'
            valueNode={<a href='/asdf'>10.6027/nord2025-019</a>}
            variant='inline'
            textStyle='bodyTextStyle'
          />
          <OutputField
            path='output'
            label='PubMed'
            valueNode='37823696'
            variant='inline'
            textStyle='bodyTextStyle'
          />
          <OutputField
            path='output'
            label='Web of Science'
            valueNode='2134'
            variant='inline'
            textStyle='bodyTextStyle'
          />
          <OutputField
            path='output'
            label='Scopus'
            valueNode='2-s2.0-32'
            variant='inline'
            textStyle='bodyTextStyle'
          />
          <OutputField
            path='output'
            label='OpenAlex'
            valueNode='W3123306174'
            variant='inline'
            textStyle='bodyTextStyle'
          />
          <OutputField
            path='output'
            label='Libris ID'
            valueNode='onr:19769763'
            variant='inline'
            textStyle='bodyTextStyle'
          />
        </div>
      </div>
      <div style={{ display: 'grid', gap: '1rem', alignContent: 'start' }}>
        <div>
          <h3>Bilaga</h3>
          <img
            alt='fulltext'
            src='https://pre.diva-portal.org/rest/record/binary/binary:15459311940110593/thumbnail'
          />
        </div>
        <p>FULLTEXT.pdf (432 kB)</p>

        <a href='/asdf'>Ladda ner</a>

        <div>
          <h3>Nyckelord</h3>
          <a href='/asdf'>Yrkeskunnande</a>
          {', '}
          <a href='/asdf'>Yrkeslärare</a>
          {', '}
          <a href='/asdf'>Yrkesutbildning</a>
        </div>
      </div>
    </div>
  );
}
