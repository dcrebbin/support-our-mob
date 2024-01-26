chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "show_support") {
    const activeElement = document.activeElement as HTMLInputElement;
    activeElement.value += "🖤💛❤️";
  }
});
