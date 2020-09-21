window.onload = function(){
    chrome.storage.sync.get('Data', function(result) {
        console.log(result);
    });

    var back = document.getElementById('back');
    if(back){
        back.addEventListener('click', function(){
            location.href='popup.html';
        });
    }
}