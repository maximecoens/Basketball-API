# Maxime Coens (202186204)

- [ ] Front-end Web Development
  - [GitHub repository](github.com/HOGENT-Web)
  - [Online versie](github.com/HOGENT-Web)
- [x] Web Services: "https://github.com/Web-IV/2223-webservices-maximecoens"
  - [GitHub repository](https://github.com/Web-IV/2223-webservices-maximecoens)
  - [Online versie](https://sport-applicatie.onrender.com)

**Logingegevens**

Gebruiker ADMIN:
- Gebruikersnaam/e-mailadres: admin@sportapp.be
- Wachtwoord: Admin123

Gebruiker TESTER:
- Gebruikersnaam/e-mailadres: e2e-testing@sportapp.be
- Wachtwoord: Tester123

Gebruiker USER:
- Gebruikersnaam/e-mailadres: user@sportapp.be
- Wachtwoord: Sportappuser123

## Projectbeschrijving

Over dit semester heen heb ik een API gemaakt in NodeJS. Aangezien ik enkel het vak Web Services opneem, heb ik geen Front-end en zal mijn gemaakte API niet als back-end kunnen werken voor een zelf gemaakte Front-end.
Ik heb er voor gekozen een API te maken in de lijn met mijn passie, sport/basketbal.
Er zijn vier tabellen gemaakt in het ERD (zoals je ziet in de foto hier onder): clubs, teams, spelers en games.
De API bevat dus gegevens over spelers of sporters die aan een sport doen in clubverband.
Hierbij heb ik er voor gekozen dit specifiek voor basketbal te maken.
Een speler kan zich registreren aan de hand van een team dat hij zichzelf kan in plaatsen, dit team behoort tot een club en heeft de mogelijkheid om games te spelen. Deze games bestaan door 2 teams die tegen elkaar zullen spelen.
Een speler die de rol admin heeft kan specifiek teams, clubs en games aanmaken, verwijderen en updaten.

**ERD**
<br />
![image](https://user-images.githubusercontent.com/84249943/209184565-3a9aa59b-8f59-446d-a52b-4dd79ea52980.png)


## Screenshots

Geen screenshots van een applicatie, niet nodig doordat ik enkel het vak `Web Services` had en dus geen Front-end development. Hierdoor kan ik geen screenshots van een applicatie tonen. Ik toon wel een screenshot van de API die online werd gezet.
![image](https://user-images.githubusercontent.com/84249943/209407624-d180db20-ee05-41cc-ac02-bd234112b328.png)


## Behaalde minimumvereisten

### Front-end Web Development

Aangezien ik geen Front-end doe worden volgende velden opengelaten.

- **componenten**

  - [ ] heeft meerdere componenten - dom & slim (naast login/register)
  - [ ] definieert constanten (variabelen, functies en componenten) buiten de component
  - [ ] minstens één form met validatie (naast login/register)
  - [ ] login systeem (eigen of extern zoals bv. Auth0)
<br />

- **routing**
  - [ ] heeft minstens 2 pagina's (naast login/register)
  - [ ] routes worden afgeschermd met authenticatie en autorisatie
<br />

- **state-management**

  - [ ] meerdere API calls (naast login/register)
  - [ ] degelijke foutmeldingen indien API call faalt
  - [ ] gebruikt useState enkel voor lokale state
  - [ ] gebruikt Context, useReducer, Redux… voor globale state
<br />

- **hooks**

  - [ ] kent het verschil tussen de hooks (useCallback, useEffect…)
  - [ ] gebruikt de hooks op de juiste manier
<br />

- **varia**
  - [ ] een aantal niet-triviale testen (unit en/of e2e en/of ui)
  - [ ] minstens één extra technologie
  - [ ] duidelijke en volledige README.md
  - [ ] volledig en tijdig ingediend dossier


### Web Services

- **datalaag**

  - [x] voldoende complex (meer dan één tabel)
  - [x] één module beheert de connectie + connectie wordt gesloten bij sluiten server
  - [x] heeft migraties
  - [x] heeft seeds
<br />

- **repositorylaag**

  - [x] definieert één repository per entiteit (niet voor tussentabellen) - indien van toepassing
  - [x] mapt OO-rijke data naar relationele tabellen en vice versa
<br />

- **servicelaag met een zekere complexiteit**

  - [x] bevat alle domeinlogica
  - [x] bevat geen SQL-queries of databank-gerelateerde code
<br />

- **REST-laag**

  - [x] meerdere routes met invoervalidatie
  - [x] degelijke foutboodschappen
  - [x] volgt de conventies van een RESTful API
  - [x] bevat geen domeinlogica
  - [x] degelijke authorisatie/authenticatie op alle routes
<br />

- **varia**
  - [x] een aantal niet-triviale testen (min. 1 controller >=80% coverage)
  - [x] minstens één extra technologie
  - [x] duidelijke en volledige `README.md`
  - [x] maakt gebruik van de laatste ES6-features (object destructuring, spread operator...)
  - [x] volledig en tijdig ingediend dossier


## Projectstructuur

### Web Services

De API werd opgebouwd via een gelaagde structuur. Waarbij we een `repositorylaag` hebben waar alle SQL statements worden uitgevoerd voor het opvragen en manipuleren van de data die werd meegegeven in de https request. Daarnaast hebben we de `servicelaag` die vooral voor de logica bestaat en dus de juiste data en opdrachten zal doorgeven repositorylaag. En ten slotte is er een `restlaag` waar de https request worden gelezen en daarna doorgegeven aan de servicelaag. Ook validaties worden daar uitgevoerd en de permissies zullen worden gecheckt.

In de `datalaag` vinden we de seedings en migrations voor de databank. Ook de mock-data, die niet meer wordt gebruikt staat daar ook nog. Daarnaast wordt ook de databank daar geïnitialiseerd en maken we hier een knexinstantie aan.

## Extra technologie

### Web Services

Als extra technologie heb ik gekozen voor `Swagger`,  dit is een technologie, waarmee je jouw API-structuur kunt beschrijven en lezen. Hier werd er dus een interactieve API-documentatie gebouwd. Via de `Swagger UI` krijgen we een duidelijker beeld van hoe de API in elkaar zit aan de hand van voorbeelden, probeermogelijkheden van requests, ...

**npm packages**
- Swagger: https://www.npmjs.com/package/swagger
- Swagger UI: https://www.npmjs.com/package/swagger-ui

## Testresultaten

### Web Services

Van teams, clubs en games werden voor voor elke table de GET, GET /:id, POST, PUT en DELETE HTTPS methods getest op de juiste werking van deze methodes.
Bij spelers werden enkel de GET, GET /:id en DELETE HTTPS methods getest.
Aan de hand van mock data die telkens in de database 186204mc_test werd geplaatst, werden enkele opties getest zoals: de juiste status weergeven bij een request, zorgen dat alle data juist werd teruggegeven bij de methodes door het kijken naar de body van het response.
![image](https://user-images.githubusercontent.com/84249943/209231913-8b9c1351-0fba-409f-a861-237b7cf71587.png)


## Gekende bugs

### Web Services

**Meertaligheid**
<br />
De code van de backend staat niet geschreven in 1 taal. Dit is een combinatie van Nederlands en Engels. De code zelf werd in het engels geschreven maar enkele Error messages en andere loggings werden in het Nederlands geschreven.
