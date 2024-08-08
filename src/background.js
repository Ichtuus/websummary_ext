// src/background.js

// USE FOR ALL TEXT IN PAGE
// chrome.webRequest.onHeadersReceived.addListener(
//   (details) => {
//     const headers = details.responseHeaders.map((header) => {
//       if (header.name.toLowerCase() === "content-security-policy") {
//         // Modifiez ici l'en-tête CSP pour permettre l'exécution de scripts de votre extension
//         header.value = header.value.replace(
//           "script-src",
//           "script-src 'unsafe-eval' 'unsafe-inline' *"
//         );
//       }
//       return header;
//     });

//     return { responseHeaders: headers };
//   },
//   { urls: ["<all_urls>"] },
//   ["blocking", "responseHeaders"]
// );

// USE FOR SELECT TEXT BY USER
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === "textSelected") {
//     const selectedText = request.text;
//     console.log("Texte sélectionné :", selectedText);

//     // Ici, vous pouvez traiter le texte sélectionné
//     // Par exemple, envoyer à une API ou afficher une notification

//     // Exemple : Créer un élément de menu contextuel
//     chrome.contextMenus.create({
//       id: "processSelectedText",
//       title: "Process Selected Text",
//       contexts: ["selection"],
//       onclick: () => {
//         alert(`Texte sélectionné : ${selectedText}`);
//       },
//     });

//     // Envoyer une réponse à la page
//     sendResponse({ success: true });
//   }
// });

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed!");
});
