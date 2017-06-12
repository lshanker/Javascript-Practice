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

  renderDinoList(){
    this.dinos.forEach((entry)=>{
      this.renderDino(entry);
    })
  },

  moveDino(ev){
    var li = ev.target.parentElement;
    var curID = Number(li.getAttribute("name"));


    //Move the dino in the array
    if(ev.target.innerHTML === "Move Up"){
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
    var span = ev.target.parentElement.querySelector("span");
    span.classList.toggle("favorite");
  },

  renderDino(dino){
    var li = document.createElement("li");
    var nameSpan = document.createElement("span");
    nameSpan.innerHTML = dino.name;
    li.setAttribute("name", dino.id);

    var del = document.createElement("button");
    del.style.backgroundColor = "red";
    del.style.color = "white";
    del.innerHTML = "Delete";
    del.addEventListener("click", this.removeDino.bind(this));

    var moveUp = document.createElement("button");
    moveUp.style.backgroundColor = "gold";
    moveUp.style.color = "white";
    moveUp.innerHTML = "Move Up";
    moveUp.addEventListener("click", this.moveDino.bind(this));

    var moveDown = document.createElement("button");
    moveDown.style.backgroundColor = "green";
    moveDown.style.color = "white";
    moveDown.innerHTML = "Move Down";
    moveDown.addEventListener("click", this.moveDino.bind(this));

    var fav = document.createElement("button");
    fav.style.backgroundColor = "blue";
    fav.style.color = "white";
    fav.innerHTML = "Favorite";
    fav.addEventListener("click", this.favoriteDino.bind(this));

    li.appendChild(nameSpan);
    li.appendChild(del);
    li.appendChild(moveUp);
    li.appendChild(moveDown);
    li.appendChild(fav);
    this.list.appendChild(li);

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
