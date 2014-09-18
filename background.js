var selectedId = -1;

function showCount (count) {
  var oldCount = 0;
  chrome.browserAction.getBadgeText({}, function(result) {oldCount = result});

  if(count != undefined && oldCount != count) {
    // alert("changingCount to " + count);
    chrome.browserAction.setBadgeText({"text": count});
  }
}

function getWordCount(tabId) {
  // alert("gettingCount");
  chrome.tabs.executeScript(tabId, { file: "content.js" }, function() {
      chrome.tabs.sendRequest(tabId, {}, function(results) {
      showCount(results);
    });
  });
};

chrome.tabs.onUpdated.addListener(function(tabId, props) {
  // alert("onUpdated");
  if (props.status == "complete" && tabId == selectedId)
    getWordCount(tabId);
});

chrome.tabs.onSelectionChanged.addListener(function(tabId, props) {
  // alert("onSelectionChanged");
  selectedId = tabId;
  getWordCount(tabId);
});

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  // alert("tabs.query");
  selectedId = tabs[0].id;
  getWordCount(tabId);
});

