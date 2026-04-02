# 🚀 Agile Task Automator v1.1.0

**Enterprise-Grade Chrome Extension (Manifest V3)**

Estensione Chrome che estrae task da Trello/Jira e genera documentazione tecnica Agile in Markdown/HTML. Completamente conforme alle politiche di Google Chrome Web Store.

---

## ✨ What's New in v1.1.0

### 🔒 Security & Compliance
✅ **Purple Potassium Violation Resolved**
- Rimosso permesso `"scripting"` non utilizzato
- Architettura completamente conforme a Manifest V3
- Documentazione security review aggiunta
- Enterprise-grade code comments ovunque

### 🎯 Best Practices
- Content Script accede DOM direttamente (modo sicuro)
- NO script injection
- NO eval(), NO Function() constructor
- Gestione errori completa con try-catch
- JSDoc comments su tutti i metodi

---

## 📁 Struttura del Progetto

```
agile-task-automator/
├── manifest.json                  # Manifest V3 configuration
├── popup.html                     # UI popup (Markdown/HTML generation)
├── popup.js                       # Popup logic + template generator
├── content.js                     # DOM parser + content script
├── background.js                  # Service Worker (lifecycle management)
├── SECURITY_REVIEW.md             # Enterprise security audit
├── PURPLE_POTASSIUM_FIX.md        # Detailed fix report
└── README.md                      # This file
```

---

## ⚙️ Manifest V3 Architecture

### Permissions (Minimalist Approach)
```json
"permissions": [
  "activeTab",    // ✅ Required: communicate with active tab
  "storage"       // ✅ Required: persist popup state
]
```

**Nota importante:** La versione 1.0.0 dichiarava `"scripting"` ma non lo usava. Questo è stato rimosso in v1.1.0.

### Content Scripts
```json
"content_scripts": [{
  "matches": ["https://trello.com/*", "https://*.atlassian.net/*"],
  "js": ["content.js"],
  "run_at": "document_end"
}]
```

I content script **leggono il DOM direttamente** (metodo sicuro). Nessuna injection di script.

### Service Worker
```json
"background": {
  "service_worker": "background.js"  // Manifest V3 standard
}
```

Non persistent, si carica solo quando necessario.

---

## 🚀 Come Caricare l'Estensione in Chrome

### Step 1: Apri Developer Mode

```
chrome://extensions/
```

In alto a destra, abilita il toggle **Modalità Sviluppatore**.

### Step 2: Carica l'Estensione Senza Pacchetto

1. Clicca **Carica estensione senza pacchetto**
2. Seleziona la cartella `/Users/producer/agile-task-automator`
3. Clicca **Seleziona**

### Step 3: Verifica Caricamento

```
✅ Agile Task Automator visible in extension list
✅ Icon appears in Chrome toolbar
✅ No error messages in "Details" panel
```

---

## 🧪 Testing Guide

### Test 1: Extract Trello Card

```
1. Open: https://trello.com
2. Log in → Select board → Open a card
3. Click extension icon → "📄 Cattura Task"
4. Verify: Title, description, labels extracted correctly
   ✅ Expected output in textarea as Markdown
```

### Test 2: Extract Jira Issue

```
1. Open: https://your-domain.atlassian.net/browse/PROJ-123
2. Click extension icon → "📄 Cattura Task"
3. Verify: Issue key, status, assignee, priority extracted
   ✅ Expected output in textarea as Markdown
```

### Test 3: Format Conversion

```
1. Capture any task
2. Click "Markdown" button → verify format
3. Click "HTML" button → verify conversion
4. Click "Markdown" again → verify original
   ✅ Switching formats works without data loss
```

### Test 4: State Persistence

```
1. Capture a task
2. Close the popup completely
3. Reopen the extension
4. Verify: Data is still there (saved in chrome.storage.local)
   ✅ State persists across popup opens
```

### Test 5: Clear Data

```
1. Capture any task
2. Click "🗑️ Cancella" button
3. Verify: Textarea is empty, status is cleared
4. Verify: chrome.storage.local is cleaned
   ✅ Clear function works correctly
```

### Test 6: Error Handling

```
1. Click extension icon on any non-Trello/non-Jira page
2. Click "📄 Cattura Task"
3. Verify: Error message appears
   ✅ Expected: "Impossibile catturare il task. Assicurati di essere su Trello o Jira."
```

---

## 💻 Architecture Diagram

```
USER INTERACTION
┌──────────────────────────────────────┐
│  Chrome Popup Window (popup.html)    │
│  ┌──────────────────────────────────┐│
│  │ Popup Script (popup.js)          ││
│  │ - PopupController class          ││
│  │ - Event listeners (buttons)      ││
│  │ - chrome.tabs.sendMessage()      ││
│  └──────────────────────────────────┘│
└──────────────────────────────────────┘
           ↕ messaging API
┌──────────────────────────────────────┐
│  Trello/Jira Webpage Tab             │
│  ┌──────────────────────────────────┐│
│  │ Content Script (content.js)      ││
│  │ - TaskExtractor class            ││
│  │ - querySelector() to read DOM    ││
│  │ - chrome.runtime.onMessage()     ││
│  └──────────────────────────────────┘│
└──────────────────────────────────────┘
           ↓ on lifecycle events
┌──────────────────────────────────────┐
│  Service Worker (background.js)      │
│  - Extension lifecycle management    │
│  - Message routing (if needed)       │
└──────────────────────────────────────┘
```

