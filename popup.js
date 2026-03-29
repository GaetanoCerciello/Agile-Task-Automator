/**
 * Agile Task Automator - Popup Script
 * Gestisce l'interfaccia popup e genera documentazione Agile
 */

class AgileDocumentGenerator {
  /**
   * Genera documentazione in formato User Story + Acceptance Criteria + Note Tecniche
   */
  static generateMarkdown(taskData) {
    if (!taskData) {
      return 'Nessun dato task disponibile.';
    }

    const { source, title, description, labels = [], status = '', priority = '', dueDate = '', assignee = '' } = taskData;
    const timestamp = new Date().toLocaleDateString('it-IT');

    let markdown = `# ${title}

**Fonte:** ${source.toUpperCase()} | **Data:** ${timestamp}

---

## 📋 Descrizione
${description || '*Nessuna descrizione fornita*'}

---

## 👤 User Story

\`\`\`
Come [stakeholder/team]
Voglio [azione/funzionalità]
Affinché [beneficio/valore]
\`\`\`

---

## ✅ Acceptance Criteria

- [ ] Criterio 1: Definire gli obiettivi specifici
- [ ] Criterio 2: Verificare la completezza dei dati
- [ ] Criterio 3: Validare i moduli di input
- [ ] Criterio 4: Documentare il comportamento atteso

---

## 🛠️ Note Tecniche

### Stack Tecnologico
\`\`\`
Platform: Web Browser (Chrome Extension - Manifest V3)
Languages: JavaScript (ES6+), HTML5, CSS3
Architecture: Event-driven, Async messaging
\`\`\`

### Implementazione Suggerita
1. **Estrazione Dati**: Content Script legge i selettori DOM
2. **Elaborazione**: Service Worker processa i dati
3. **Formattazione**: Popup genera documentazione
4. **Output**: Esporta in Markdown/HTML

### Selettori DOM Identificati
- **Titolo**: \`[class*="CardTitle"], h1\`
- **Descrizione**: \`[class*="CardDescription"], main\`
- **Status**: \`[class*="status"]\`
- **Etichette**: \`${labels.length > 0 ? labels.join(', ') : 'Non disponibili'}\`

---

## 📊 Metadati

| Campo | Valore |
|-------|--------|
| **Sorgente** | ${source} |
| **Status** | ${status || 'N/A'} |
| **Priorità** | ${priority || 'N/A'} |
| **Assegnato a** | ${assignee || 'Non assegnato'} |
| **Due Date** | ${dueDate || 'N/A'} |
| **URL** | [Link Originale](${taskData.url}) |

---

## 🎯 Prossimi Passi

1. [ ] Rivedere User Story con il team
2. [ ] Definire Acceptance Criteria dettagliati
3. [ ] Stimare la complessità (Planning Poker)
4. [ ] Assegnare il task allo sprint
5. [ ] Creare PR/Merge Request correlato

---

*Generato da Agile Task Automator - ${new Date().toLocaleTimeString('it-IT')}*
`;

    return markdown;
  }

  /**
   * Converte Markdown a HTML
   */
  static markdownToHtml(markdown) {
    let html = markdown;

    // Headers
    html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.*?)_/g, '<em>$1</em>');

    // Code blocks
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

    // Inline code
    html = html.replace(/`(.*?)`/g, '<code>$1</code>');

    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');

    // Lists
    html = html.replace(/^\- (.*?)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*?<\/li>)/s, '<ul>$1</ul>');

    // Checkboxes
    html = html.replace(/\- \[ \] (.*?)$/gm, '<li><input type="checkbox"> $1</li>');
    html = html.replace(/\- \[x\] (.*?)$/gm, '<li><input type="checkbox" checked> $1</li>');

    // Line breaks
    html = html.replace(/\n\n/g, '</p><p>');
    html = html.replace(/\n/g, '<br>');

    // Horizontal rules
    html = html.replace(/^---/gm, '<hr>');

    // Tables
    html = html.replace(/^\| (.*?) \|/gm, '<tr><th>$1</th></tr>');

    // Wrap in basic HTML
    return `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Agile Task Documentation</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
      background: #f9fafb;
      color: #374151;
    }
    h1, h2, h3 { color: #667eea; margin-top: 24px; }
    code { background: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-family: 'Monaco', monospace; }
    pre { background: #1f2937; color: #e5e7eb; padding: 16px; border-radius: 8px; overflow-x: auto; }
    table { border-collapse: collapse; width: 100%; margin: 16px 0; }
    th, td { border: 1px solid #e5e7eb; padding: 12px; text-align: left; }
    th { background: #f3f4f6; }
    a { color: #667eea; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  ${html}
</body>
</html>`;
  }
}

