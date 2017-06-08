const app = {
  init(selectors) {
    this.dinos = []
    this.max = 0
    this.list = document.querySelector(selectors.listSelector)
    document
      .querySelector(selectors.formSelector)
      .addEventListener('submit', this.addDino.bind(this))
  },

  addDino(ev) {
    ev.preventDefault()

    const dino = {
      id: this.max + 1,
      name: ev.target.dinoName.value,
    }

    const listItem = this.renderListItem(dino)
    this.list.appendChild(listItem)

    //Add the dino to this.dinos
    //TODO try using push and unshift
    this.dinos[this.max] = dino;

    localStorage.setItem("dinos", JSON.stringify(this.dinos));



    ++ this.max
  },

  renderListItem(dino) {
    const item = document.createElement('li')
    item.setAttribute("name", dino.id);
    item.style.color = "black";
    const span = document.createElement('span');
    span.innerHTML = dino.name;


    const favButton = document.createElement('button');
    favButton.textContent = "Favorite";
    favButton.setAttribute("class", "button primary");
    favButton.addEventListener("click", function(){
      promoteEntry(this);
    }, false);

    const delButton = document.createElement('button');
    delButton.textContent = "Delete";
    delButton.setAttribute("class", "alert button");
    delButton.addEventListener("click", function(){
      deleteEntry(this);
    }, false);

    const upButton = document.createElement('button');
    upButton.textContent = "Move Up";
    upButton.setAttribute("class", "warning button");
    upButton.addEventListener("click", function(){
      var dinos = JSON.parse(localStorage.getItem("dinos"));
      console.log("dinos in listener");
      console.log(dinos);
      moveUp(this);
    }, false);

    item.appendChild(span);
    item.appendChild(favButton);
    item.appendChild(delButton);
    item.appendChild(upButton);

    return item
  }
}


function promoteEntry(button){

  //TODO try using .closest

  var li = button.parentElement;

  if(li.style.color === "black"){
    li.style.color = "gold";
    li.style.fontWeight = 'bold';
  }else{
    li.style.color = "black";
    li.style.fontWeight = 'normal';
  }
}


function deleteEntry(button){
  console.log("in delete");

  var li = button.parentElement;
  li.parentNode.removeChild(li);

  //Remove the dino from the array
  var curID = Number(li.getAttribute('name'));

  for(var i = 0; i<app.dinos.length; i++){

    if(app.dinos[i]['id'] === curID){
      app.dinos.splice(i, 1);
    }
  }

  //Don't forget to update the counter
  --app.max;
}

function moveUp(button){
  var li = button.parentElement;
  var curID = Number(li.getAttribute('name'));

  var dinos = JSON.parse(localStorage.getItem("dinos"));
  console.log("dinos in moveUp");
  console.log(dinos);

  console.log(dinos.length);


  for(var counter = 0; counter<5; counter++){
    console.log("hi, on count: " + counter);
  }

  for(var j = 0; j<dinos.length - 1; j++){
    //Switch the two elements to move the desired dino up one
    console.log("This is j: " + j);
    if(dinos[j]['id'] === curID){
      var temp = dinos[j];
      dinos[j] = dinos[j + 1];
      dinos[j + 1] = temp;
    }
  }

  localStorage.setItem("dinos", JSON.stringify(dinos));

  namesFromStorage();
}

function namesFromStorage(){

  var dinos = JSON.parse(localStorage.getItem("dinos"));
  console.log("dinos in namesFromStorage");
  console.log(dinos);

  var ul = document.querySelector('ul');
  var children = ul.children;

  for(var i = 0; i<children.length; i++){
    children[i].getElementsByTagName("span")[0].innerHTML = dinos[i]['name'];
  }

}


app.init({
  formSelector: '#dino-form',
  listSelector: '#dino-list',
})
