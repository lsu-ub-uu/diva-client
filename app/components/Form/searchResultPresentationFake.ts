import type { FormSchema } from '@/components/FormGenerator/types';

export const searchResultPresentationFake: FormSchema = {
  form: {
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    childStyle: [''],
    gridColSpan: 12,
    name: 'output',
    type: 'group',
    mode: 'output',
    tooltip: {
      title: 'outputUpdateGroupText',
      body: 'outputUpdateGroupDefText',
    },
    label: 'outputUpdateGroupText',
    showLabel: false,
    presentationStyle: '',
    components: [
      {
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 0,
          repeatMax: 1.7976931348623157e308,
        },
        childStyle: ['twelveChildStyle'],
        gridColSpan: 12,
        name: 'name',
        type: 'group',
        mode: 'output',
        tooltip: {
          title: 'namePersonalGroupText',
          body: 'namePersonalGroupDefText',
        },
        label: 'namePersonalGroupText',
        showLabel: false,
        attributesToShow: 'none',
        presentationStyle: 'inline',
        attributes: [
          {
            name: 'type',
            type: 'collectionVariable',
            placeholder: 'initialEmptyValueText',
            mode: 'output',
            tooltip: {
              title: 'nameTypeCollectionVarText',
              body: 'nameTypeCollectionVarDefText',
            },
            label: 'nameTypeCollectionVarText',
            showLabel: true,
            options: [
              {
                value: 'personal',
                label: 'personalItemText',
              },
              {
                value: 'corporate',
                label: 'corporateItemText',
              },
              {
                value: 'external',
                label: 'externalItemText',
              },
              {
                value: 'coordinating',
                label: 'coordinatingItemText',
              },
            ],
            finalValue: 'personal',
          },
        ],
        components: [
          {
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            childStyle: [''],
            gridColSpan: 12,
            name: 'person',
            type: 'recordLink',
            mode: 'output',
            tooltip: {
              title: 'personLinkText',
              body: 'personLinkDefText',
            },
            label: 'personLinkText',
            showLabel: false,
            recordLinkType: 'diva-person',
            linkedRecordPresentation: {
              presentedRecordType: 'diva-person',
              presentationId: 'personLinkWhenListOutputPGroup',
            },
            presentationRecordLinkId: 'personWhenListOutputPLink',
          },
          {
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            childStyle: [''],
            gridColSpan: 12,
            name: 'namePart',
            type: 'textVariable',
            mode: 'output',
            inputType: 'input',
            tooltip: {
              title: 'namePartFamilyTextVarText',
              body: 'namePartFamilyTextVarDefText',
            },
            label: 'namePartFamilyTextVarText',
            showLabel: false,
            attributesToShow: 'none',
            validation: {
              type: 'regex',
              pattern: '.+',
            },
            attributes: [
              {
                name: 'type',
                type: 'collectionVariable',
                placeholder: 'initialEmptyValueText',
                mode: 'output',
                tooltip: {
                  title: 'namePartTypeDivaCollectionVarText',
                  body: 'namePartTypeDivaCollectionVarDefText',
                },
                label: 'namePartTypeDivaCollectionVarText',
                showLabel: true,
                options: [
                  {
                    value: 'given',
                    label: 'givenItemText',
                  },
                  {
                    value: 'family',
                    label: 'familyItemText',
                  },
                  {
                    value: 'termsOfAddress',
                    label: 'termsOfAddressItemText',
                  },
                ],
                finalValue: 'family',
              },
            ],
          },
          {
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            childStyle: [''],
            gridColSpan: 12,
            name: 'namePart',
            type: 'textVariable',
            mode: 'output',
            inputType: 'input',
            tooltip: {
              title: 'namePartGivenTextVarText',
              body: 'namePartGivenTextVarDefText',
            },
            label: 'namePartGivenTextVarText',
            showLabel: false,
            attributesToShow: 'none',
            validation: {
              type: 'regex',
              pattern: '.+',
            },
            attributes: [
              {
                name: 'type',
                type: 'collectionVariable',
                placeholder: 'initialEmptyValueText',
                mode: 'output',
                tooltip: {
                  title: 'namePartTypeDivaCollectionVarText',
                  body: 'namePartTypeDivaCollectionVarDefText',
                },
                label: 'namePartTypeDivaCollectionVarText',
                showLabel: true,
                options: [
                  {
                    value: 'given',
                    label: 'givenItemText',
                  },
                  {
                    value: 'family',
                    label: 'familyItemText',
                  },
                  {
                    value: 'termsOfAddress',
                    label: 'termsOfAddressItemText',
                  },
                ],
                finalValue: 'given',
              },
            ],
          },
        ],
      },
      {
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 1,
          repeatMax: 1,
        },
        childStyle: ['twelveChildStyle'],
        gridColSpan: 12,
        name: 'titleInfo',
        type: 'group',
        mode: 'output',
        tooltip: {
          title: 'titleInfoLangGroupText',
          body: 'titleInfoLangGroupDefText',
        },
        label: 'titleInfoLangGroupText',
        showLabel: false,
        attributesToShow: 'none',
        presentationStyle: '',
        attributes: [
          {
            name: 'lang',
            type: 'collectionVariable',
            placeholder: 'initialEmptyValueText',
            mode: 'output',
            tooltip: {
              title: 'languageCollectionVarText',
              body: 'languageCollectionVarDefText',
            },
            label: 'languageCollectionVarText',
            showLabel: true,
            options: [
              {
                value: 'swe',
                label: 'sweLangItemText',
              },
              {
                value: 'eng',
                label: 'engLangItemText',
              },
              {
                value: 'aar',
                label: 'aarLangItemText',
              },
              {
                value: 'abk',
                label: 'abkLangItemText',
              },
              {
                value: 'ace',
                label: 'aceLangItemText',
              },
              {
                value: 'ach',
                label: 'achLangItemText',
              },
              {
                value: 'ada',
                label: 'adaLangItemText',
              },
              {
                value: 'ady',
                label: 'adyLangItemText',
              },
              {
                value: 'afa',
                label: 'afaLangItemText',
              },
              {
                value: 'afh',
                label: 'afhLangItemText',
              },
              {
                value: 'afr',
                label: 'afrLangItemText',
              },
              {
                value: 'ain',
                label: 'ainLangItemText',
              },
              {
                value: 'aka',
                label: 'akaLangItemText',
              },
              {
                value: 'akk',
                label: 'akkLangItemText',
              },
              {
                value: 'alb',
                label: 'albLangItemText',
              },
              {
                value: 'ale',
                label: 'aleLangItemText',
              },
              {
                value: 'alg',
                label: 'algLangItemText',
              },
              {
                value: 'alt',
                label: 'altLangItemText',
              },
              {
                value: 'amh',
                label: 'amhLangItemText',
              },
              {
                value: 'ang',
                label: 'angLangItemText',
              },
              {
                value: 'anp',
                label: 'anpLangItemText',
              },
              {
                value: 'apa',
                label: 'apaLangItemText',
              },
              {
                value: 'ara',
                label: 'araLangItemText',
              },
              {
                value: 'arc',
                label: 'arcLangItemText',
              },
              {
                value: 'arg',
                label: 'argLangItemText',
              },
              {
                value: 'arm',
                label: 'armLangItemText',
              },
              {
                value: 'arn',
                label: 'arnLangItemText',
              },
              {
                value: 'arp',
                label: 'arpLangItemText',
              },
              {
                value: 'art',
                label: 'artLangItemText',
              },
              {
                value: 'arw',
                label: 'arwLangItemText',
              },
              {
                value: 'asm',
                label: 'asmLangItemText',
              },
              {
                value: 'ast',
                label: 'astLangItemText',
              },
              {
                value: 'ath',
                label: 'athLangItemText',
              },
              {
                value: 'aus',
                label: 'ausLangItemText',
              },
              {
                value: 'ava',
                label: 'avaLangItemText',
              },
              {
                value: 'ave',
                label: 'aveLangItemText',
              },
              {
                value: 'awa',
                label: 'awaLangItemText',
              },
              {
                value: 'aym',
                label: 'aymLangItemText',
              },
              {
                value: 'aze',
                label: 'azeLangItemText',
              },
              {
                value: 'bad',
                label: 'badLangItemText',
              },
              {
                value: 'bai',
                label: 'baiLangItemText',
              },
              {
                value: 'bak',
                label: 'bakLangItemText',
              },
              {
                value: 'bal',
                label: 'balLangItemText',
              },
              {
                value: 'bam',
                label: 'bamLangItemText',
              },
              {
                value: 'ban',
                label: 'banLangItemText',
              },
              {
                value: 'baq',
                label: 'baqLangItemText',
              },
              {
                value: 'bas',
                label: 'basLangItemText',
              },
              {
                value: 'bat',
                label: 'batLangItemText',
              },
              {
                value: 'bej',
                label: 'bejLangItemText',
              },
              {
                value: 'bel',
                label: 'belLangItemText',
              },
              {
                value: 'bem',
                label: 'bemLangItemText',
              },
              {
                value: 'ben',
                label: 'benLangItemText',
              },
              {
                value: 'ber',
                label: 'berLangItemText',
              },
              {
                value: 'bho',
                label: 'bhoLangItemText',
              },
              {
                value: 'bih',
                label: 'bihLangItemText',
              },
              {
                value: 'bik',
                label: 'bikLangItemText',
              },
              {
                value: 'bin',
                label: 'binLangItemText',
              },
              {
                value: 'bis',
                label: 'bisLangItemText',
              },
              {
                value: 'bla',
                label: 'blaLangItemText',
              },
              {
                value: 'bnt',
                label: 'bntLangItemText',
              },
              {
                value: 'bos',
                label: 'bosLangItemText',
              },
              {
                value: 'bra',
                label: 'braLangItemText',
              },
              {
                value: 'bre',
                label: 'breLangItemText',
              },
              {
                value: 'btk',
                label: 'btkLangItemText',
              },
              {
                value: 'bua',
                label: 'buaLangItemText',
              },
              {
                value: 'bug',
                label: 'bugLangItemText',
              },
              {
                value: 'bul',
                label: 'bulLangItemText',
              },
              {
                value: 'bur',
                label: 'burLangItemText',
              },
              {
                value: 'byn',
                label: 'bynLangItemText',
              },
              {
                value: 'cad',
                label: 'cadLangItemText',
              },
              {
                value: 'cai',
                label: 'caiLangItemText',
              },
              {
                value: 'car',
                label: 'carLangItemText',
              },
              {
                value: 'cat',
                label: 'catLangItemText',
              },
              {
                value: 'cau',
                label: 'cauLangItemText',
              },
              {
                value: 'ceb',
                label: 'cebLangItemText',
              },
              {
                value: 'cel',
                label: 'celLangItemText',
              },
              {
                value: 'cha',
                label: 'chaLangItemText',
              },
              {
                value: 'chb',
                label: 'chbLangItemText',
              },
              {
                value: 'che',
                label: 'cheLangItemText',
              },
              {
                value: 'chg',
                label: 'chgLangItemText',
              },
              {
                value: 'chi',
                label: 'chiLangItemText',
              },
              {
                value: 'chk',
                label: 'chkLangItemText',
              },
              {
                value: 'chm',
                label: 'chmLangItemText',
              },
              {
                value: 'chn',
                label: 'chnLangItemText',
              },
              {
                value: 'cho',
                label: 'choLangItemText',
              },
              {
                value: 'chp',
                label: 'chpLangItemText',
              },
              {
                value: 'chr',
                label: 'chrLangItemText',
              },
              {
                value: 'chu',
                label: 'chuLangItemText',
              },
              {
                value: 'chv',
                label: 'chvLangItemText',
              },
              {
                value: 'chy',
                label: 'chyLangItemText',
              },
              {
                value: 'cmc',
                label: 'cmcLangItemText',
              },
              {
                value: 'cop',
                label: 'copLangItemText',
              },
              {
                value: 'cor',
                label: 'corLangItemText',
              },
              {
                value: 'cos',
                label: 'cosLangItemText',
              },
              {
                value: 'cpe',
                label: 'cpeLangItemText',
              },
              {
                value: 'cpf',
                label: 'cpfLangItemText',
              },
              {
                value: 'cpp',
                label: 'cppLangItemText',
              },
              {
                value: 'cre',
                label: 'creLangItemText',
              },
              {
                value: 'crh',
                label: 'crhLangItemText',
              },
              {
                value: 'crp',
                label: 'crpLangItemText',
              },
              {
                value: 'csb',
                label: 'csbLangItemText',
              },
              {
                value: 'cus',
                label: 'cusLangItemText',
              },
              {
                value: 'cze',
                label: 'czeLangItemText',
              },
              {
                value: 'dak',
                label: 'dakLangItemText',
              },
              {
                value: 'dan',
                label: 'danLangItemText',
              },
              {
                value: 'dar',
                label: 'darLangItemText',
              },
              {
                value: 'day',
                label: 'dayLangItemText',
              },
              {
                value: 'del',
                label: 'delLangItemText',
              },
              {
                value: 'den',
                label: 'denLangItemText',
              },
              {
                value: 'dgr',
                label: 'dgrLangItemText',
              },
              {
                value: 'din',
                label: 'dinLangItemText',
              },
              {
                value: 'div',
                label: 'divLangItemText',
              },
              {
                value: 'doi',
                label: 'doiLangItemText',
              },
              {
                value: 'dra',
                label: 'draLangItemText',
              },
              {
                value: 'dsb',
                label: 'dsbLangItemText',
              },
              {
                value: 'dua',
                label: 'duaLangItemText',
              },
              {
                value: 'dum',
                label: 'dumLangItemText',
              },
              {
                value: 'dut',
                label: 'dutLangItemText',
              },
              {
                value: 'dyu',
                label: 'dyuLangItemText',
              },
              {
                value: 'dzo',
                label: 'dzoLangItemText',
              },
              {
                value: 'efi',
                label: 'efiLangItemText',
              },
              {
                value: 'egy',
                label: 'egyLangItemText',
              },
              {
                value: 'eka',
                label: 'ekaLangItemText',
              },
              {
                value: 'elx',
                label: 'elxLangItemText',
              },
              {
                value: 'enm',
                label: 'enmLangItemText',
              },
              {
                value: 'epo',
                label: 'epoLangItemText',
              },
              {
                value: 'est',
                label: 'estLangItemText',
              },
              {
                value: 'ewe',
                label: 'eweLangItemText',
              },
              {
                value: 'ewo',
                label: 'ewoLangItemText',
              },
              {
                value: 'fan',
                label: 'fanLangItemText',
              },
              {
                value: 'fao',
                label: 'faoLangItemText',
              },
              {
                value: 'fat',
                label: 'fatLangItemText',
              },
              {
                value: 'fij',
                label: 'fijLangItemText',
              },
              {
                value: 'fil',
                label: 'filLangItemText',
              },
              {
                value: 'fin',
                label: 'finLangItemText',
              },
              {
                value: 'fiu',
                label: 'fiuLangItemText',
              },
              {
                value: 'fon',
                label: 'fonLangItemText',
              },
              {
                value: 'fre',
                label: 'freLangItemText',
              },
              {
                value: 'frm',
                label: 'frmLangItemText',
              },
              {
                value: 'fro',
                label: 'froLangItemText',
              },
              {
                value: 'frr',
                label: 'frrLangItemText',
              },
              {
                value: 'frs',
                label: 'frsLangItemText',
              },
              {
                value: 'fry',
                label: 'fryLangItemText',
              },
              {
                value: 'ful',
                label: 'fulLangItemText',
              },
              {
                value: 'fur',
                label: 'furLangItemText',
              },
              {
                value: 'gaa',
                label: 'gaaLangItemText',
              },
              {
                value: 'gay',
                label: 'gayLangItemText',
              },
              {
                value: 'gba',
                label: 'gbaLangItemText',
              },
              {
                value: 'gem',
                label: 'gemLangItemText',
              },
              {
                value: 'geo',
                label: 'geoLangItemText',
              },
              {
                value: 'ger',
                label: 'gerLangItemText',
              },
              {
                value: 'gez',
                label: 'gezLangItemText',
              },
              {
                value: 'gil',
                label: 'gilLangItemText',
              },
              {
                value: 'gla',
                label: 'glaLangItemText',
              },
              {
                value: 'gle',
                label: 'gleLangItemText',
              },
              {
                value: 'glg',
                label: 'glgLangItemText',
              },
              {
                value: 'glv',
                label: 'glvLangItemText',
              },
              {
                value: 'gmh',
                label: 'gmhLangItemText',
              },
              {
                value: 'goh',
                label: 'gohLangItemText',
              },
              {
                value: 'gon',
                label: 'gonLangItemText',
              },
              {
                value: 'gor',
                label: 'gorLangItemText',
              },
              {
                value: 'got',
                label: 'gotLangItemText',
              },
              {
                value: 'grb',
                label: 'grbLangItemText',
              },
              {
                value: 'grc',
                label: 'grcLangItemText',
              },
              {
                value: 'gre',
                label: 'greLangItemText',
              },
              {
                value: 'grn',
                label: 'grnLangItemText',
              },
              {
                value: 'gsw',
                label: 'gswLangItemText',
              },
              {
                value: 'guj',
                label: 'gujLangItemText',
              },
              {
                value: 'gwi',
                label: 'gwiLangItemText',
              },
              {
                value: 'hai',
                label: 'haiLangItemText',
              },
              {
                value: 'hat',
                label: 'hatLangItemText',
              },
              {
                value: 'hau',
                label: 'hauLangItemText',
              },
              {
                value: 'haw',
                label: 'hawLangItemText',
              },
              {
                value: 'heb',
                label: 'hebLangItemText',
              },
              {
                value: 'her',
                label: 'herLangItemText',
              },
              {
                value: 'hil',
                label: 'hilLangItemText',
              },
              {
                value: 'him',
                label: 'himLangItemText',
              },
              {
                value: 'hin',
                label: 'hinLangItemText',
              },
              {
                value: 'hit',
                label: 'hitLangItemText',
              },
              {
                value: 'hmn',
                label: 'hmnLangItemText',
              },
              {
                value: 'hmo',
                label: 'hmoLangItemText',
              },
              {
                value: 'hrv',
                label: 'hrvLangItemText',
              },
              {
                value: 'hsb',
                label: 'hsbLangItemText',
              },
              {
                value: 'hun',
                label: 'hunLangItemText',
              },
              {
                value: 'hup',
                label: 'hupLangItemText',
              },
              {
                value: 'iba',
                label: 'ibaLangItemText',
              },
              {
                value: 'ibo',
                label: 'iboLangItemText',
              },
              {
                value: 'ice',
                label: 'iceLangItemText',
              },
              {
                value: 'ido',
                label: 'idoLangItemText',
              },
              {
                value: 'iii',
                label: 'iiiLangItemText',
              },
              {
                value: 'ijo',
                label: 'ijoLangItemText',
              },
              {
                value: 'iku',
                label: 'ikuLangItemText',
              },
              {
                value: 'ile',
                label: 'ileLangItemText',
              },
              {
                value: 'ilo',
                label: 'iloLangItemText',
              },
              {
                value: 'ina',
                label: 'inaLangItemText',
              },
              {
                value: 'inc',
                label: 'incLangItemText',
              },
              {
                value: 'ind',
                label: 'indLangItemText',
              },
              {
                value: 'ine',
                label: 'ineLangItemText',
              },
              {
                value: 'inh',
                label: 'inhLangItemText',
              },
              {
                value: 'ipk',
                label: 'ipkLangItemText',
              },
              {
                value: 'ira',
                label: 'iraLangItemText',
              },
              {
                value: 'iro',
                label: 'iroLangItemText',
              },
              {
                value: 'ita',
                label: 'itaLangItemText',
              },
              {
                value: 'jav',
                label: 'javLangItemText',
              },
              {
                value: 'jbo',
                label: 'jboLangItemText',
              },
              {
                value: 'jpn',
                label: 'jpnLangItemText',
              },
              {
                value: 'jpr',
                label: 'jprLangItemText',
              },
              {
                value: 'jrb',
                label: 'jrbLangItemText',
              },
              {
                value: 'kaa',
                label: 'kaaLangItemText',
              },
              {
                value: 'kab',
                label: 'kabLangItemText',
              },
              {
                value: 'kac',
                label: 'kacLangItemText',
              },
              {
                value: 'kal',
                label: 'kalLangItemText',
              },
              {
                value: 'kam',
                label: 'kamLangItemText',
              },
              {
                value: 'kan',
                label: 'kanLangItemText',
              },
              {
                value: 'kar',
                label: 'karLangItemText',
              },
              {
                value: 'kas',
                label: 'kasLangItemText',
              },
              {
                value: 'kau',
                label: 'kauLangItemText',
              },
              {
                value: 'kaw',
                label: 'kawLangItemText',
              },
              {
                value: 'kaz',
                label: 'kazLangItemText',
              },
              {
                value: 'kbd',
                label: 'kbdLangItemText',
              },
              {
                value: 'kha',
                label: 'khaLangItemText',
              },
              {
                value: 'khi',
                label: 'khiLangItemText',
              },
              {
                value: 'khm',
                label: 'khmLangItemText',
              },
              {
                value: 'kho',
                label: 'khoLangItemText',
              },
              {
                value: 'kik',
                label: 'kikLangItemText',
              },
              {
                value: 'kin',
                label: 'kinLangItemText',
              },
              {
                value: 'kir',
                label: 'kirLangItemText',
              },
              {
                value: 'kmb',
                label: 'kmbLangItemText',
              },
              {
                value: 'kok',
                label: 'kokLangItemText',
              },
              {
                value: 'kom',
                label: 'komLangItemText',
              },
              {
                value: 'kon',
                label: 'konLangItemText',
              },
              {
                value: 'kor',
                label: 'korLangItemText',
              },
              {
                value: 'kos',
                label: 'kosLangItemText',
              },
              {
                value: 'kpe',
                label: 'kpeLangItemText',
              },
              {
                value: 'krc',
                label: 'krcLangItemText',
              },
              {
                value: 'krl',
                label: 'krlLangItemText',
              },
              {
                value: 'kro',
                label: 'kroLangItemText',
              },
              {
                value: 'kru',
                label: 'kruLangItemText',
              },
              {
                value: 'kua',
                label: 'kuaLangItemText',
              },
              {
                value: 'kum',
                label: 'kumLangItemText',
              },
              {
                value: 'kur',
                label: 'kurLangItemText',
              },
              {
                value: 'kut',
                label: 'kutLangItemText',
              },
              {
                value: 'lad',
                label: 'ladLangItemText',
              },
              {
                value: 'lah',
                label: 'lahLangItemText',
              },
              {
                value: 'lam',
                label: 'lamLangItemText',
              },
              {
                value: 'lao',
                label: 'laoLangItemText',
              },
              {
                value: 'lat',
                label: 'latLangItemText',
              },
              {
                value: 'lav',
                label: 'lavLangItemText',
              },
              {
                value: 'lez',
                label: 'lezLangItemText',
              },
              {
                value: 'lim',
                label: 'limLangItemText',
              },
              {
                value: 'lin',
                label: 'linLangItemText',
              },
              {
                value: 'lit',
                label: 'litLangItemText',
              },
              {
                value: 'lol',
                label: 'lolLangItemText',
              },
              {
                value: 'loz',
                label: 'lozLangItemText',
              },
              {
                value: 'ltz',
                label: 'ltzLangItemText',
              },
              {
                value: 'lua',
                label: 'luaLangItemText',
              },
              {
                value: 'lub',
                label: 'lubLangItemText',
              },
              {
                value: 'lug',
                label: 'lugLangItemText',
              },
              {
                value: 'lui',
                label: 'luiLangItemText',
              },
              {
                value: 'lun',
                label: 'lunLangItemText',
              },
              {
                value: 'luo',
                label: 'luoLangItemText',
              },
              {
                value: 'lus',
                label: 'lusLangItemText',
              },
              {
                value: 'mac',
                label: 'macLangItemText',
              },
              {
                value: 'mad',
                label: 'madLangItemText',
              },
              {
                value: 'mag',
                label: 'magLangItemText',
              },
              {
                value: 'mah',
                label: 'mahLangItemText',
              },
              {
                value: 'mai',
                label: 'maiLangItemText',
              },
              {
                value: 'mak',
                label: 'makLangItemText',
              },
              {
                value: 'mal',
                label: 'malLangItemText',
              },
              {
                value: 'man',
                label: 'manLangItemText',
              },
              {
                value: 'mao',
                label: 'maoLangItemText',
              },
              {
                value: 'map',
                label: 'mapLangItemText',
              },
              {
                value: 'mar',
                label: 'marLangItemText',
              },
              {
                value: 'mas',
                label: 'masLangItemText',
              },
              {
                value: 'may',
                label: 'mayLangItemText',
              },
              {
                value: 'mdf',
                label: 'mdfLangItemText',
              },
              {
                value: 'mdr',
                label: 'mdrLangItemText',
              },
              {
                value: 'men',
                label: 'menLangItemText',
              },
              {
                value: 'mga',
                label: 'mgaLangItemText',
              },
              {
                value: 'mic',
                label: 'micLangItemText',
              },
              {
                value: 'min',
                label: 'minLangItemText',
              },
              {
                value: 'mis',
                label: 'misLangItemText',
              },
              {
                value: 'mkh',
                label: 'mkhLangItemText',
              },
              {
                value: 'mlg',
                label: 'mlgLangItemText',
              },
              {
                value: 'mlt',
                label: 'mltLangItemText',
              },
              {
                value: 'mnc',
                label: 'mncLangItemText',
              },
              {
                value: 'mni',
                label: 'mniLangItemText',
              },
              {
                value: 'mno',
                label: 'mnoLangItemText',
              },
              {
                value: 'moh',
                label: 'mohLangItemText',
              },
              {
                value: 'mon',
                label: 'monLangItemText',
              },
              {
                value: 'mos',
                label: 'mosLangItemText',
              },
              {
                value: 'mul',
                label: 'mulLangItemText',
              },
              {
                value: 'mun',
                label: 'munLangItemText',
              },
              {
                value: 'mus',
                label: 'musLangItemText',
              },
              {
                value: 'mwl',
                label: 'mwlLangItemText',
              },
              {
                value: 'mwr',
                label: 'mwrLangItemText',
              },
              {
                value: 'myn',
                label: 'mynLangItemText',
              },
              {
                value: 'myv',
                label: 'myvLangItemText',
              },
              {
                value: 'nah',
                label: 'nahLangItemText',
              },
              {
                value: 'nai',
                label: 'naiLangItemText',
              },
              {
                value: 'nap',
                label: 'napLangItemText',
              },
              {
                value: 'nau',
                label: 'nauLangItemText',
              },
              {
                value: 'nav',
                label: 'navLangItemText',
              },
              {
                value: 'nbl',
                label: 'nblLangItemText',
              },
              {
                value: 'nde',
                label: 'ndeLangItemText',
              },
              {
                value: 'ndo',
                label: 'ndoLangItemText',
              },
              {
                value: 'nds',
                label: 'ndsLangItemText',
              },
              {
                value: 'nep',
                label: 'nepLangItemText',
              },
              {
                value: 'new',
                label: 'newLangItemText',
              },
              {
                value: 'nia',
                label: 'niaLangItemText',
              },
              {
                value: 'nic',
                label: 'nicLangItemText',
              },
              {
                value: 'niu',
                label: 'niuLangItemText',
              },
              {
                value: 'nno',
                label: 'nnoLangItemText',
              },
              {
                value: 'nob',
                label: 'nobLangItemText',
              },
              {
                value: 'nog',
                label: 'nogLangItemText',
              },
              {
                value: 'non',
                label: 'nonLangItemText',
              },
              {
                value: 'nor',
                label: 'norLangItemText',
              },
              {
                value: 'nqo',
                label: 'nqoLangItemText',
              },
              {
                value: 'nso',
                label: 'nsoLangItemText',
              },
              {
                value: 'nub',
                label: 'nubLangItemText',
              },
              {
                value: 'nwc',
                label: 'nwcLangItemText',
              },
              {
                value: 'nya',
                label: 'nyaLangItemText',
              },
              {
                value: 'nym',
                label: 'nymLangItemText',
              },
              {
                value: 'nyn',
                label: 'nynLangItemText',
              },
              {
                value: 'nyo',
                label: 'nyoLangItemText',
              },
              {
                value: 'nzi',
                label: 'nziLangItemText',
              },
              {
                value: 'oci',
                label: 'ociLangItemText',
              },
              {
                value: 'oji',
                label: 'ojiLangItemText',
              },
              {
                value: 'ori',
                label: 'oriLangItemText',
              },
              {
                value: 'orm',
                label: 'ormLangItemText',
              },
              {
                value: 'osa',
                label: 'osaLangItemText',
              },
              {
                value: 'oss',
                label: 'ossLangItemText',
              },
              {
                value: 'ota',
                label: 'otaLangItemText',
              },
              {
                value: 'oto',
                label: 'otoLangItemText',
              },
              {
                value: 'paa',
                label: 'paaLangItemText',
              },
              {
                value: 'pag',
                label: 'pagLangItemText',
              },
              {
                value: 'pal',
                label: 'palLangItemText',
              },
              {
                value: 'pam',
                label: 'pamLangItemText',
              },
              {
                value: 'pan',
                label: 'panLangItemText',
              },
              {
                value: 'pap',
                label: 'papLangItemText',
              },
              {
                value: 'pau',
                label: 'pauLangItemText',
              },
              {
                value: 'peo',
                label: 'peoLangItemText',
              },
              {
                value: 'per',
                label: 'perLangItemText',
              },
              {
                value: 'phi',
                label: 'phiLangItemText',
              },
              {
                value: 'phn',
                label: 'phnLangItemText',
              },
              {
                value: 'pli',
                label: 'pliLangItemText',
              },
              {
                value: 'pol',
                label: 'polLangItemText',
              },
              {
                value: 'pon',
                label: 'ponLangItemText',
              },
              {
                value: 'por',
                label: 'porLangItemText',
              },
              {
                value: 'pra',
                label: 'praLangItemText',
              },
              {
                value: 'pro',
                label: 'proLangItemText',
              },
              {
                value: 'pus',
                label: 'pusLangItemText',
              },
              {
                value: 'que',
                label: 'queLangItemText',
              },
              {
                value: 'raj',
                label: 'rajLangItemText',
              },
              {
                value: 'rap',
                label: 'rapLangItemText',
              },
              {
                value: 'rar',
                label: 'rarLangItemText',
              },
              {
                value: 'roa',
                label: 'roaLangItemText',
              },
              {
                value: 'roh',
                label: 'rohLangItemText',
              },
              {
                value: 'rom',
                label: 'romLangItemText',
              },
              {
                value: 'rum',
                label: 'rumLangItemText',
              },
              {
                value: 'run',
                label: 'runLangItemText',
              },
              {
                value: 'rup',
                label: 'rupLangItemText',
              },
              {
                value: 'rus',
                label: 'rusLangItemText',
              },
              {
                value: 'sad',
                label: 'sadLangItemText',
              },
              {
                value: 'sag',
                label: 'sagLangItemText',
              },
              {
                value: 'sah',
                label: 'sahLangItemText',
              },
              {
                value: 'sai',
                label: 'saiLangItemText',
              },
              {
                value: 'sal',
                label: 'salLangItemText',
              },
              {
                value: 'sam',
                label: 'samLangItemText',
              },
              {
                value: 'san',
                label: 'sanLangItemText',
              },
              {
                value: 'sas',
                label: 'sasLangItemText',
              },
              {
                value: 'sat',
                label: 'satLangItemText',
              },
              {
                value: 'scn',
                label: 'scnLangItemText',
              },
              {
                value: 'sco',
                label: 'scoLangItemText',
              },
              {
                value: 'sel',
                label: 'selLangItemText',
              },
              {
                value: 'sem',
                label: 'semLangItemText',
              },
              {
                value: 'sga',
                label: 'sgaLangItemText',
              },
              {
                value: 'sgn',
                label: 'sgnLangItemText',
              },
              {
                value: 'shn',
                label: 'shnLangItemText',
              },
              {
                value: 'sid',
                label: 'sidLangItemText',
              },
              {
                value: 'sin',
                label: 'sinLangItemText',
              },
              {
                value: 'sio',
                label: 'sioLangItemText',
              },
              {
                value: 'sit',
                label: 'sitLangItemText',
              },
              {
                value: 'sla',
                label: 'slaLangItemText',
              },
              {
                value: 'slo',
                label: 'sloLangItemText',
              },
              {
                value: 'slv',
                label: 'slvLangItemText',
              },
              {
                value: 'sma',
                label: 'smaLangItemText',
              },
              {
                value: 'sme',
                label: 'smeLangItemText',
              },
              {
                value: 'smi',
                label: 'smiLangItemText',
              },
              {
                value: 'smj',
                label: 'smjLangItemText',
              },
              {
                value: 'smn',
                label: 'smnLangItemText',
              },
              {
                value: 'smo',
                label: 'smoLangItemText',
              },
              {
                value: 'sms',
                label: 'smsLangItemText',
              },
              {
                value: 'sna',
                label: 'snaLangItemText',
              },
              {
                value: 'snd',
                label: 'sndLangItemText',
              },
              {
                value: 'snk',
                label: 'snkLangItemText',
              },
              {
                value: 'sog',
                label: 'sogLangItemText',
              },
              {
                value: 'som',
                label: 'somLangItemText',
              },
              {
                value: 'son',
                label: 'sonLangItemText',
              },
              {
                value: 'sot',
                label: 'sotLangItemText',
              },
              {
                value: 'spa',
                label: 'spaLangItemText',
              },
              {
                value: 'srd',
                label: 'srdLangItemText',
              },
              {
                value: 'srn',
                label: 'srnLangItemText',
              },
              {
                value: 'srp',
                label: 'srpLangItemText',
              },
              {
                value: 'srr',
                label: 'srrLangItemText',
              },
              {
                value: 'ssa',
                label: 'ssaLangItemText',
              },
              {
                value: 'ssw',
                label: 'sswLangItemText',
              },
              {
                value: 'suk',
                label: 'sukLangItemText',
              },
              {
                value: 'sun',
                label: 'sunLangItemText',
              },
              {
                value: 'sus',
                label: 'susLangItemText',
              },
              {
                value: 'sux',
                label: 'suxLangItemText',
              },
              {
                value: 'swa',
                label: 'swaLangItemText',
              },
              {
                value: 'syc',
                label: 'sycLangItemText',
              },
              {
                value: 'syr',
                label: 'syrLangItemText',
              },
              {
                value: 'tah',
                label: 'tahLangItemText',
              },
              {
                value: 'tai',
                label: 'taiLangItemText',
              },
              {
                value: 'tam',
                label: 'tamLangItemText',
              },
              {
                value: 'tat',
                label: 'tatLangItemText',
              },
              {
                value: 'tel',
                label: 'telLangItemText',
              },
              {
                value: 'tem',
                label: 'temLangItemText',
              },
              {
                value: 'ter',
                label: 'terLangItemText',
              },
              {
                value: 'tet',
                label: 'tetLangItemText',
              },
              {
                value: 'tgk',
                label: 'tgkLangItemText',
              },
              {
                value: 'tgl',
                label: 'tglLangItemText',
              },
              {
                value: 'tha',
                label: 'thaLangItemText',
              },
              {
                value: 'tib',
                label: 'tibLangItemText',
              },
              {
                value: 'tig',
                label: 'tigLangItemText',
              },
              {
                value: 'tir',
                label: 'tirLangItemText',
              },
              {
                value: 'tiv',
                label: 'tivLangItemText',
              },
              {
                value: 'tkl',
                label: 'tklLangItemText',
              },
              {
                value: 'tlh',
                label: 'tlhLangItemText',
              },
              {
                value: 'tli',
                label: 'tliLangItemText',
              },
              {
                value: 'tmh',
                label: 'tmhLangItemText',
              },
              {
                value: 'tog',
                label: 'togLangItemText',
              },
              {
                value: 'ton',
                label: 'tonLangItemText',
              },
              {
                value: 'tpi',
                label: 'tpiLangItemText',
              },
              {
                value: 'tsi',
                label: 'tsiLangItemText',
              },
              {
                value: 'tsn',
                label: 'tsnLangItemText',
              },
              {
                value: 'tso',
                label: 'tsoLangItemText',
              },
              {
                value: 'tuk',
                label: 'tukLangItemText',
              },
              {
                value: 'tum',
                label: 'tumLangItemText',
              },
              {
                value: 'tup',
                label: 'tupLangItemText',
              },
              {
                value: 'tur',
                label: 'turLangItemText',
              },
              {
                value: 'tut',
                label: 'tutLangItemText',
              },
              {
                value: 'tvl',
                label: 'tvlLangItemText',
              },
              {
                value: 'twi',
                label: 'twiLangItemText',
              },
              {
                value: 'tyv',
                label: 'tyvLangItemText',
              },
              {
                value: 'udm',
                label: 'udmLangItemText',
              },
              {
                value: 'uga',
                label: 'ugaLangItemText',
              },
              {
                value: 'uig',
                label: 'uigLangItemText',
              },
              {
                value: 'ukr',
                label: 'ukrLangItemText',
              },
              {
                value: 'umb',
                label: 'umbLangItemText',
              },
              {
                value: 'und',
                label: 'undLangItemText',
              },
              {
                value: 'urd',
                label: 'urdLangItemText',
              },
              {
                value: 'uzb',
                label: 'uzbLangItemText',
              },
              {
                value: 'vai',
                label: 'vaiLangItemText',
              },
              {
                value: 'ven',
                label: 'venLangItemText',
              },
              {
                value: 'vie',
                label: 'vieLangItemText',
              },
              {
                value: 'vol',
                label: 'volLangItemText',
              },
              {
                value: 'vot',
                label: 'votLangItemText',
              },
              {
                value: 'wak',
                label: 'wakLangItemText',
              },
              {
                value: 'wal',
                label: 'walLangItemText',
              },
              {
                value: 'war',
                label: 'warLangItemText',
              },
              {
                value: 'was',
                label: 'wasLangItemText',
              },
              {
                value: 'wel',
                label: 'welLangItemText',
              },
              {
                value: 'wen',
                label: 'wenLangItemText',
              },
              {
                value: 'wln',
                label: 'wlnLangItemText',
              },
              {
                value: 'wol',
                label: 'wolLangItemText',
              },
              {
                value: 'xal',
                label: 'xalLangItemText',
              },
              {
                value: 'xho',
                label: 'xhoLangItemText',
              },
              {
                value: 'yao',
                label: 'yaoLangItemText',
              },
              {
                value: 'yap',
                label: 'yapLangItemText',
              },
              {
                value: 'yid',
                label: 'yidLangItemText',
              },
              {
                value: 'yor',
                label: 'yorLangItemText',
              },
              {
                value: 'ypk',
                label: 'ypkLangItemText',
              },
              {
                value: 'zap',
                label: 'zapLangItemText',
              },
              {
                value: 'zen',
                label: 'zenLangItemText',
              },
              {
                value: 'zha',
                label: 'zhaLangItemText',
              },
              {
                value: 'znd',
                label: 'zndLangItemText',
              },
              {
                value: 'zul',
                label: 'zulLangItemText',
              },
              {
                value: 'zun',
                label: 'zunLangItemText',
              },
              {
                value: 'zxx',
                label: 'zxxLangItemText',
              },
              {
                value: 'zza',
                label: 'zzaLangItemText',
              },
            ],
          },
        ],
        components: [
          {
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            childStyle: [''],
            textStyle: 'h3TextStyle',
            gridColSpan: 12,
            name: 'title',
            type: 'textVariable',
            mode: 'output',
            inputType: 'input',
            tooltip: {
              title: 'titleTextVarText',
              body: 'titleTextVarDefText',
            },
            label: 'titleTextVarText',
            showLabel: false,
            validation: {
              type: 'regex',
              pattern: '.+',
            },
          },
          {
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            childStyle: [''],
            textStyle: 'italicTextStyle',
            gridColSpan: 12,
            name: 'subTitle',
            type: 'textVariable',
            mode: 'output',
            inputType: 'input',
            tooltip: {
              title: 'subtitleTextVarText',
              body: 'subtitleTextVarDefText',
            },
            label: 'subtitleTextVarText',
            showLabel: false,
            validation: {
              type: 'regex',
              pattern: '.+',
            },
          },
        ],
      },
      {
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 1,
          repeatMax: 1,
        },
        childStyle: ['threeChildStyle'],
        gridColSpan: 3,
        name: 'recordInfo',
        type: 'group',
        mode: 'output',
        tooltip: {
          title: 'recordInfoOutputUpdateGroupText',
          body: 'recordInfoOutputUpdateGroupDefText',
        },
        label: 'recordInfoOutputUpdateGroupText',
        showLabel: false,
        presentationStyle: 'inline',
        components: [
          {
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            childStyle: [''],
            gridColSpan: 12,
            name: 'genre',
            type: 'collectionVariable',
            placeholder: 'initialEmptyValueText',
            mode: 'output',
            tooltip: {
              title: 'outputTypeCollectionVarText',
              body: 'outputTypeCollectionVarDefText',
            },
            label: 'divaClient_searchResultPublicationTypeLabelText',
            showLabel: true,
            attributesToShow: 'none',
            options: [
              {
                value: 'artistic-work_original-creative-work',
                label: 'artisticWorkOriginalCreativeWorkItemText',
              },
              {
                value: 'artistic-work_artistic-thesis',
                label: 'artisticWorkArtisticThesisItemText',
              },
              {
                value: 'publication_book',
                label: 'publicationBookItemText',
              },
              {
                value: 'publication_edited-book',
                label: 'publicationEditedBookItemText',
              },
              {
                value: 'publication_book-chapter',
                label: 'publicationBookChapterItemText',
              },
              {
                value: 'publication_foreword-afterword',
                label: 'publicationForewordAfterwordItemText',
              },
              {
                value: 'publication_report-chapter',
                label: 'publicationReportChapterItemText',
              },
              {
                value: 'publication_report',
                label: 'publicationReportItemText',
              },
              {
                value: 'publication_journal-article',
                label: 'publicationJournalArticleItemText',
              },
              {
                value: 'publication_review-article',
                label: 'publicationReviewArticleItemText',
              },
              {
                value: 'publication_editorial-letter',
                label: 'publicationEditorialLetterItemText',
              },
              {
                value: 'publication_book-review',
                label: 'publicationBookReviewItemText',
              },
              {
                value: 'publication_magazine-article',
                label: 'publicationMagazineArticleItemText',
              },
              {
                value: 'publication_newspaper-article',
                label: 'publicationNewspaperArticleItemText',
              },
              {
                value: 'publication_encyclopedia-entry',
                label: 'publicationEncyclopediaEntryItemText',
              },
              {
                value: 'publication_doctoral-thesis-monograph',
                label: 'publicationDoctoralThesisMonographItemText',
              },
              {
                value: 'publication_doctoral-thesis-compilation',
                label: 'publicationDoctoralThesisCompilationItemText',
              },
              {
                value: 'publication_licentiate-thesis-monograph',
                label: 'publicationLicentiateThesisMonographItemText',
              },
              {
                value: 'publication_licentiate-thesis-compilation',
                label: 'publicationLicentiateThesisCompilationItemText',
              },
              {
                value: 'publication_critical-edition',
                label: 'publicationCriticalEditionItemText',
              },
              {
                value: 'publication_working-paper',
                label: 'publicationWorkingPaperItemText',
              },
              {
                value: 'publication_journal-issue',
                label: 'publicationJournalIssueItemText',
              },
              {
                value: 'publication_preprint',
                label: 'publicationPreprintItemText',
              },
              {
                value: 'publication_other',
                label: 'publicationOtherItemText',
              },
              {
                value: 'conference_paper',
                label: 'conferencePaperItemText',
              },
              {
                value: 'conference_poster',
                label: 'conferencePosterItemText',
              },
              {
                value: 'conference_proceeding',
                label: 'conferenceProceedingItemText',
              },
              {
                value: 'conference_other',
                label: 'conferenceOtherItemText',
              },
              {
                value: 'intellectual-property_patent',
                label: 'intellectualPropertyPatentItemText',
              },
              {
                value: 'intellectual-property_other',
                label: 'intellectualPropertyOtherItemText',
              },
              {
                value: 'other_software',
                label: 'otherSoftwareItemText',
              },
              {
                value: 'diva_degree-project',
                label: 'degreeProjectItemText',
              },
              {
                value: 'diva_manuscript-thesis',
                label: 'manuscriptThesisItemText',
              },
              {
                value: 'diva_dissertation',
                label: 'dissertationItemText',
              },
            ],
            attributes: [
              {
                name: 'type',
                type: 'collectionVariable',
                placeholder: 'initialEmptyValueText',
                mode: 'output',
                tooltip: {
                  title: 'outputTypeTypeCollectionVarText',
                  body: 'outputTypeTypeCollectionVarDefText',
                },
                label: 'outputTypeTypeCollectionVarText',
                showLabel: true,
                options: [
                  {
                    value: 'outputType',
                    label: 'outputTypeItemText',
                  },
                ],
                finalValue: 'outputType',
              },
            ],
          },
          {
            type: 'hidden',
            name: 'type',
            finalValue: 'diva-output',
          },
          {
            type: 'hidden',
            name: 'validationType',
            finalValue: 'diva-output',
          },
          {
            type: 'hidden',
            name: 'dataDivider',
            finalValue: 'divaData',
          },
        ],
      },
      {
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 1,
          repeatMax: 1,
        },
        childStyle: ['threeChildStyle'],
        gridColSpan: 3,
        name: 'recordInfo',
        type: 'group',
        mode: 'output',
        tooltip: {
          title: 'recordInfoOutputUpdateGroupText',
          body: 'recordInfoOutputUpdateGroupDefText',
        },
        label: 'recordInfoOutputUpdateGroupText',
        showLabel: false,
        presentationStyle: 'inline',
        components: [
          {
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            childStyle: [''],
            gridColSpan: 12,
            name: 'id',
            type: 'textVariable',
            mode: 'output',
            inputType: 'input',
            tooltip: {
              title: 'idDivaTextVarText',
              body: 'idDivaTextVarDefText',
            },
            label: 'idDivaTextVarText',
            showLabel: true,
            validation: {
              type: 'regex',
              pattern: '.+',
            },
          },
          {
            type: 'hidden',
            name: 'type',
            finalValue: 'diva-output',
          },
          {
            type: 'hidden',
            name: 'validationType',
            finalValue: 'diva-output',
          },
          {
            type: 'hidden',
            name: 'dataDivider',
            finalValue: 'divaData',
          },
        ],
      },
      {
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 1,
          repeatMax: 1,
        },
        childStyle: ['threeChildStyle'],
        gridColSpan: 3,
        name: 'originInfo',
        type: 'group',
        mode: 'output',
        tooltip: {
          title: 'originInfoGroupText',
          body: 'originInfoGroupDefText',
        },
        label: 'originInfoGroupText',
        showLabel: false,
        presentationStyle: '',
        components: [
          {
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            childStyle: [''],
            gridColSpan: 12,
            name: 'dateIssued',
            type: 'group',
            mode: 'output',
            tooltip: {
              title: 'dateIssuedGroupText',
              body: 'dateIssuedGroupDefText',
            },
            label: 'dateIssuedGroupText',
            showLabel: false,
            presentationStyle: 'inline',
            components: [
              {
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 1,
                  repeatMax: 1,
                },
                childStyle: [''],
                gridColSpan: 12,
                name: 'year',
                type: 'textVariable',
                mode: 'output',
                inputType: 'input',
                tooltip: {
                  title: 'yearTextVarText',
                  body: 'yearTextVarDefText',
                },
                label: 'divaClient_yearIssuedText',
                showLabel: true,
                validation: {
                  type: 'regex',
                  pattern: '(^[0-9]{4,4}$)',
                },
              },
            ],
          },
        ],
      },
    ],
  },
};
