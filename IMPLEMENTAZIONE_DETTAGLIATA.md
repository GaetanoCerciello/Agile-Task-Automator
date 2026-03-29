# 📚 Guida Dettagliata: Caricamento in VS Code e Testing su Chrome

Questo documento fornisce una guida completa **passo dopo passo** per caricare l'estensione "Agile Task Automator" in VS Code e testarla su Chrome.

---

## 🎯 Capitolo 1: Preparazione dell'Ambiente

### Prerequisiti
- ✅ **Chrome Browser** (versione 88+) - [Scarica qui](https://www.google.com/chrome/)
- ✅ **VS Code** - [Scarica qui](https://code.visualstudio.com/)
- ✅ **Cartella del progetto**: `/Users/producer/agile-task-automator/`

### Verificare Installazioni
Apri Terminale e esegui:

```bash
# Verifica Chrome
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --version

# Verifica VS Code
code --version
```

---

## 🚀 Capitolo 2: Aprire il Progetto in VS Code

### Step 1: Apri VS Code
```bash
open -a "Visual Studio Code" /Users/producer/agile-task-automator
```

Oppure:
1. Apri VS Code
2. **File** → **Open Folder**
3. Seleziona `/Users/producer/agile-task-automator`

### Step 2: Esplora la Struttura del Progetto

Nel pannello **Explorer** (sinistra) vedrai:

```
📦 agile-task-automator/
 ├── 📄 manifest.json
 ├── 🎨 popup.html
 ├── 🔧 popup.js
 ├── 📝 content.js
 ├── 🖥️ background.js
 ├── 📚 README.md
 ├── 📖 IMPLEMENTAZIONE_DETTAGLIATA.md (questo file)
 ├── 🧪 test-demo.html
 ├── 📦 package.json
 ├── .gitignore
 ├── 📁 images/
 │  ├── icon-16.png
 │  ├── icon-48.png
 │  └── icon-128.png
 └── 📁 .vscode/
    ├── settings.json
    └── launch.json
```

### Step 3: Apri il Terminale Integrato in VS Code

Premi: **Cmd+Shift+`** (backtick)

Oppure:
- **View** → **Terminal**

---

## 🔍 Capitolo 3: Verificare i File

### Controlla che i file siano corretti

Nel Terminale integrato di VS Code, esegui:

```bash
# Mostra la struttura
ls -la

# Verifica manifest.json
cat manifest.json | head -20

# Controlla popup.html esiste
file popup.html

# Verifica content.js
wc -l content.js
```

Output atteso:
```
manifest.json        manifest.json
popup.html          manifest.json, popup.html, content.js, ecc.
popup.html: HTML document, ASCII text
content.js: 156 lines
```

---

## 🌐 Capitolo 4: Caricamento in Chrome

### Step 1: Apri la Pagina Estensioni Chrome

Opzione A (Veloce):
```bash
open "chrome://extensions/"
```

Opzione B (Manuale):
1. Apri Chrome
2. Clicca Menu (≡) in alto a destra
3. **Altre Strumenti** → **Estensioni**

### Step 2: Abilita Modalità Sviluppatore

In **chrome://extensions/**:
- Guarda in alto a DESTRA
- Attiva il toggle **Modalità Sviluppatore** (diventerà BLU)

![Toggle Developer Mode Position Image]

### Step 3: Carica Estensione Senza Pacchetto

Dopo aver abilitato la Modalità Sviluppatore, vedrai 3 bottoni in alto a sinistra:

- **Carica estensione senza pacchetto** ← Clicca questo
- Carica estensione pacchettizzata
- Aggiorna

### Step 4: Seleziona Cartella Progetto

1. Clicca **Carica estensione senza pacchetto**
2. Naviga a: `/Users/producer/agile-task-automator`
3. Seleziona la cartella
4. Clicca **Seleziona**

### Step 5: Verifica Caricamento

Dovresti vedere nella lista:

```
🔵 AGILE TASK AUTOMATOR
   ID: jkpmhhfjjflkgalndkdghkflkgnmkjlh (o simile)
   Versione: 1.0.0
   
   [Bottone] Service worker ready
   [Checkbox] Consenti accesso all'incognito
```

✅ **Se vedi questo, l'estensione è caricata correttamente!**

---

## 🧪 Capitolo 5: Testing dell'Estensione

### Scenario 1: Test su Pagina Demo (Consigliato per primo)

#### 1a. Ottieni il path della pagina demo
```bash
cd /Users/producer/agile-task-automator
pwd
# Output: /Users/producer/agile-task-automator
```

#### 1b. Apri la pagina demo in Chrome
```bash
open test-demo.html
```

Oppure:
- In Chrome: **Cmd+O**
- Naviga a: `/Users/producer/agile-task-automator/test-demo.html`
- Clicca **Apri**

#### 1c. Usa l'estensione

1. **Clicca l'icona estensione** in alto a destra di Chrome (vedrai un piccolo quadrato viola con "AT")
2. Si aprirà il popup dell'estensione
3. Clicca **📄 Cattura Task**
4. Attendi 1-2 secondi
5. ✅ Vedrai la documentazione generata nella textarea

#### 1d. Prova i Formati

- Clicca **Markdown** → Vedi formato Markdown
- Clicca **HTML** → Vedi formato HTML completo

### Scenario 2: Test su Trello Reale

#### 2a. Accedi a Trello
```bash
open "https://trello.com"
```

#### 2b. Accedi al tuo account Trello
- Inserisci email/password
- Accedi

#### 2c. Apri una Card
1. Seleziona una Board
2. Clicca su una Card per aprire i dettagli

#### 2d. Cattura il Task
1. Clicca l'icona dell'estensione (in alto a destra di Chrome)
2. Clicca **📄 Cattura Task**
3. ✅ Vedrai i dati della card di Trello convertiti in documentazione

### Scenario 3: Test su Jira

#### 3a. Accedi a Jira
```bash
open "https://your-domain.atlassian.net"
```

#### 3b. Apri una Issue
1. Naviga a una Issue
2. Attendi caricamento

#### 3c. Cattura l'Issue
1. Clicca l'icona dell'estensione
2. Clicca **📄 Cattura Task**
3. ✅ Vedrai i dati dell'Issue di Jira

---

## 🐛 Capitolo 6: Debugging

### Visualizzare Console Popup

Quando il popup è aperto:
1. **Clicca destro** sul popup
2. **Ispeziona** (Inspect)
3. Si apriranno DevTools
4. Vai tab **Console**
5. Vedrai eventuali errori o log

### Visualizzare Console Content Script

Su una pagina Trello/Jira:
1. Apri DevTools: **Cmd+Option+I** (F12)
2. Vai tab **Console**
3. Dovresti vedere: `"Task Extractor ready on: trello.com"`

### Visualizzare Service Worker Logs

In `chrome://extensions/`:
1. Trova **Agile Task Automator**
2. Clicca il link **Service worker** (sotto il nome)
3. Si apriranno DevTools per il Service Worker

### Errori Comuni e Soluzioni

#### ❌ "Message port closed before a response was received"
**Causa**: Extension non è caricata
**Soluzione**: 
```bash
# In chrome://extensions/, clicca il bottone Aggiorna accanto all'estensione
```

#### ❌ "Cannot read properties of null (reading 'textContent')"
**Causa**: I selettori DOM non corrispondono
**Soluzione**:
1. Apri DevTools sulla pagina Trello (F12)
2. Ispeziona gli elementi della card
3. Aggiorna i selettori in `content.js`

Esempio: Se il titolo è in un elemento diverso:
```javascript
// OLD (non funziona)
const titleSelector = '[aria-label*="Card"]';

// NEW (corretto)
const titleSelector = '.card-name'; // nuovo selettore
```

#### ❌ Il popup non mostra dati
**Causa**: Stai su una pagina non supportata
**Soluzione**:
- Usa solo su Trello, Jira o la pagina demo

---

## 📝 Capitolo 7: Modifica e Reload

### Modificare il Codice

1. **Apri il file in VS Code** (es. `popup.js`)
2. **Fai modifiche**
3. **Salva**: **Cmd+S**

### Reload dell'Estensione

Dopo aver modificato il codice:

**Opzione 1 - Via Chrome:**
1. Vai a `chrome://extensions/`
2. Clicca il bottone **⟲ Aggiorna** accanto a Agile Task Automator

**Opzione 2 - Via Terminale:**
```bash
# Apri il profilo Chrome in modo debug
open -a Google\ Chrome --args --remote-debugging-port=9222
```

### Reload Pagina Browser

Se il popup non funziona:
1. Ricarica la pagina Trello/Jira: **Cmd+R**
2. Aspetta 2 secondi
3. Riprova a catturare il task

---

## 🎨 Capitolo 8: Personalizzazione e Feature Aggiuntive

### Aggiungere un Pulsante "Copia negli Appunti"

In `popup.html`, aggiungi dopo il textarea:

```html
<button class="btn-secondary" id="copyBtn">📋 Copia</button>
```

In `popup.js`, nel constructor aggiungi:

```javascript
document.getElementById('copyBtn').addEventListener('click', () => {
  navigator.clipboard.writeText(this.outputText.value)
    .then(() => this.showStatus('✅ Copiato negli appunti!', 'success'))
    .catch(err => this.showStatus('❌ Errore copy: ' + err.message, 'error'));
});
```

### Aggiungere Dark Mode

In `popup.html`, aggiungi uno stile media query:

```css
@media (prefers-color-scheme: dark) {
  body {
    background: #1f2937;
    color: #e5e7eb;
  }
  textarea {
    background: #111827;
    color: #e5e7eb;
    border-color: #374151;
  }
}
```

### Aggiungere Esporta File

In `popup.js`:

```javascript
exportBtn.addEventListener('click', () => {
  const content = this.outputText.value;
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `task-${new Date().toISOString().slice(0,10)}.md`;
  a.click();
});
```

---

## 📊 Capitolo 9: Performance e Ottimizzazione

### Monitorare Performance

In DevTools:
1. Apri Performance tab
2. Premi il bottone Cattura Task
3. Guarda il timeline di esecuzione

Target performance:
- ✅ Cattura dati: < 100ms
- ✅ Generazione doc: < 50ms
- ✅ Aggiornamento UI: < 30ms

### Controllare Memoria

In Chrome DevTools:
1. **Memory** tab
2. **Take heap snapshot**
3. Guarda uso memoria popup

## 📤 Capitolo 10: Distribuzione (Chrome Web Store)

### Preparazione

```bash
# Crea zip
zip -r agile-task-automator.zip agile-task-automator/

# Verifica zip
unzip -l agile-task-automator.zip | head -20
```

### Deploy

1. Vai a [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
2. **New Item**
3. Carica il .zip
4. Compila:
   - Nome
   - Descrizione (in italiano)
   - Icone (dalle cartella `images/`)
   - Screenshot (1280x800)
5. **Pubblica**

---

## ✅ Checklist Finale

- [ ] VS Code project aperto
- [ ] File verificati (manifest, js, html)
- [ ] Estensione caricata in `chrome://extensions/`
- [ ] Modalità Sviluppatore attiva
- [ ] Test demo funzionante
- [ ] Test Trello funzionante
- [ ] Console mostrata senza errori
- [ ] Popup popup mostra documentazione
- [ ] Markdown/HTML conversion funziona
- [ ] Repository .git inizializzato

---

## 🎓 Conclusione

Congratulazioni! Hai caricato con successo **Agile Task Automator** in Chrome.

### Prossimi Passi:
1. **Estendi le funzionalità** (Slack integration, export, ecc.)
2. **Aggiungi test unitari** con Jest
3. **Ottimizza performance** 
4. **Prepara per Web Store** (icone, screenshot, descrizione)

---

### 📞 Troubleshooting Finale

Se qualcosa non funziona:

1. Controlla i log: **F12** → **Console**
2. Ricarica l'estensione: `chrome://extensions/` → **Aggiorna**
3. Ricarica la pagina: **Cmd+R**
4. Cancella cache: **Cmd+Shift+Delete**
5. Se nulla funziona, reinstalla l'estensione da zero

---

**Creato da**: Senior Full-Stack Developer - Enterprise Solutions  
**Data**: Marzo 2026  
**Versione Documento**: 1.0
