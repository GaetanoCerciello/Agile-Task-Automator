/**
 * ============================================================================
 * AGILE TASK AUTOMATOR - CONTENT SCRIPT
 * ============================================================================
 * 
 * DESCRIZIONE:
 * Content script eseguito su trello.com e atlassian.net per estrarre dati
 * dal DOM. Comunica con il popup tramite chrome.runtime.sendMessage.
 * 
 * CONFORMITÀ:
 * - Manifest V3 compliant
 * - NO script injection (DOM parsing only)
 * - NO chrome.scripting API usage (Purple Potassium safe)
 * 
 * RESPONSABILITÀ:
 * 1. Parsing del DOM della pagina attiva
 * 2. Estrazione di titolo, descrizione, etichette
 * 3. Invio dei dati al popup tramite messaging
 * 
 * NOTA DI SICUREZZA:
 * Questo script accede solo al DOM pubblico della pagina.
 * Non esegue script arbitrari né accede a dati sensibili dell'utente.
 * ============================================================================
 */

class TaskExtractor {
  /**
   * Estrae i dati della card attiva da Trello.
   * 
   * SELETTORI SUPPORTATI:
   * - Card title: [class*="CardTitle"], h2, [data-testid*="title"]
   * - Description: [class*="CardDescription"], main div
   * - Labels: [class*="Label"], [class*="badge"]
   * - Due date: [class*="DueDate"], [class*="due"]
   * 
   * @returns {Object} Oggetto con { source, title, description, labels, dueDate, url, timestamp }
   */
  static extractTrelloTask() {
    try {
      // Query selectors per elementi Trello (versione moderna)
      const titleSelector = '[class*="CardTitle"] h2, [data-testid*="title"] h2, .card-title, h2';
      const descriptionSelector = '[class*="CardDescription"], [class*="card-description"], [role="main"] article, .description';
      const labelSelector = '[class*="Label"] span, [class*="badge"], .card-label, .label';
      const dueDateSelector = '[class*="DueDate"], [class*="due-date"], [data-testid*="due"]';

      const titleEl = document.querySelector(titleSelector);
      const descriptionEls = document.querySelectorAll(descriptionSelector);
      const labelEls = document.querySelectorAll(labelSelector);
      const dueDateEl = document.querySelector(dueDateSelector);

      const title = titleEl?.textContent?.trim() || '';
      const description = Array.from(descriptionEls)
        .map(el => el.textContent.trim())
        .filter(text => text.length > 0)
        .join('\n\n') || '';
      const labels = Array.from(labelEls)
        .map(el => el.textContent.trim())
        .filter(text => text.length > 0 && text.length < 100);
      const dueDate = dueDateEl?.textContent?.trim() || '';

      return {
        source: 'trello',
        title: title || 'Untitled Card',
        description: description || 'No description provided',
        labels: labels.slice(0, 10), // Limit to 10 labels
        dueDate: dueDate,
        url: window.location.href,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('TaskExtractor: Error extracting Trello task:', error);
      return null;
    }
  }

  /**
   * Estrae i dati dell'issue attiva da Jira.
   * 
   * SELETTORI SUPPORTATI:
   * - Issue title: h1, [data-testid*="issue.views.issue-base.foundation.summary.title"]
   * - Description: [class*="description"], [class*="description-view"]
   * - Status: [class*="status"], [data-testid*="status"]
   * - Assignee: [class*="assignee"], [data-testid*="assignee"]
   * - Priority: [class*="priority"], [data-testid*="priority"]
   * - Labels: [class*="labels"] span, [class*="label"]
   * 
   * @returns {Object} Oggetto con { source, issueKey, title, description, status, ... }
   */
  static extractJiraTask() {
    try {
      // Query selectors per elementi Jira moderni
      const issueKeySelector = 'h1 span, [data-testid*="issue.views.issue-base.foundation.summary.summary-key"]';
      const titleSelector = 'h1, [data-testid*="issue.views.issue-base.foundation.summary.title"]';
      const descriptionSelector = '[class*="description-view"], [class*="description"], [data-testid*="issue.views.issue-base.foundation.summary.description"]';
      const statusSelector = '[class*="status"], [data-testid*="issue.views.issue-base.foundation.summary.summary-status"]';
      const assigneeSelector = '[class*="assignee"], [data-testid*="issue.views.issue-base.foundation.summary.summary-assignee"]';
      const prioritySelector = '[class*="priority"], [data-testid*="issue.views.issue-base.foundation.summary.summary-priority"]';
      const labelSelector = '[class*="labels"] span, [class*="label-row"] span';

      const titleEl = document.querySelector(titleSelector);
      const issueKeyEl = document.querySelector(issueKeySelector);
      const descriptionEl = document.querySelector(descriptionSelector);
      const statusEl = document.querySelector(statusSelector);
      const assigneeEl = document.querySelector(assigneeSelector);
      const priorityEl = document.querySelector(prioritySelector);
      const labelEls = document.querySelectorAll(labelSelector);

      const title = titleEl?.textContent?.trim() || '';
      const issueKey = issueKeyEl?.textContent?.trim() || '';
      const description = descriptionEl?.textContent?.trim() || '';
      const status = statusEl?.textContent?.trim() || 'To Do';
      const assignee = assigneeEl?.textContent?.trim() || '';
      const priority = priorityEl?.textContent?.trim() || '';
      const labels = Array.from(labelEls)
        .map(el => el.textContent.trim())
        .filter(text => text.length > 0 && text.length < 100);

      return {
        source: 'jira',
        issueKey: issueKey,
        title: title || 'Untitled Issue',
        description: description || 'No description provided',
        status: status,
        assignee: assignee,
        priority: priority,
        labels: labels.slice(0, 10), // Limit to 10 labels
        url: window.location.href,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('TaskExtractor: Error extracting Jira task:', error);
      return null;
    }
  }

  /**
   * Estrae dati generici da una pagina web.
   * Fallback quando non è Trello o Jira.
   * 
   * @returns {Object} Oggetto con { source, title, description, url, timestamp }
   */
  static extractGenericTask() {
    try {
      const title = document.title || 'Untitled Task';
      const h1 = document.querySelector('h1')?.textContent?.trim() || '';
      const mainContent = document.querySelector('main');
      const description = mainContent?.textContent?.substring(0, 500).trim() || 'No description available';

      return {
        source: 'generic',
        title: h1 || title,
        description: description,
        url: window.location.href,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('TaskExtractor: Error extracting generic task:', error);
      return null;
    }
  }

  /**
   * Riconosce il dominio e chiama il metodo di estrazione appropriato.
   * 
   * DOMINIO SUPPORTATI:
   * - trello.com → extractTrelloTask()
   * - *.atlassian.net → extractJiraTask()
   * - altri → extractGenericTask()
   * 
   * @returns {Object|null} Dati estratti o null se errore
   */
  static extractTask() {
    const url = window.location.href;
    const isDemoPage = document.title.includes('Demo - Agile Task Automator');

    if (url.includes('trello.com') || isDemoPage) {
      console.log('TaskExtractor: Detected Trello / Demo domain, extracting task...');
      return this.extractTrelloTask();
    } else if (url.includes('atlassian.net') || url.includes('jira')) {
      console.log('TaskExtractor: Detected Jira domain, extracting task...');
      return this.extractJiraTask();
    } else {
      console.log('TaskExtractor: Detected generic domain, extracting generic task...');
      return this.extractGenericTask();
    }
  }
}

/**
 * ============================================================================
 * MESSAGE LISTENER
 * ============================================================================
 * 
 * Ascolta i messaggi dal popup script tramite chrome.runtime.onMessage.
 * Quando riceve una richiesta 'extractTask', chiama il TaskExtractor
 * e restituisce i dati estratti.
 * 
 * MESSAGGIO ATTESO:
 * { action: 'extractTask' }
 * 
 * RISPOSTA INVIATA:
 * { success: true, data: { source, title, description, ... } }
 * { success: false, error: "Motivo dell'errore" }
 * ============================================================================
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    if (request.action === 'extractTask') {
      console.log('Content Script: Received extractTask request');
      const taskData = TaskExtractor.extractTask();
      
      if (taskData) {
        console.log('Content Script: Task extracted successfully', taskData);
        sendResponse({ success: true, data: taskData });
      } else {
        console.warn('Content Script: No task data extracted');
        sendResponse({ 
          success: false, 
          error: 'Unable to extract task data from this page.' 
        });
      }
    } else {
      console.warn('Content Script: Unknown action:', request.action);
      sendResponse({ 
        success: false, 
        error: `Unknown action: ${request.action}` 
      });
    }
  } catch (error) {
    console.error('Content Script: Error processing message:', error);
    sendResponse({ 
      success: false, 
      error: error.message 
    });
  }
});

/**
 * ============================================================================
 * PAGE INITIALIZATION
 * ============================================================================
 * 
 * Marker di inizializzazione per verificare che il content script
 * sia caricato e pronto sulla pagina.
 */
function initializeContentScript() {
  try {
    // Marker globale per indicare che il content script è attivo
    window.__agileTaskAutomatorReady = true;
    console.log('✓ Agile Task Automator Content Script initialized on:', window.location.hostname);
  } catch (error) {
    console.error('Content Script: Initialization error:', error);
  }
}

// Esegui l'inizializzazione quando il DOM è pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeContentScript);
} else {
  // DOM già caricato
  initializeContentScript();
}

