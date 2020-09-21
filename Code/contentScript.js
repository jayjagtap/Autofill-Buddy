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

  function addListenerToType(type) {
    var elements = document.querySelectorAll(type)
    for (x=0;x<elements.length; x++) {
        element = elements[x]
        try {
            element.addEventListener('keydown', function(event) {
                event.stopImmediatePropagation()
                tryModifyInput(this, event)
            })
        }
        catch {
        }
      }
  }
  
  function addListenersToTypes(types) {
    types.forEach(type => addListenerToType(type))
  }
  
  function tryModifyInput(element, event){ 
    if (event.key == ".") {
        tryParse(element);         
    }
  }
  
  async function tryParse(element) {
    var i = 0
    var handled
    while (i < element.value.length) {
        if (element.value[i] == "<") {
            j = i+1
            while (j < element.value.length && element.value[j]!= ">") { j += 1 }
            if (j  != element.value.length) { 
                handled = await tryReplace(element, i, j)
            }
        }
        i += 1
    }
    //window.alert("inside tryParse, dot detected")
    if (handled && element.value[element.value.length-1] == ".") {
       // window.alert("inside tryParse, dot detected:  " + element.value.substring(0, element.value.length-1) )
        element.value = element.value.substring(0, element.value.length-1)
  
    }
  }
  
  function getValue(key) {
    return new Promise((resolve) => {
        chrome.storage.sync.get(['key'], function(result) {
            resolve(result.key)
        })
    }, 2000)
  }
  
  async function tryReplace(element, starting, ending) {
    var variableName = element.value.substring(starting+1, ending)
    alreadyReplaced = false
    var value = await getValue(variableName)
    
    //var key_value = Object.entries(value)
    if (value != undefined && !alreadyReplaced){ 
      alreadyReplaced = true
      element.value = value
      return true
    }
    return false
  }
  
function onInterval() {
    var new_lengths = types.map(type => document.querySelectorAll(type).length)
    for (x=0; x<new_lengths.length; x++) {
        if (new_lengths[x] != lengths[x]) {
            lengths[x] = new_lengths[x]
            addListenerToType(types[x])
        }
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
    types = ["input","textarea"]
    lengths = types.map(type => document.querySelectorAll(type).length)
    addListenersToTypes(types)
    setInterval(onInterval, 7000)
    // Handle new profile redirect
    var newProfileButton = document.getElementById('newProfile');
    if(newProfileButton){
    newProfileButton.addEventListener('click', createNewProfile);
    }
    function createNewProfile () {
    location.href = 'newProfile.html';
    }
}