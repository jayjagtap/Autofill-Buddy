window.onload = function(){
    chrome.storage.sync.get('Data', function(result) {
        console.log(result);
    })
}