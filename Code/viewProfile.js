/*  global chrome */
/*  global location */
window.onload = function () {
  var profileName
  chrome.storage.sync.get('selectedProfile', function (data) {
    profileName = data.selectedProfile[0]
    getAndFillData(profileName)
  })

  var back = document.getElementById('back')
  if (back) {
    back.addEventListener('click', function () {
      location.href = 'popup.html'
    })
  }
}

function getAndFillData (profileName) {
  chrome.storage.sync.get('profiles', function (result) {
    for (var i = 0; i < result.profiles.length; i++) {
      for (var key in result.profiles[i]) {
        if (key === profileName) {
          var outputJson = result.profiles[i][profileName]
          for (var k in outputJson) {
            document.getElementById(k).value = outputJson[k]
            document.getElementById(k).readOnly = true
          }
        }
      }
    }
  })
}