---

## 📊 Data Flow

### Happy Path: Task Capture

```
1. User opens Chrome popup
2. User clicks "📄 Cattura Task"
   ↓
3. popup.js calls: chrome.tabs.sendMessage({action: 'extractTask'})
   ↓
4. content.js receives message
5. TaskExtractor.extractTask() queries DOM
   - document.querySelector() finds title, description, etc.
   - No script injection, just DOM parsing
   ↓
6. content.js sends response: {success: true, data: {...}}
   ↓
7. popup.js receives data
8. AgileDocumentGenerator.generateMarkdown() creates template
   ↓
9. Result displayed in textarea
   ✅ DONE
```

### Error Path: Invalid Page

```
1. User on random website (not Trello/Jira)
2. User clicks "📄 Cattura Task"
   ↓
3. chrome.tabs.sendMessage reaches content.js (or times out)
4. TaskExtractor returns null (DOM selectors not found)
   ↓
5. popup.js receives: {success: false, error: "Unable to extract..."}
   ↓
6. Status message displayed: "❌ Impossibile catturare il task..."
   ✅ USER UNDERSTANDS WHAT WENT WRONG
```

---

## 🔒 Security Model Explained

### Content Script Isolation
- ✅ Accesso **read-only** al DOM della pagina
- ✅ **Non** può access all'estensione's code
- ✅ **Non** può inject script arbitrari
- ✅ Comunica tramite secure `chrome.runtime.sendMessage()`

### Permissions Justification
| Permission | Why? | Checked ✓ |
|------------|------|-----------|
| `activeTab` | Accedere al tab attivo per mandar messaggi | ✅ |
| `storage` | Salvare stato popup (ultimo task, formato) | ✅ |
| `host_permissions` | Solo Trello e Jira (HTTPS) | ✅ |

### Removed: Why `"scripting"` Not Needed

```javascript
// ❌ WRONG (Manifest V3 breach):
chrome.scripting.executeScript({
  target: { tabId },
  function: () => { /* malicious code */ }
});

// ✅ RIGHT (Our approach):
// Content script already on page via manifest.json
// Reads DOM directly: document.querySelector()
// No injection needed!
```

---

## 📋 Manifest V3 Compliance Checklist

- [x] Manifest version is `3`
- [x] All declared permissions are used
- [x] No `"scripting"` permission (unless actually using executeScript)
- [x] Content scripts declared in manifest, not injected dynamically
- [x] Background is a Service Worker, not persistent
- [x] No eval(), Function() constructor, or HTML injection
- [x] HTTPS-only host permissions
- [x] JSDoc comments on all public methods
- [x] Error handling with try-catch
- [x] Logging for debugging (no sensitive data logged)

---

## 🛠️ Development Tips

### Debugging Content Script
```
View console output:
1. Right-click on Trello/Jira page
2. Inspect → Console tab
3. Filter by source "content.js" in DevTools
   (You'll see TaskExtractor logs)
```

### Debugging Popup Script
```
View popup's DevTools:
1. Inspect the popup (right-click on popup)
2. Or: chrome://extensions/
3. Click "background page" link for Service Worker debugging
```

### View Extension Storage
```
chrome://extensions/ → Your Extension → Inspect views "popup (f12)"
→ Application tab → Local Storage → chrome-extension://[ID]
```

---

## 📝 Generated Documentation Example

When you capture a task, you get:

```markdown
# Card Title

**Source:** TRELLO | **Date:** 29/03/2026

---

## 📋 Description
[Card description content]

---

## 👤 User Story

As [stakeholder/team]
I want [action/functionality]
So that [benefit/value]

---

## ✅ Acceptance Criteria

- [ ] Criteria 1: Define specific objectives
- [ ] Criteria 2: Verify data completeness
- [ ] Criteria 3: Validate input forms
- [ ] Criteria 4: Document expected behavior

---

## 🛠️ Technical Notes

### Technology Stack
Platform: Chrome Extension (Manifest V3)
Languages: JavaScript (ES6+), HTML5, CSS3
Architecture: Event-driven, Async messaging

[...more details...]
```

---

## 📚 Related Documentation

For detailed information, see:
- **[SECURITY_REVIEW.md](SECURITY_REVIEW.md)** - Enterprise security audit
- **[PURPLE_POTASSIUM_FIX.md](PURPLE_POTASSIUM_FIX.md)** - Detailed fix explanation

---

## 🎯 Next Steps

### For Local Development
```bash
cd /Users/producer/agile-task-automator
# Make changes
# Reload extension: chrome://extensions → click refresh
# Test on Trello/Jira
```

### For Chrome Web Store Submission
```bash
# 1. Verify manifest.json version: "1.1.0"
# 2. Create ZIP file (all files except .git)
# 3. Go to: https://chrome.google.com/webstore/developer/dashboard
# 4. Upload ZIP
# 5. Include note: "Purple Potassium violation resolved - scripting permission removed"
# 6. Submit for review
```

---

## 📞 Support

If things don't work:
1. Check [SECURITY_REVIEW.md](SECURITY_REVIEW.md) for compliance details
2. Review [PURPLE_POTASSIUM_FIX.md](PURPLE_POTASSIUM_FIX.md) for v1.1.0 changes
3. Verify manifest.json has no unused permissions
4. Check chrome://extensions logs for errors

---

**Version:** 1.1.0  
**Status:** ✅ Chrome Web Store Ready  
**Last Updated:** March 29, 2026


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
