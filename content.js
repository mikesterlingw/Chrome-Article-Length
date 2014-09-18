function fuzzy(i) {
  if ( i == 0)
      return "xx";
  if ( i < 1000 )
    return i.toString();
  if ( i >= 1000 && i < 1000000)
    return (~~(i / 1000)) + "k";
  if ( i >= 1000000 && i < 1000000000)
    return (~~(i / 1000000)) + "b";
  return "big";
};


function getWordCount() {
    var wordcount = 0;
    var paragraphs = document.getElementsByTagName("p");

    alert(paragraphs[0])

    for(var i = 0; i < paragraphs.length; i++) {
      if (paragraphs[i] != null && paragraphs[i].innerText != null)
        wordcount += paragraphs[i].innerText.split(" ").length;
    }

    return wordcount;
};

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  sendResponse(fuzzy(getWordCount());
});