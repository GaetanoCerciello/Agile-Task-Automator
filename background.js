/**
 * Agile Task Automator - Service Worker (Background Script)
 * Manifest V3 - Background Service Worker
 */

// Listener per l'installazione dell'estensione
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('✅ Agile Task Automator installato con successo!');
    // Apri la pagina di benvenuto (opzionale)
    // chrome.tabs.create({ url: 'welcome.html' });
  } else if (details.reason === 'update') {
    console.log('🔄 Agile Task Automator aggiornato!');
  }
});

// Listener per i messaggi dai content scripts o popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received:', request);

  if (request.action === 'logData') {
    console.log('Task data:', request.data);
    sendResponse({ status: 'logged' });
  }

  if (request.action === 'exportToSlack') {
    // Qui potremmo aggiungere logica per inviare a Slack
    console.log('Export to Slack:', request.content);
    sendResponse({ status: 'exported' });
  }
});

// Listener per click sulla icon dell'estensione
chrome.action.onClicked.addListener((tab) => {
  console.log('Extension icon clicked on tab:', tab.url);
});

console.log('🚀 Agile Task Automator Service Worker loaded');
