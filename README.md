# Country Explorer

Country Explorer er et nettsted laget med Next.js og TypeScript. Nettstedet gjør det mulig å utforske land fra hele verden og finne informasjon om blant annet hovedstad, region, befolkning, språk og valuta.

Prosjektet er utviklet som delinnlevering 2 i arbeidskravet for Next.js og TypeScript.

## Målgruppe

Nettstedet er laget for brukere som ønsker en enkel og oversiktlig måte å finne grunnleggende informasjon om ulike land.

## Funksjonalitet

- Viser land hentet fra et eksternt API.
- Viser hvert land som et eget gjenbrukbart kort.
- Har dynamiske detaljsider for hvert land.
- Lar brukeren søke etter land basert på navn.
- Lar brukeren filtrere land etter region.
- Lar brukeren sortere etter navn eller befolkning.
- Har en knapp for å nullstille søk, filter og sortering.
- Viser en forståelig melding når søket ikke gir treff.
- Håndterer ugyldige landkoder med en egen ikke-funnet-side.
- Håndterer lasting og feil ved datainnhenting.
- Har responsivt design for mobil og større skjermer.
- Kan navigeres med tastatur og har synlig fokusmarkering.

## Teknologier

- Next.js
- React
- TypeScript
- CSS Modules
- REST Countries API
- Git og GitHub

## Datakilde

Prosjektet bruker REST Countries API v5:

```text
https://api.restcountries.com/countries/v5
```

API-et krever en API-nøkkel. Nøkkelen sendes som en Bearer-token fra serversiden og blir ikke gjort tilgjengelig i klientkoden.

## Installasjon

Klon repositoryet:

```bash
git clone https://github.com/AArelsen/country-explorer.git
```

Gå inn i prosjektmappen:

```bash
cd country-explorer
```

Installer avhengighetene:

```bash
npm install
```

## Konfigurasjon

## Konfigurasjon

Prosjektet krever en API-nøkkel fra REST Countries.

1. Gå til [REST Countries](https://restcountries.com/).
2. Opprett en konto og generer en API-nøkkel ved å følge instruksjonene hos API-leverandøren.
3. Opprett en fil som heter `.env.local` i rotmappen.
4. Legg API-nøkkelen inn slik:

```env
REST_COUNTRIES_API_KEY=din_api_nøkkel
```

Filen `.env.local` skal ikke legges i Git. Repositoryet inneholder en `.env.example` som viser hvilken variabel som må konfigureres.

## Starte prosjektet

Start utviklingsserveren:

```bash
npm run dev
```

Åpne følgende adresse i nettleseren:

```text
http://localhost:3000
```

## Bygge prosjektet

Kontroller at prosjektet kan bygges:

```bash
npm run build
```

Start den ferdig bygde versjonen:

```bash
npm start
```

## Sider

- `/` – forside
- `/countries` – oversikt over land
- `/countries/[code]` – detaljside for et valgt land
- `/about` – informasjon om nettstedet, datakilden og utvikleren

## Kjent begrensning

Nettstedet er avhengig av at REST Countries API er tilgjengelig og at en gyldig API-nøkkel er konfigurert. Enkelte land kan ha manglende opplysninger i API-et. Nettstedet viser derfor alternative tekster når enkelte data ikke er tilgjengelige.

## Utvikler

Laget av Adam Arelsen.
