/**
 * Agile Task Automator - Popup script
 * Script JS per gestire l'estrazione e formattazione markdown
 */

document.addEventListener("DOMContentLoaded", () => {
  const rawInput = document.getElementById("rawInput");
  const markdownOutput = document.getElementById("markdownOutput");
  const generateBtn = document.getElementById("generateBtn");
  const copyBtn = document.getElementById("copyBtn");
  const successLabel = document.getElementById("successLabel");

  // Ascolta il click sul tasto di generazione
  generateBtn.addEventListener("click", () => {
    const text = rawInput.value.trim();
    if (!text) {
      alert("Per favore, incolla prima il testo grezzo copiato da Jira/Trello.");
      return;
    }

    // Elaborazione intelligente: Dividiamo il testo ed estraiamo info
    const lines = text.split("\n")
      .map(l => l.trim())
      .filter(l => l.length > 0);
    
    const title = lines.length > 0 ? lines[0] : "Task Senza Titolo";
    const rest = lines.slice(1);

    // Valori default Heuristici
    let soThat = "Migliorare l'esperienza dell'utente e le prestazioni";
    let asA = "Utente del sistema";
    let iWant = title;

    let criteria = [];
    let technicalNotes = [];

    // Parsing Smart Loop su tutte le righe successive
    rest.forEach(line => {
      const lower = line.toLowerCase();
      
      // Estrapolazione obiettivo (So That) in base a keyword comuni in italiano
      if (lower.includes("serve per ")) {
        soThat = line.substring(lower.indexOf("serve per ") + 10).replace(/[\.:]$/, '');
      } else if (lower.includes(" in modo da ")) {
        soThat = line.substring(lower.indexOf(" in modo da ") + 12).replace(/[\.:]$/, '');
      } else if (lower.includes(" affinché ")) {
        soThat = line.substring(lower.indexOf(" affinché ") + 10).replace(/[\.:]$/, '');
      } else if (lower.includes(" per velocizzare ")) {
        soThat = line.substring(lower.indexOf(" per velocizzare ") + 5).replace(/[\.:]$/, '');
      }

      // Classifica come Criterio di Accettazione o Nota Tecnica
      const isActionable = /verificare|deve|ricordarsi|aggiungere|testare|creare|implementare|garantire|assicurarsi/i.test(line);
      
      if (isActionable) {
        let cleanLine = line.replace(/^-\s*/, ''); // rimuovi dash iniziali
        criteria.push(`- [ ] ${cleanLine}`);
      } else {
        technicalNotes.push(line);
      }
    });

    // Se non troviamo criteri espliciti, converte tutte le righe in checklist
    if (criteria.length === 0 && rest.length > 0) {
      criteria = rest.map(l => `- [ ] ${l.replace(/^-\s*/, '')}`);
      technicalNotes = ["Vedi lista criteri in alto."];
    }
    
    if (criteria.length === 0) criteria = ["- [ ] Definire i dettagli tecnici"];
    if (technicalNotes.length === 0) technicalNotes = ["Nessuna nota aggiuntiva."];

    // Generazione in formato "Pulito" senza troppi asterischi o placeholder statici
    const generatedMarkdown = `### 🎯 ${title}
User Story:
As a: ${asA}
I want: ${iWant}
So that: ${soThat}

✅ Acceptance Criteria:
${criteria.join("\n")}

🛠 Note Tecniche & Dati Originali:
${technicalNotes.join("\n")}`;

    // Mostra il risultato a video
    markdownOutput.value = generatedMarkdown;
    
    // Rimuove e ri-aggiunge la classe per risvegliare l'animazione di POP
    markdownOutput.classList.remove("textarea-generated");
    void markdownOutput.offsetWidth; // Forza il reflow
    markdownOutput.classList.add("textarea-generated");
    
    // Mostra l'etichetta richiesta "Documentazione Generata:"
    successLabel.classList.add("visible");
  });

  // Ascolta il click sul tasto di copia negli appunti
  copyBtn.addEventListener("click", () => {
    const textToCopy = markdownOutput.value.trim();
    
    if (!textToCopy) {
      alert("Nessun testo da copiare! Genera prima la documentazione.");
      return;
    }

    // Usiamo le classiche API per il sistema di appunti (navigator.clipboard)
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        // Feedback visivo immediato (cambia testo e applica la classe "success")
        const originalText = copyBtn.innerText;
        copyBtn.innerText = "Copiato! ✅";
        copyBtn.classList.add("success");

        // Resetta lo stato dopo 2 secondi
        setTimeout(() => {
          copyBtn.innerText = originalText;
          copyBtn.classList.remove("success");
        }, 2000);
      })
      .catch(err => {
        console.error("Errore durante la copia negli appunti:", err);
        alert("Ops, c'è stato un problema nel copiare il testo. Prova a selezionarlo manualmente.");
      });
  });
});
