function getBody(){ // Get the document.body from the extension 
    return {html: document.body.innerHTML}
}

chrome.tabs.executeScript({
    code: '('+getBody+')();',//argument here is a string but function.toString() returns function's code
}, (results) => {
  //  console.log(results[0].html);
   $("#html").html(results[0].html);
   runIsInDb();
});

var url;
chrome.tabs.getSelected(null, function (tab) {
    console.log(tab.url);
    url = tab.url;
   
});

chrome.webNavigation.onCompleted.addListener(function() {
   document.getElementById("SIvCob").innerHTML = "This works!!!"
    alert("google")
    console.log("goodle")
}, {url: [{urlMatches : 'https://www.google.com/'}]});

var isworking = true;