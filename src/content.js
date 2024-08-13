import { chrome_actions_list } from "./features/extract/config/constant";

function extractContentFromArticle() {
  const pageText = document.getElementsByTagName("article")[0].innerText;
  const cleanedText = pageText.replace(/\s+/g, " ").trim();
  return cleanedText;
}

async function extractContentFromLinkedin() {
  const allPostWithoutSeeMore = document.querySelectorAll(
    ".feed-shared-update-v2__description-wrapper "
  );
  const allPosts = [];
  for (const post of allPostWithoutSeeMore) {
    const btn = post.querySelector(".feed-shared-inline-show-more-text button");
    if (btn) btn.click();
  }

  for (const post of allPostWithoutSeeMore) {
    allPosts.push({ post: post.innerText });
  }

  if (allPosts.length > 0) {
    return allPosts;
  }
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === chrome_actions_list.EXTRACT_CONTENT_FROM_ARTICLE) {
    const content = extractContentFromArticle();
    sendResponse({ content });
  }

  if (request.action === chrome_actions_list.EXTRACT_CONTENT_FROM_LINKEDIN) {
    const content = await extractContentFromLinkedin();
    sendResponse({ content });
  }
});
