import { chrome_actions_list } from "./features/config/constant";

function extractContentFromArticle() {
  const pageText = document.getElementsByTagName("article")[0].innerText;
  const cleanedText = pageText.replace(/\s+/g, " ").trim();
  return cleanedText;
}

function extractContentFromLinkedin() {
  return "from linkedin";
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === chrome_actions_list.EXTRACT_CONTENT_FROM_ARTICLE) {
    const content = extractContentFromArticle();
    sendResponse({ content });
  }

  if (request.action === chrome_actions_list.EXTRACT_CONTENT_FROM_LINKEDIN) {
    const content = extractContentFromLinkedin();
    sendResponse({ content });
  }
});
