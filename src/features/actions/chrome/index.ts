import { chrome_actions_list, recovery_mode } from "../../config/constant";

export const createCurrentTabEventChrome = (
  extractmode: string
): Promise<{
  response: { content: string } | null;
  isContentLoadedSuccess: boolean;
}> => {
  console.log("event chrome tab", extractmode);

  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }

      const activeTab = tabs[0];
      if (!activeTab || !activeTab.id) {
        return reject(new Error("No active tab found"));
      }

      chrome.tabs.sendMessage(
        activeTab.id,
        { action: extractmode },
        (response) => {
          if (chrome.runtime.lastError) {
            return reject(chrome.runtime.lastError);
          }

          if (response && response.content) {
            resolve({
              response,
              isContentLoadedSuccess: true,
            });
          } else {
            resolve({
              response: null,
              isContentLoadedSuccess: false,
            });
          }
        }
      );
    });
  });
};

export const currentAction = (action: string) => {
  switch (action) {
    case recovery_mode.ARTICLES:
      console.log("current action return article");
      return chrome_actions_list.EXTRACT_CONTENT_FROM_ARTICLE;
    case recovery_mode.LINKEDIN:
      console.log("current action return linkedin");
      return chrome_actions_list.EXTRACT_CONTENT_FROM_LINKEDIN;
    default:
      break;
  }
};
