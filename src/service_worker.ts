chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: "Support our mob",
    contexts: ["editable"],
    id: "support_our_mob",
  });

  chrome.contextMenus.onClicked.addListener(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, {
          type: "show_support",
        });
      }
    });
  });
});
