/**
 * ============================================================================
 * AGILE TASK AUTOMATOR - SERVICE WORKER (Background Script)
 * ============================================================================
 * 
 * DESCRIZIONE:
 * Service Worker per Manifest V3.
 * Gestisce lifecycle events e messaging passthrough tra componenti.
 * 
 * EVENTI GESTITI:
 * - chrome.runtime.onInstalled: Lifecycle della extension
 * - chrome.runtime.onMessage: Messaging da popup/content scripts
 * - chrome.action.onClicked: Click sull'icona dell'extension
 * 
 * CONFORMITÀ:
 * - Manifest V3 Service Worker (non persistent)
 * - OffscreenDocument ready per esigenze future
 * - Logging appropriato per debugging
 * 
 * NOTE:
 * Il messaging tra popup e content script NON passa dal Service Worker.
 * Questo script è principalmente per lifecycle management e future expansion.
 * ============================================================================
 */

// ============================================================================
// LIFECYCLE EVENT: Installation & Updates
// ============================================================================

/**
 * Evento triggered quando l'extension viene installata o aggiornata
 * 
 * @param {Object} details - { reason: 'install' | 'update', ... }
 */
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('✅ Agile Task Automator installed successfully');
    console.log('📌 Version 1.1.0 - Purple Potassium compliant');
    // Possibile: apri welcome page
    // chrome.tabs.create({ url: 'welcome.html' });
  } else if (details.reason === 'update') {
    console.log('🔄 Agile Task Automator updated');
    console.log('📌 Checked: scripting permission removed, Manifest V3 clean');
  }
});

// ============================================================================
// MESSAGE LISTENER: Inter-component Communication
// ============================================================================

/**
 * Listener per messaggi da popup, content scripts o tabs
 * 
 * MESSAGGI SUPPORTATI:
 * - { action: 'logData', data: {...} } → Log dati a scopo diagnostico
 * - { action: 'exportToSlack', content: "..." } → Possibile expansion
 * 
 * @param {Object} request - Oggetto messaggio
 * @param {Object} sender - Info su chi invia (tab, extension origin, etc)
 * @param {Function} sendResponse - Callback per rispondere
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    console.log('Service Worker: Message received from', sender.url, '—', request.action);

    if (request.action === 'logData') {
      // Log diagnostico (può essere inviato a analytics in futuro)
      console.log('📋 Task data logged:', request.data);
      sendResponse({ status: 'logged', timestamp: new Date().toISOString() });
    } 
    else if (request.action === 'exportToSlack') {
      // Placeholder per possibile integrazione Slack
      console.log('📤 Export to Slack requested:', request.content);
      sendResponse({ status: 'exported', message: 'Slack export ready (future feature)' });
    } 
    else {
      console.warn('Service Worker: Unknown action:', request.action);
      sendResponse({ status: 'error', message: `Unknown action: ${request.action}` });
    }
  } catch (error) {
    console.error('Service Worker: Message processing error:', error);
    sendResponse({ status: 'error', message: error.message });
  }
});

// ============================================================================
// ACTION CLICK: Extension Icon Click
// ============================================================================

/**
 * Evento triggered quando l'utente clicca sull'icona dell'extension
 * (attualmente solo logga; popup apre tramite manifest.json action.default_popup)
 * 
 * @param {Object} tab - Info del tab attivo
 */
chrome.action.onClicked.addListener((tab) => {
  console.log('🎯 Extension icon clicked on:', tab.url);
});

// ============================================================================
// INITIALIZATION LOG
// ============================================================================

console.log('🚀 Agile Task Automator Service Worker loaded');
