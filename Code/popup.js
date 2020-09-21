
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