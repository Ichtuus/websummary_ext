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
          //   if (chrome.runtime.lastError) {
          //     console.log("error runtime error");
          //     return reject(chrome.runtime.lastError);
          //   }

          if (response && response.content) {
            console.log("resp", response);
            resolve({
              response,
              isContentLoadedSuccess: true,
            });
          } else {
            console.log("no response");
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
    case recovery_mode.ARTICLE:
      console.log("current action return article");
      return chrome_actions_list.EXTRACT_CONTENT_FROM_ARTICLE;
    case recovery_mode.LINKEDIN:
      console.log("current action return linkedin");
      return chrome_actions_list.EXTRACT_CONTENT_FROM_LINKEDIN;
    default:
      break;
  }
};
