const personForm = document.querySelector('form#personForm')

function renderColor(color) {
  const colorDiv = document.createElement('div')
  colorDiv.style.backgroundColor = color
  colorDiv.style.width = '100px'
  colorDiv.style.height = '50px'

  return colorDiv
}

function checkRadioButtons(){
  if(document.getElementById("male").checked){
    return "Male";
  }else{
    if(document.getElementById("female").checked){
      return "Female";
    }else{
      if(document.getElementById("other").checked){
        return "Other";
      }
    }
  }
}

function renderListItem(fieldName, value) {
  const li = document.createElement('li')
  li.innerHTML = `${fieldName}: ${value}`
  return li
}

function renderList(personData) {
  const list = document.createElement('ul');

  // Loop over ['name', 'favoriteColor', 'age']
  Object.keys(personData).map(function(fieldName) {
    const li = renderListItem(fieldName, personData[fieldName])
    list.appendChild(li)
  })

  return list
}

function handleSubmit(ev) {
  ev.preventDefault() //Stops the page from refreshing
  const f = ev.target
  const details = document.querySelector('#details')

  const person = {
    name: f.personName.value,
    favoriteColor: renderColor(f.favoriteColor.value), //
    age: f.age.value,
    gender: checkRadioButtons()
  }

  /*details.appendChild(renderList(person));*/

  document.querySelector('h1').innerHTML = "Hi, " + person.name + "!";

  const subtitle = document.createElement("h2");
  subtitle.innerHTML = `You're a ${person.age} year old ${person.gender}.`

  document.querySelector("h1").appendChild(subtitle);

  document.querySelector("h1").style.color = f.favoriteColor.value;
}

personForm.addEventListener('submit', handleSubmit)
