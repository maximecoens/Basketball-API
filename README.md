# Examenopdracht Web Services

- Student: Maxime Coens
- Studentennummer: 202186204
- E-mailadres: maxime.coens@student.hogent.be

## Vereisten

Ik verwacht dat volgende software reeds geïnstalleerd is:

- [NodeJS](https://nodejs.org)
- [Yarn](https://yarnpkg.com)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)

## Opstarten

### .ENV bestanden aanmaken
Om deze API te starten moet men een `.env` bestand aanmaken in de root van de foler.
Dit bestand bevat volgende informatie:

```
NODE_ENV=development
DATABASE_USERNAME=""
DATABASE_PASSWORD=""
AUTH_JWKS_URI=https://maxime-hogent.eu.auth0.com/.well-known/jwks.json
AUTH_AUDIENCE=https://sport-app.hogent.be
AUTH_ISSUER=https://maxime-hogent.eu.auth0.com/
AUTH_USER_INFO=https://maxime-hogent.eu.auth0.com/userinfo
```
De username en password van de database zal je zelf moeten instellen met uw eigen lokale databank.

Om op te starten in development modus zal je `yarn start` moeten gebruiken
Voor hem in production modus op te starten zal je `yarn start:prod`. Hier moet verder geen extra informatie uit een .env file worden meegegeven.

## Testen

```
NODE_ENV=test
DATABASE_USERNAME=""
DATABASE_PASSWORD=""

AUTH_JWKS_URI=https://maxime-hogent.eu.auth0.com/.well-known/jwks.json
AUTH_AUDIENCE=https://sport-app.hogent.be
AUTH_ISSUER=https://maxime-hogent.eu.auth0.com/
AUTH_USER_INFO=https://maxime-hogent.eu.auth0.com/userinfo

AUTH_TEST_USER_USER_ID=auth0|63a4cfbddd84a45a70f91a40
AUTH_TEST_USER_USERNAME=e2e-testing@sportapp.be
AUTH_TEST_USER_PASSWORD=Tester123
AUTH_TOKEN_URL=https://maxime-hogent.eu.auth0.com/oauth/token
AUTH_CLIENT_ID=nAQTe7xNniWjBsUCxz5ABVUqPhXAfkR9
AUTH_CLIENT_SECRET=Ie2bGcyo5-bTt577332wPm8kFB7-4YSdScozWqXsJydRD5a2neeHTw4vBwjOuLf6
```
De username en password van de database zal je zelf moeten instellen met uw eigen lokale databank.

Om de testen te runnen kan men `yarn test` uitvoeren. Voor de coverage van de testen te krijgen kan men `yarn test:coverage` gebruiken.

## Errors
- Als er enkele modules niet gevonden werden kan het commando `yarn install` runnen.
- Als de `migrations failen` kan men de database `186204mc` droppen en dan opnieuw proberen runnen.
