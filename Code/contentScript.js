/*  global chrome */
/*  global location */
/*  global types:writable */
/*  global lengths:writable */
document.addEventListener('DOMContentLoaded', function () {
  var save = document.getElementById('submit_data')
  save.addEventListener('click', function () {
    tryStoreValue()
  })
  // var variables = document.getElementById("variables");
  // variables.addEventListener('click', () => chrome.tabs.create({ url: "variables.html" }))

  // var find = document.getElementById("find");
  // find.addEventListener("click", () => {
  //     tryGetValue()
  // })
})

function tryStoreValue () {
  // read values and stor in chrome APIs
  // Right now only for workex 1

  var key = document.getElementById('tag_name').value
  var value = document.getElementById('workex_desc').value
  if (key.trim() && value.trim()) {
    chrome.storage.sync.set({ key: value }, function () {
      window.alert('Following data is successfully stored: \n tag: ' + key.trim() + '\n workex: ' + value.trim())
      clearOrWarning(true)
    })
    var temp = {}
    temp[key] = value
    chrome.storage.sync.get('variables', function (data) {
      if (data.variables !== undefined) {
        data.variables.push(temp)
        chrome.storage.sync.set({ variables: data.variables }, function () {
          console.log('success list of variables')
        })
      } else {
        var variableJson = {}
        variableJson.variables = []
        variableJson.variables.push(temp)
        chrome.storage.sync.set({ variables: variableJson.variables }, function () {
          console.log('Sucess new list of variables')
        })
      }
    })
    location.href = 'popup.html'
  } else {
    clearOrWarning(false)
  }
}

function addListenerToType (type) {
  var elements = document.querySelectorAll(type)
  var x
  var element
  for (x = 0; x < elements.length; x++) {
    element = elements[x]
    try {
      element.addEventListener('keydown', function (event) {
        event.stopImmediatePropagation()
        tryModifyInput(this, event)
      })
    } catch {
    }
  }
}

function addListenersToTypes (types) {
  types.forEach(type => addListenerToType(type))
}

function tryModifyInput (element, event) {
  if (event.key === '.') {
    tryParse(element)
  }
}

async function tryParse (element) {
  var i = 0
  var handled
  while (i < element.value.length) {
    if (element.value[i] === '<') {
      var j
      j = i + 1
      while (j < element.value.length && element.value[j] !== '>') { j += 1 }
      if (j !== element.value.length) {
        handled = await tryReplace(element, i, j)
      }
    }
    i += 1
  }
  // window.alert("inside tryParse, dot detected")
  if (handled && element.value[element.value.length - 1] === '.') {
    // window.alert("inside tryParse, dot detected:  " + element.value.substring(0, element.value.length-1) )
    element.value = element.value.substring(0, element.value.length - 1)
  }
}

function getValue (key) {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['key'], function (result) {
      resolve(result.key)
    })
  }, 2000)
}

async function tryReplace (element, starting, ending) {
  var variableName = element.value.substring(starting + 1, ending)
  var alreadyReplaced = false
  var value = await getValue(variableName)

  // var key_value = Object.entries(value)
  if (value !== undefined && !alreadyReplaced) {
    alreadyReplaced = true
    element.value = value
    return true
  }
  return false
}

function onInterval () {
  var newLengths = types.map(type => document.querySelectorAll(type).length)
  var x
  for (x = 0; x < newLengths.length; x++) {
    if (newLengths[x] !== lengths[x]) {
      lengths[x] = newLengths[x]
      addListenerToType(types[x])
    }
  }
}

function clearOrWarning (flag) {
  // Clear fields in popup.html
  if (flag) {
    document.getElementById('workex_desc').value = ''
    document.getElementById('tag_name').value = ''
  } else {
    window.alert('tag or workex cannot be empty')
    document.getElementById('workex_desc').value = ''
    document.getElementById('tag_name').value = ''
  }
}

function fillVariablesDiv () {
  var variableDiv = document.getElementById('variableTable')
  chrome.storage.sync.get('variables', function (data) {
    for (var i = 0; i < data.variables.length; i++) {
      var row = document.createElement('tr')
      var col1 = document.createElement('td')
      var col2 = document.createElement('td')
      for (var j in data.variables[i]) {
        var text1 = document.createTextNode(j)
        var text2 = document.createTextNode(data.variables[i][j])
      }
      col1.appendChild(text1)
      row.appendChild(col1)
      col2.appendChild(text2)
      row.appendChild(col2)
      variableDiv.appendChild(row)
    }
  })
}

function fillProfileDiv () {
  var profileDiv = document.getElementById('profileDiv')
  chrome.storage.sync.get('allprofiles', function (data) {
    for (var i = 0; i < data.allprofiles.length; i++) {
      var buttonRow = document.createElement('button')
      buttonRow.className = 'profile-item'
      buttonRow.id = data.allprofiles[i]
      buttonRow.value = data.allprofiles[i]
      buttonRow.innerText = data.allprofiles[i]
      profileDiv.appendChild(buttonRow)
    }
  })
}

function addListenerToProfile () {
  chrome.storage.sync.get('allprofiles', function (data) {
    for (var i = 0; i < data.allprofiles.length; i++) {
      console.log(data.allprofiles[i])
      // var profile = document.getElementById(data.allprofiles[i])
      // var profileName = data.allprofiles[i]
      document.getElementById(data.allprofiles[i]).addEventListener('click', function () {
        console.log('amit', this.id)
        var tempJson = []
        tempJson.push(this.id)
        console.log(tempJson)

        chrome.storage.sync.set({ selectedProfile: tempJson }, function () {
          location.href = 'viewProfile.html'
        })
      })
    }
  })
}

window.onload = function () {
  types = ['input', 'textarea']
  lengths = types.map(type => document.querySelectorAll(type).length)
  addListenersToTypes(types)
  setInterval(onInterval, 7000)
  // Handle new profile redirect
  var newProfileButton = document.getElementById('newProfile')
  if (newProfileButton) {
    newProfileButton.addEventListener('click', createNewProfile)
  }
  function createNewProfile () {
    location.href = 'newProfile.html'
  }
  fillProfileDiv()
  fillVariablesDiv()
  addListenerToProfile()
}
