document.addEventListener('DOMContentLoaded', function () {
  var checkPageButton = document.getElementById('upload-resume')
  checkPageButton.addEventListener('click', function () {

  })
}, false)

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
