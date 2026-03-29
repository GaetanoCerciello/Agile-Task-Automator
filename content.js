/**
 * Agile Task Automator - Content Script
 * Estrae i dettagli dei task da Trello e Jira
 */

class TaskExtractor {
  /**
   * Estrae dati da una card Trello
   */
  static extractTrelloTask() {
    try {
      // Selettori Trello (aggiornati per versione moderna)
      const titleSelector = '[class*="CardTitle"] h2, [class*="card-title"]';
      const descriptionSelector = '[class*="CardDescription"], [class*="card-description"]';
      const labelSelector = '[class*="Label"]';
      const dueDateSelector = '[class*="DueDate"]';

      const title = document.querySelector(titleSelector)?.textContent?.trim() || '';
      const description = document.querySelector(descriptionSelector)?.textContent?.trim() || '';
      const labels = Array.from(document.querySelectorAll(labelSelector))
        .map(el => el.textContent.trim())
        .filter(text => text.length > 0);
      const dueDate = document.querySelector(dueDateSelector)?.textContent?.trim() || '';

      // Se stiamo sulla pagina card Trello completa
      const cardTitle = document.querySelector('[aria-label*="Card"]')?.textContent || title;
      const cardContent = document.querySelector('[class*="window-module"]')?.textContent || description;

      return {
        source: 'trello',
        title: cardTitle || title || 'Untitled Card',
        description: cardContent || description || 'No description provided',
        labels: labels,
        dueDate: dueDate,
        url: window.location.href,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error extracting Trello task:', error);
      return null;
    }
  }

  /**
   * Estrae dati da una task Jira
   */
  static extractJiraTask() {
    try {
      // Selettori Jira moderni
      const titleSelector = '[class*="jira"] h1, [data-testid*="issue.views.issue-base.foundation.summary"]';
      const descriptionSelector = '[class*="description-view"], [data-testid*="issue.views.issue-base.foundation.summary.description"]';
      const statusSelector = '[class*="status"]';
      const assigneeSelector = '[class*="assignee"]';
      const prioritySelector = '[class*="priority"]';
      const labelsSelector = '[class*="labels"] span';

      const title = document.querySelector('h1')?.textContent?.trim() || '';
      const issueKey = document.querySelector('[class*="key"]')?.textContent?.trim() || '';
      const description = document.querySelector(descriptionSelector)?.textContent?.trim() || '';
      const status = document.querySelector(statusSelector)?.textContent?.trim() || 'To Do';
      const assignee = document.querySelector(assigneeSelector)?.textContent?.trim() || '';
      const priority = document.querySelector(prioritySelector)?.textContent?.trim() || '';
      const labels = Array.from(document.querySelectorAll(labelsSelector))
        .map(el => el.textContent.trim())
        .filter(text => text.length > 0);

      return {
        source: 'jira',
        issueKey: issueKey,
        title: title || 'Untitled Issue',
        description: description || 'No description provided',
        status: status,
        assignee: assignee,
        priority: priority,
        labels: labels,
        url: window.location.href,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error extracting Jira task:', error);
      return null;
    }
  }

  /**
   * Riconosce e estrae il task appropriato
   */
  static extractTask() {
    const url = window.location.href;

    if (url.includes('trello.com')) {
      return this.extractTrelloTask();
    } else if (url.includes('atlassian.net') || url.includes('jira')) {
      return this.extractJiraTask();
    } else {
      // Fallback: prova a estrarre dati generici
      return this.extractGenericTask();
    }
  }

  /**
   * Estrae dati generici da una pagina web
   */
  static extractGenericTask() {
    try {
      const title = document.title || 'Untitled Task';
      const h1 = document.querySelector('h1')?.textContent?.trim() || '';
      const description = document.querySelector('main')?.textContent?.substring(0, 500) || '';

      return {
        source: 'generic',
        title: h1 || title,
        description: description || 'No description available',
        url: window.location.href,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error extracting generic task:', error);
      return null;
    }
  }
}

// Ascolta i messaggi dal popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'extractTask') {
    const taskData = TaskExtractor.extractTask();
    sendResponse({ success: true, data: taskData });
  }
});

// Iniettore payload al caricamento della pagina
function injectPageContext() {
  const script = document.createElement('script');
  script.textContent = `
    window.__taskExtractorReady = true;
    console.log('Task Extractor ready on:', window.location.hostname);
  `;
  (document.head || document.documentElement).appendChild(script);
  script.remove();
}

// Inizializza al caricamento
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectPageContext);
} else {
  injectPageContext();
}
