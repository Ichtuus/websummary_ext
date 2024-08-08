// src/content.js

function extractContent() {
  const pageText = document.body.innerText;
  const cleanedText = pageText.replace(/\s+/g, " ").trim();
  return cleanedText;
}

function observeDOMChanges() {
  const observer = new MutationObserver(() => {
    // Lancer l'extraction du contenu après le changement du DOM
    const content = extractContent();
    console.log("Contenu mis à jour:", content);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

// // Activer l'observation des changements de DOM
observeDOMChanges();

// // Répondre aux messages pour extraire le contenu à la demande
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "extractContent") {
    const content = extractContent();
    sendResponse({ content });
  }
});

// function getBodyContent() {
//   return document.body.outerHTML;
// }

// function extractSpecificContent() {
//   // Exemple de ciblage de paragraphe et d'en-têtes
//   const elements = document.querySelectorAll("p, h1, h2, h3");
//   let content = "";

//   elements.forEach((element) => {
//     content += element.outerHTML + " ";
//   });

//   const cleanedText = content.replace(/\s+/g, " ").trim();
//   return cleanedText;
// }

// selection text selector
// function getSelectedText() {
//   const selection = window.getSelection();
//   return selection ? selection.toString().trim() : "";
// }

// document.addEventListener("mouseup", () => {
//   const selectedText = getSelectedText();

//   if (selectedText) {
//     // Envoyer le texte sélectionné au service worker
//     chrome.runtime.sendMessage({ action: "textSelected", text: selectedText });
//   }
// });




