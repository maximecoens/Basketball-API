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
AUTH_JWKS_URI="https://(TENANT)/.well-known/jwks.json"
AUTH_AUDIENCE="(API-IDENTIFIER)"
AUTH_ISSUER="https://(TENANT)"
AUTH_USER_INFO="https://(TENANT)/userinfo"
```
De username en password van de database zal je zelf moeten instellen met uw eigen lokale databank.

Om op te starten in development modus zal je `yarn start` moeten gebruiken
Voor hem in production modus op te starten zal je `yarn start:prod`. Hier moet verder geen extra informatie uit een .env file worden meegegeven.

## Testen

```
NODE_ENV=test
DATABASE_USERNAME=""
DATABASE_PASSWORD=""
AUTH_JWKS_URI="https://(TENANT)/.well-known/jwks.json"
AUTH_AUDIENCE="(API-IDENTIFIER)"
AUTH_ISSUER="https://(TENANT)"
AUTH_USER_INFO="https://(TENANT)/userinfo"

AUTH_TEST_USER_USER_ID="(TEST-USER-AUTH0ID)"
AUTH_TEST_USER_USERNAME="(TEST-USER-USERNAME)"
AUTH_TEST_USER_PASSWORD="(TEST-USER-PASSWORD)"
AUTH_TOKEN_URL="https://(TENANT)/oauth/token"
AUTH_CLIENT_ID="(YOUR-CLIENT-ID)"
AUTH_CLIENT_SECRET="(YOUR-CLIENT-SECRET)"
```
De username en password van de database zal je zelf moeten instellen met uw eigen lokale databank.

Om de testen te runnen kan men `yarn test` uitvoeren. Voor de coverage van de testen te krijgen kan men `yarn test:coverage` gebruiken.

## Errors
- Als er enkele modules niet gevonden werden kan het commando `yarn install` runnen.
- Als de `migrations failen` kan men de database `186204mc` droppen en dan opnieuw proberen runnen.
