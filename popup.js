document.getElementById('optimizeUiBtn').addEventListener('click', () => {
  sendMessageToActiveTab({ action: "toggle_optimize_ui" });
  window.close();
});

document.getElementById('resetUiBtn').addEventListener('click', () => {
  sendMessageToActiveTab({ action: "reset_optimize_ui" });
  window.close();
});

function sendMessageToActiveTab(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, message);
    }
  });
}
