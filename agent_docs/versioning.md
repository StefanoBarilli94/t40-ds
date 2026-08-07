# Versionamento

Schema condiviso da **t40-ds**, **ast40** e **gt40** — questo file è la fonte
canonica; ast40/gt40 hanno un `VERSIONING.md` alla radice che rimanda qui per il
razionale e riporta solo le regole pratiche.

## Perché non basta SemVer da solo

SemVer (`MAJOR.MINOR.PATCH`) distingue solo due livelli di "novità non rottura"
(PATCH = fix retrocompatibile, MINOR = funzionalità aggiunta retrocompatibile) — non
distingue una **migliorativa** (es. contrasto più leggibile, animazione più fluida,
copy più chiaro: nessuna nuova capacità) da un'**evolutiva** (nuovo componente, nuova
prop, nuova pagina: qualcosa che prima non esisteva). Serve comunque restare dentro
SemVer perché è quello che `bun`/`npm` e i tag Git già capiscono (`t40-ds#v0.1.1` in
ast40/package.json) — la distinzione a 3 vive nel **tipo di commit** e nel
**CHANGELOG**, il numero di versione resta a 3 cifre standard.

## Le 3 categorie → bump di versione

| Categoria | Cosa significa | Bump |
| --- | --- | --- |
| 🐛 **Bug fixing** | Comportamento non atteso, corretto | **PATCH** (x.y.**Z**+1) |
| ✨ **Migliorativa** | Qualcosa che esisteva già, reso migliore — nessuna nuova capacità | **PATCH** (x.y.**Z**+1) |
| 🚀 **Evolutiva** | Nuova funzionalità/componente/pagina, retrocompatibile | **MINOR** (x.**Y**+1.0) |
| 🚀 **Evolutiva con rottura** | Come sopra, ma cambia/rimuove qualcosa di esistente in modo incompatibile | **MAJOR** (**X**+1.0.0) |

Bug fixing e migliorative condividono il tier PATCH perché in entrambi i casi
**non c'è nulla di nuovo da imparare** per chi consuma il pacchetto/l'app — solo
qualcosa che funziona com'era già previsto o funziona meglio. Evolutiva è l'unica
categoria che aggiunge superficie (API, UI, comportamento) — da qui il bump MINOR.

## Convenzione commit (Conventional Commits, estesa)

- `fix: ...` → bug fixing → PATCH
- `improve: ...` (alternative accettate: `perf:`, `polish:`, `style:` quando calzano
  meglio) → migliorativa → PATCH
- `feat: ...` → evolutiva → MINOR
- `feat!: ...` oppure footer `BREAKING CHANGE: ...` → evolutiva con rottura → MAJOR
- `docs:`, `chore:`, `refactor:`, `test:` → non generano bump da soli; se il rilascio
  contiene anche altri commit con bump, finiscono nel CHANGELOG sotto la categoria
  più alta presente nel rilascio

## CHANGELOG.md

Un file per repo (root), aggiornato a ogni release, sezioni fisse in quest'ordine
(dalla più "grande" alla più piccola, cronologia release più recente in cima):

```markdown
## v0.2.0 — 2026-08-10

### 🚀 Evolutive
- Aggiunto componente DataTable (paginazione, toggle colonne)

### ✨ Migliorative
- Contrasto card statistica portato ad AA (4.6:1)

### 🐛 Bug fixing
- Slider disabilitato non mostrava più lo stato visivo
```

Sezioni vuote in un rilascio (es. nessuna evolutiva questo giro) si omettono, non si
lasciano vuote.

## Rilascio

**t40-ds** (libreria — il tag è ciò a cui i consumer puntano):
```bash
git tag vX.Y.Z && git push origin vX.Y.Z
```
poi in ast40/gt40: `bun add github:StefanoBarilli94/t40-ds#vX.Y.Z` per aggiornare
la dipendenza al nuovo tag (non succede da solo: `#v0.1.1` in package.json resta
fermo finché non si cambia esplicitamente).

**ast40 / gt40** (app deployate, non pubblicate come pacchetto): stesso tag Git sul
commit che va in produzione — non serve un registro npm, serve solo un riferimento
leggibile e ordinato nel tempo, coerente con lo schema del design system.
