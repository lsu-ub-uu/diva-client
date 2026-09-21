# Utvecklarresurser

## Om Cora

DiVA är byggt på open-sourceplattformen Cora.

Cora är ett namn, som anspelar på det engelska ordet core. Det är ett generiskt system, inte DiVA i sig, men DiVA är byggt på Cora.

Cora är ett metadatadrivet system. Det innebär att hela systemet är definierat i metadata, som posttyper, vallistor, variabler, texter, presentation etc. och att dessa definitioner är direkt tillgängliga via API:et.

Målsättningen med REST-API:et är att fullt ut kunna stödja andra klienter (andra plattformar som Android eller ios, integration mot andra system, servrar som klienter eller andra som vill bygga egna gränssnitt mot DiVA). Hela systemet är åtkomligt via API:et. DiVA-förvaltningen har möjligheten att förändra formulär och presentation utan förändring i klienten.

Utvecklingen av Cora görs också löpande tillgänglig som öppen källkod på [GitHub](https://github.com/lsu-ub-uu).

## REST-API

Dokumentation för DiVAs REST API hittar du här: [REST](/rest/). Se även [API Helper](/api-helper) för ytterligare dokumentation.

API:et ger på samma sätt som klienten tillgång till att skapa, läsa, uppdatera, ta bort, validera och indexera poster. Samt att ladda upp och ner binärer. API:et stödjer både XML och JSON.

## API Helper

Detta är en applikation som har målet att hjälpa utvecklare som arbetar mot DiVAs REST-API genom att visualisera metadat och anropskonfigurationer.

API Helper hittar du här: [API Helper](/api-helper)

## JSClient

En alternativ klient med samma data och samma behörigheter som i DiVA-klienten. Denna klient är mer tekniknära och exponerar metadatat tydligare.

JSClient hittar du här: [JSClient](/jsclient).
