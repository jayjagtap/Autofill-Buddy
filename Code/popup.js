
document.addEventListener('DOMContentLoaded',function() {
  var save = document.getElementById("submit_data");
  save.addEventListener('click', function() {
      tryStoreValue()
  })
  // var variables = document.getElementById("variables");
  // variables.addEventListener('click', () => chrome.tabs.create({ url: "variables.html" }))

  // var find = document.getElementById("find");
  // find.addEventListener("click", () => {
  //     tryGetValue()
  // })
})

function tryStoreValue() {
  // read values and stor in chrome APIs
  // Right now only for workex 1

  var key = document.getElementById("tag_name").value
  var value = document.getElementById('workex_desc').value
  if (key.trim() && value.trim()) 
  {
    chrome.storage.sync.set({key: value}, function() {
      window.alert("Following data is successfully stored: \n tag: " + key.trim() + "\n workex: " + value.trim())
      clear_or_warning(true)
    });
  }
  else {
      clear_or_warning(false)
  }
}

function clear_or_warning(flag){

  //Clear fields in popup.html
  if (flag){
    document.getElementById("workex_desc").value=""
    document.getElementById("tag_name").value=""
  }
  else{
    window.alert("tag or workex cannot be empty")
    document.getElementById("workex_desc").value=""
    document.getElementById("tag_name").value=""
  }
}

window.onload = function () {

  // Handle new profile redirect
  var newProfileButton = document.getElementById('newProfile');
  if(newProfileButton){
    newProfileButton.addEventListener('click', createNewProfile);
  }
  function createNewProfile () {
    location.href = '/Code/newProfile.html';
  }
}