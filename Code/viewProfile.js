/*  global chrome */
/*  global location */
window.onload = function () {
  // var profileName = localStorage.getItem('selectedProfile');
  var profileName
  chrome.storage.sync.get('selectedProfile', function (data) {
    profileName = data.selectedProfile
  })
  console.log(profileName)
  chrome.storage.sync.get(profileName, function (result) {
    console.log(result[profileName][0])
    var outputJson = result[profileName][0]
    for (var i in outputJson) {
      document.getElementById(i).value = outputJson[i]
      document.getElementById(i).readOnly = true
    }
  })

  var back = document.getElementById('back')
  if (back) {
    back.addEventListener('click', function () {
      location.href = 'popup.html'
    })
  }
}
