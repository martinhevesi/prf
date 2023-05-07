# README
- A **prf.zip** kibontása után, a könyvtárban futtasd le az `npm install` parancsot, amely telepíti az összes szükséges függőséget (node_modules).
- Ezután a *./src* könyvtárba lépve add ki a `node ./index.js` parancsot.
- Az alkalmazás a http://localhost:3000 url-en érhető el a böngészőből. Mivel a backend statikusan hostolja a frontendet, ezért rosszul reagál az app a manuális oldal frissítésre illetve az url-ek közti manuális váltásra, ha ez történik, ki kell törölni az urlben a 3000 utáni részeket és megoldódik.