class PopupController {
  constructor() {
    this.currentFormat = 'markdown';
    this.currentTaskData = null;
    this.init();
  }

  init() {
    this.cacheElements();
    this.attachEventListeners();
    this.loadSavedState();
  }

  cacheElements() {
    this.captureBtn = document.getElementById('captureBtn');
    this.clearBtn = document.getElementById('clearBtn');
    this.markdownBtn = document.getElementById('markdownBtn');
    this.htmlBtn = document.getElementById('htmlBtn');
    this.outputText = document.getElementById('outputText');
    this.statusEl = document.getElementById('status');
  }

  attachEventListeners() {
    this.captureBtn.addEventListener('click', () => this.captureTask());
    this.clearBtn.addEventListener('click', () => this.clearOutput());
    this.markdownBtn.addEventListener('click', () => this.switchFormat('markdown'));
    this.htmlBtn.addEventListener('click', () => this.switchFormat('html'));
  }

  /**
   * Cattura il task dalla pagina attiva
   */
  async captureTask() {
    try {
      this.showStatus('⏳ Catturando il task...', 'info');
      this.captureBtn.disabled = true;

      // Ottiene il tab attivo
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      // Invia messaggio al content script
      const response = await chrome.tabs.sendMessage(tab.id, { action: 'extractTask' });

      if (response.success && response.data) {
        this.currentTaskData = response.data;
        this.generateDocumentation();
        this.showStatus('✅ Task catturato con successo!', 'success');
        this.saveState();
      } else {
        this.showStatus('❌ Impossibile catturare il task. Assicurati di essere su Trello o Jira.', 'error');
      }
    } catch (error) {
      console.error('Capture error:', error);
      this.showStatus(
        `❌ Errore: ${error.message}.Verifica che il tab sia Trello/Jira e riprova.`,
        'error'
      );
    } finally {
      this.captureBtn.disabled = false;
    }
  }

  /**
   * Genera la documentazione nel formato selezionato
   */
  generateDocumentation() {
    if (!this.currentTaskData) {
      this.showStatus('❌ Nessun dato task disponibile.', 'error');
      return;
    }

    let output = '';

    if (this.currentFormat === 'markdown') {
      output = AgileDocumentGenerator.generateMarkdown(this.currentTaskData);
    } else if (this.currentFormat === 'html') {
      output = AgileDocumentGenerator.markdownToHtml(
        AgileDocumentGenerator.generateMarkdown(this.currentTaskData)
      );
    }

    this.outputText.value = output;
  }

  /**
   * Cambia il formato di output
   */
  switchFormat(format) {
    this.currentFormat = format;

    // Aggiorna stato dei bottoni
    this.markdownBtn.style.opacity = format === 'markdown' ? '1' : '0.6';
    this.htmlBtn.style.opacity = format === 'html' ? '1' : '0.6';

    // Rigenera la documentazione
    if (this.currentTaskData) {
      this.generateDocumentation();
    }

    // Salva lo stato
    chrome.storage.local.set({ lastFormat: format });
  }

  /**
   * Ripulisce l'output
   */
  clearOutput() {
    this.outputText.value = '';
    this.currentTaskData = null;
    chrome.storage.local.remove(['lastTaskData', 'lastOutput']);
    this.showStatus('', '');
  }

  /**
   * Mostra messaggi di stato
   */
  showStatus(message, type = 'info') {
    this.statusEl.textContent = message;
    this.statusEl.className = `status ${type} ${message ? 'show' : ''}`;
  }

  /**
   * Salva lo stato per la sessione successiva
   */
  saveState() {
    chrome.storage.local.set({
      lastTaskData: this.currentTaskData,
      lastOutput: this.outputText.value,
      lastFormat: this.currentFormat
    });
  }

  /**
   * Carica lo stato salvato
   */
  loadSavedState() {
    chrome.storage.local.get(['lastTaskData', 'lastOutput', 'lastFormat'], (result) => {
      if (result.lastTaskData) {
        this.currentTaskData = result.lastTaskData;
      }
      if (result.lastOutput) {
        this.outputText.value = result.lastOutput;
      }
      if (result.lastFormat) {
        this.currentFormat = result.lastFormat;
        this.switchFormat(result.lastFormat);
      }
    });
  }
}

// Inizializza il controller al caricamento del popup
document.addEventListener('DOMContentLoaded', () => {
  new PopupController();
});
