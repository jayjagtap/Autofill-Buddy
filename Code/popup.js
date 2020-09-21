
window.onload = function () {
  
  
  // Handle new profile redirect
  var newProfileButton = document.getElementById('newProfile');
  if(newProfileButton){
    newProfileButton.addEventListener('click', createNewProfile);
  }
  function createNewProfile () {
    location.href = '/Code/newProfile.html';
  }

  //Handle going back
  var cancelProfileButton = document.getElementById('cancelProfile');
  if(cancelProfileButton){
    cancelProfileButton.addEventListener('click', cancelProfile);
  }
  function cancelProfile(){
    location.href = '/Code/popup.html';
  }


  var addWorkExButton = document.getElementById('addWorkEx');
  if(addWorkExButton){
    addWorkExButton.addEventListener('click', addNewWorkEx);
  }
  function addNewWorkEx() {
    var WE = document.getElementById("WE");
    var divEntry = document.createElement('div');
    divEntry.className = "wex";
    divEntry.id = 'workexperience'+(WE.childElementCount+1);
    var newWE = document.getElementsByClassName("wex")[0];
    divEntry.innerHTML = newWE.innerHTML;
    WE.appendChild(divEntry);
  }


  var delWorkExButton = document.getElementById('delWex');
  if(delWorkExButton){
    delWorkExButton.addEventListener('click', removeWorkEx);
    console.log("Amit");
    var id = delWorkExButton.parentNode.id;
    console.log(id);
  }
  function removeWorkEx(){
    var id = delWorkExButton.parentNode.id;
    console.log(id);
    if(document.getElementById("WE").childElementCount>1){
        var entry = document.getElementById(id);
        entry.remove();
    }
  }

}

// Actual Code starts here. Copy above code in new file

document.addEventListener('DOMContentLoaded',function() {
  var save = document.getElementById("saveNewProfile");
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

  // var wex_form = document.querySelectorAll("workexperience1")
  // var key = wex_form.elements.namedItem("jobtitle").value
  // var value = wex_form.elements.namedItem("roledescription").value
  var key = "linkedin"
  window.alert(key)
  var value = document.getElementById('linkedin').value
  window.alert("inside")
  window.alert(value)
  if (key.trim() && value.trim()) {
      chrome.storage.sync.set({[key]: value}, () => sendOutput(true))
      window.alert("Value Saved")
  }
  else {
      sendOutput(false)
  }
}

function sendOutput(valid) {
  element = document.getElementById("linkedin")
  if (valid) {
      html = "<p>variable has been set</p>"
  }
  else {
      html = "<p class='red-font'>name or value cannot be empty</p>" 
  }

  element.innerHTML = html
}