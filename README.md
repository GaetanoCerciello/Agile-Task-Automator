# 🚀 Agile Task Automator - Guida Completa

Estensione Chrome Manifest V3 per catturare task da Trello/Jira e generare documentazione tecnica Agile in Markdown/HTML.

## 📁 Struttura del Progetto

```
agile-task-automator/
├── manifest.json          # Configurazione estensione (Manifest V3)
├── popup.html            # Interfaccia popup
├── popup.js              # Logica popup e generazione documentazione
├── content.js            # Estrazione dati dalle pagine
├── background.js         # Service Worker (Manifest V3)
└── README.md             # Questo file
```

## ⚙️ Configurazione Manifest V3

Il `manifest.json` specifica:
- **API Permissions**: `activeTab`, `scripting`, `storage`
- **Host Permissions**: Trello e Jira (*.atlassian.net)
- **Content Scripts**: Iniettati su Trello/Jira
- **Service Worker**: Background.js per logica event-driven

## 🚀 Come Caricare l'Estensione in Chrome

### Step 1: Apri la pagina delle estensioni Chrome

```
chrome://extensions/
```

Oppure:
1. Chrome Menu (≡) → **Altre Strumenti** → **Estensioni**
2. Oppure premi: **Cmd+Shift+J** (su Mac)

### Step 2: Abilita la Modalità Sviluppatore

In alto a destra, attiva il toggle **Modalità Sviluppatore**.

![Developer Mode Toggle - in alto a destra della pagina]

### Step 3: Carica l'Estensione Senza Pacchetto

1. Clicca il bottone **Carica estensione senza pacchetto** (in alto a sinistra)
2. Naviga alla cartella: `/Users/producer/agile-task-automator`
3. Seleziona la cartella e clicca **Seleziona**

### Step 4: Verifica Caricamento

Dovresti vedere:
- ✅ **Agile Task Automator** nella lista estensioni
- 🎨 Icona estensione nella barra in alto di Chrome
- 📊 ID Estensione (es: `jkpmhhfjjflkgalndkdghkflkgnmkjlh`)

## 🧪 Test dell'Estensione

### Scenario 1: Test su Trello

1. **Apri Trello**: https://trello.com
2. **Accedi** col tuo account Trello
3. **Apri una Card** (task) in una Board
4. **Clicca l'icona** dell'estensione in alto a destra
5. **Clicca "📄 Cattura Task"**
6. ✅ La documentazione apparirà nella textarea

### Scenario 2: Test su Jira

1. **Apri Jira**: https://your-domain.atlassian.net
2. **Apri un Issue**
3. **Ripeti steps 4-6** come per Trello

### Scenario 3: Test Conversione Formato

1. **Cattura un task**
2. **Clicca "HTML"** per convertire in HTML
3. **Clicca "Markdown"** per tornare a Markdown
4. ✅ L'output cambierà formato

## 📋 Struttura File Dettagliata

### manifest.json
```json
{
  "manifest_version": 3,
  "name": "Agile Task Automator",
  "version": "1.0.0",
  "permissions": ["activeTab", "scripting", "storage"],
  "host_permissions": ["https://trello.com/*", "https://*.atlassian.net/*"],
  "action": {
    "default_popup": "popup.html",
    "default_title": "Agile Task Automator"
  },
  "content_scripts": [{
    "matches": ["https://trello.com/*", "https://*.atlassian.net/*"],
    "js": ["content.js"]
  }],
  "background": {
    "service_worker": "background.js"
  }
}
```

### content.js - Funzionalità Chiave
- **TaskExtractor.extractTrelloTask()**: Legge i selettori DOM di Trello
- **TaskExtractor.extractJiraTask()**: Legge i selettori DOM di Jira
- **TaskExtractor.extractGenericTask()**: Fallback per altre pagine

### popup.js - Funzionalità Chiave
- **AgileDocumentGenerator.generateMarkdown()**: 
  - User Story
  - Acceptance Criteria
  - Note Tecniche
  - Metadati (priority, assignee, status)
