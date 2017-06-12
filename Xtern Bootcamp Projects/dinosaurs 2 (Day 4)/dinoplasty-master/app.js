//Put everything in here for security
const app = {
  init(selectors){
    this.dinos = this.loadDinos();
    this.list = document.querySelector(selectors.listSelector);
    this.IDCounter = this.loadID();
    document
        .querySelector(selectors.formSelector)
        .addEventListener('submit', this.addDino.bind(this));

    this.renderDinoList();
  },


  addDino(ev){
    ev.preventDefault();

    const form = ev.target;

    const dino = {
      name: form.dinoName.value,
      food: form.dinoFood.value,
      id: this.setID()
    }

    this.dinos.push(dino);

    this.saveDinos();

    //We only need to render the dino we just added
    this.renderDino(dino);

  },

  removeDino(ev){
    var li = ev.target.parentElement;
    var curID = li.getAttribute("name");

    //Remove this dino from the dinos array
    for(var i = 0; i<this.dinos.length; i++){
      if(this.dinos[i].id === Number(curID)){
        this.dinos.splice(i, 1);
      }
    }

    //Don't forget to save the array
    this.saveDinos();

    //Now actually remove the DOM element for the dino
    li.parentNode.removeChild(li);
  },

  editDino(ev){
    var li = ev.target.parentElement;
    var curID = Number(li.getAttribute("name"));

    newName = prompt("Enter the dino's new name:");
    if(!newName){
      newName = li.querySelector("h3").innerHTML;
    }

    for(var i = 0; i<this.dinos.length; i++){
      console.log("cur: " + curID);
      console.log("checking: " + this.dinos[i].id);
      if(this.dinos[i].id === curID){
        this.dinos[i].name = newName;
      }
    }

    console.log(this.dinos);
    this.saveDinos();

    li.querySelector("h3").innerHTML = newName;

  },

  renderDino(dino){
    var li = document.createElement("li");
    li.setAttribute("name", dino.id);
    var nameSpan = document.createElement("h3");
    nameSpan.innerHTML = dino.name;
    var foodSpan = document.createElement("p");
    foodSpan.innerHTML = "Favorite food: " + dino.food;

    var del = document.createElement("button");
    //del.style.backgroundColor = "red";
    del.style.color = "white";
    del.innerHTML = "<i class = 'fa fa-trash'></i> Delete";
    del.classList.add("delete");
    del.addEventListener("click", this.removeDino.bind(this));

    var moveUp = document.createElement("button");
    //moveUp.style.backgroundColor = "gold";
    moveUp.style.color = "white";
    moveUp.innerHTML = "<i class = 'fa fa-arrow-circle-down fa-flip-vertical'></i> Move Up";
    moveUp.classList.add("moveUp");
    moveUp.addEventListener("click", this.moveDino.bind(this));

    var moveDown = document.createElement("button");
    //moveDown.style.backgroundColor = "green";
    moveDown.style.color = "white";
    moveDown.innerHTML = "<i class = 'fa fa-arrow-circle-down '></i> Move Down";
    moveDown.classList.add("moveDown");
    moveDown.addEventListener("click", this.moveDino.bind(this));

    var fav = document.createElement("button");
    //fav.style.backgroundColor = "blue";
    fav.style.color = "white";
    fav.innerHTML = "<i class = 'fa fa-star'></i>Favorite";
    fav.classList.add("fav");
    fav.addEventListener("click", this.favoriteDino.bind(this));

    var edit = document.createElement("button");
    edit.style.color = "white";
    edit.innerHTML = "<i class = 'fa fa-pencil-square-o'></i>Edit Name";
    edit.classList.add("edit");
    edit.setAttribute("float", "right");
    edit.addEventListener("click", this.editDino.bind(this));

    li.appendChild(nameSpan);
    li.appendChild(foodSpan);
    li.appendChild(del);
    li.appendChild(moveUp);
    li.appendChild(moveDown);
    li.appendChild(fav);
    li.appendChild(edit);
    this.list.appendChild(li);
  },

  renderDinoList(){
    this.dinos.forEach((entry)=>{
      this.renderDino(entry);
    })
  },

  moveDino(ev){
    var li = ev.target.parentElement;
    var curID = Number(li.getAttribute("name"));


    //Move the dino in the array
    if(ev.target.classList.contains("moveUp")){
      for(var i = 1; i<this.dinos.length; i++){
        if(this.dinos[i].id === curID){
          var temp = this.dinos[i-1];
          this.dinos[i-1] = this.dinos[i];
          this.dinos[i] = temp;
        }
      }
    }else{
      for(var i = 0; i<this.dinos.length-1; i++){
        if(this.dinos[i].id === curID){
          var temp = this.dinos[i+1];
          this.dinos[i+1] = this.dinos[i];
          this.dinos[i] = temp;
          break;
        }
      }
    }

    //Save order change
    this.saveDinos();

    //Remove all of the dinos from the list, then put them back in the new order
    while(this.list.firstChild){
      this.list.removeChild(this.list.firstChild);
    }

    this.renderDinoList();
  },


  favoriteDino(ev){
    var li = ev.target.parentElement;
    li.classList.toggle("favorite");
  },


  loadDinos(){
    return JSON.parse(localStorage.getItem("dinos"));
  },

  saveDinos(){
    localStorage.setItem("dinos", JSON.stringify(this.dinos));
  },


  setID(){
     ++this.IDCounter;
     this.saveID();
     return this.IDCounter;
  },

  saveID(){
    localStorage.setItem("IDCounter", this.IDCounter);
  },

  loadID(){
    return Number(localStorage.getItem("IDCounter"));
  }


}


//Starts the app object
app.init(
  //Passing the init method an object
  {
  formSelector: '#dino-form',
  listSelector: '#dino-list',
}
)