- **AgileDocumentGenerator.markdownToHtml()**: Conversione markup
- **PopupController**: Gestione UI e persistenza dati

### background.js - Service Worker
- Event listener per installazione/update
- Message handler per comunicazione tra script
- Logging centralizzato

## 🔧 Debugging e Troubleshooting

### Come Vedere i Log della Console

1. **Nella stessa pagina Chrome**:
   - Clicca mouse destro sul popup
   - **Ispeziona** (Inspect)
   - **Console** tab

2. **Per il Content Script**:
   - Apri DevTools sul tab Trello/Jira (F12)
   - **Console** tab
   - Dovresti vedere: `"Task Extractor ready on: trello.com"`

3. **Per il Service Worker**:
   - Vai a `chrome://extensions/`
   - Clicca **Service worker** sotto l'estensione

### Errori Comuni

**Errore: "Impossible to read from content script"**
- Soluzione: Ricarica l'estensione (`chrome://extensions/` → Aggiorna icona)
- Ricarica il tab Trello/Jira

**Errore: "Cannot find selectors"**
- Soluzione: I selettori DOM di Trello/Jira potrebbero essere cambiati
- Apri DevTools e ispeziona gli elementi
- Aggiorna i selettori in `content.js`

**Il popup non mostra dati**
- Verifica di essere su Trello/Jira
- Controlla i log della console
- Assicurati che Manifest V3 sia corretto

## 🎯 Prossimi Passi di Sviluppo

1. **Icone**: Aggiungi iconografia 16x48x128 in cartella `/images/`
2. **Storage Persistente**: Salva cronologia di task catturati
3. **Export**: 
   - Export a file .md / .html
   - Integrazione Slack webhook
   - Copy to clipboard
4. **Template Customizzabili**: Permettere all'utente di creare template custom
5. **Multi-lingua**: Localizzazione (EN, IT, ES, FR)
6. **Analytics**: Traccia numero di task catturati
7. **Settings Page**: Opzioni di configurazione

## 📦 Come Preparare per il Chrome Web Store

1. **Crea account Google Developer**: https://developer.chrome.com
2. **Prepara il package**:
   ```bash
   zip -r agile-task-automator.zip agile-task-automator/
   ```
3. **Carica su Chrome Web Store**
4. **Compila metadati**: descrizione, screenshot, banner

## 🔐 Note Sicurezza (Manifest V3)

- ✅ **Content Security Policy**: Protetto da default
- ✅ **No Eval**: JavaScript non può usare `eval()`
- ✅ **Service Worker**: Non rimane in memoria, esegue solo quando necessario
- ✅ **Host Permissions**: Limitato a Trello e Jira
- ✅ **Storage**: Salva dati localmente, non su cloud

## 📚 Risorse Utili

- [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Migration Guide](https://developer.chrome.com/docs/extensions/mv3/migration/)
- [Trello API Docs](https://developer.atlassian.com/cloud/trello/)
- [Jira API Docs](https://developer.atlassian.com/cloud/jira/)

## 💡 Tips & Tricks

### Copiare Output negli Appunti
Aggiungi questo bottone nel popup:

```javascript
navigator.clipboard.writeText(this.outputText.value)
  .then(() => console.log('Copiato negli appunti!'))
  .catch(err => console.error('Errore copy:', err));
```

### Aggiungere Scorciatoie da Tastiera
Nel manifest.json:

```json
"commands": {
  "capture-task": {
    "suggested_key": {
      "default": "Ctrl+Shift+T",
      "mac": "Command+Shift+T"
    },
    "description": "Cattura il task corrente"
  }
}
```

### Salva PDF
Usa libreria `html2pdf.js`:

```javascript
const element = document.getElementById('outputText');
html2pdf().set(options).fromElement(element).save('task.pdf');
```

## 👨‍💼 Info Autore

Creato seguendo best practices Enterprise di **Accenture** e **Saipem**.
- Manifest V3 compliance
- Secure messaging patterns
- Clean architecture (MVC)
- Modular, maintainable code

---

**Versione**: 1.0.0  
**Ultimo aggiornamento**: Marzo 2026  
**Licenza**: MIT
