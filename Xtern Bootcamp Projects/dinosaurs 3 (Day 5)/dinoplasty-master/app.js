//Put everything in here for security
const app = {
  init(selectors) {
    this.dinos1 = this.loadDinos('1');
    this.dinos2 = this.loadDinos('2');
    this.dinos3 = this.loadDinos('3');

    this.list1 = document.querySelector(selectors.listSelector[0]);
    this.list2 = document.querySelector(selectors.listSelector[1]);
    this.list3 = document.querySelector(selectors.listSelector[2]);

    this.IDCounter = this.loadID();
    document
      .querySelector(selectors.formSelector)
      .addEventListener('submit', this.addDino.bind(this));

    this.renderDinoList('1');
    this.renderDinoList('2');
    this.renderDinoList('3');
  },

  addDino(ev) {
    ev.preventDefault();

    const form = ev.target;

    const num = form.dinoCategory.value;

    const dino = {
      name: form.dinoName.value,
      food: form.dinoFood.value,
      category: num,
      id: this.setID()
    }

    var curList;

    switch (num) {
      case '1':
        curList = this.dinos1;
        break;
      case '2':
        curList = this.dinos2;
        break;
      case '3':
        curList = this.dinos3;
        break;
    }

    curList.push(dino);

    this.saveDinos(num);

    //We only need to render the dino we just added
    this.renderDino(dino);

  },

  removeDino(ev) {
    var li = ev.target.parentElement;
    var curID = li.getAttribute("name");

    var curList;
    var num;
    if (li.classList.contains("category1")) {
      curList = this.dinos1;
      num = '1';
    } else {
      if (li.classList.contains("category2")) {
        curList = this.dinos2;
        num = '2';
      } else {
        curList = this.dinos3;
        num = '3';
      }
    }


    //Remove this dino from the dinos array
    for (var i = 0; i < curList.length; i++) {
      if (curList[i].id === Number(curID)) {
        curList.splice(i, 1);
      }
    }

    //Don't forget to save the array
    this.saveDinos(num);

    //Now actually remove the DOM element for the dino
    li.parentNode.removeChild(li);
  },

  editDino(ev) {
    var li = ev.target.parentElement;
    var curID = Number(li.getAttribute("name"));

    newName = prompt("Enter the dino's new name:");
    if (!newName) {
      newName = li.querySelector("h3").innerHTML;
    }

    var curList;

    if (li.classList.contains("category1")) {
      curList = this.dinos1;
      num = '1';
    } else {
      if (li.classList.contains("category2")) {
        curList = this.dinos2;
        num = '2';
      } else {
        curList = this.dinos3;
        num = '3';
      }
    }
    
    for (var i = 0; i < curList.length; i++) {
      if (curList[i].id === curID) {
        curList[i].name = newName;
      }
    }


    if (li.classList.contains("category1")) {
      this.dinos1 = curList;
    } else {
      if (li.classList.contains("category2")) {
        this.dinos2 = curList;
      } else {
        this.dinos3 = curList;
      }
    }

    this.saveDinos(num);

    li.querySelector("h3").innerHTML = newName;

  },

  renderDino(dino) {
    var li = document.createElement("li");
    li.setAttribute("name", dino.id);
    li.classList.add("category" + dino.category);
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

    switch (dino.category) {
      case '1':
        this.list1.appendChild(li);
        break;
      case '2':
        this.list2.appendChild(li);
        break;
      case '3':
        this.list3.appendChild(li);
        break;
    }

  },

  renderDinoList(num) {
    var curList;

    switch (num) {
      case '1':
        curList = this.dinos1;
        break;
      case '2':
        curList = this.dinos2;
        break;
      case '3':
        curList = this.dinos3;
        break;
    }

    curList.forEach((entry) => {
      this.renderDino(entry);
    })
  },

  moveDino(ev) {
    var li = ev.target.parentElement;
    var curID = Number(li.getAttribute("name"));

    var curList;
    var num;
    var HTMLlist;
    if (li.classList.contains("category1")) {
      curList = this.dinos1;
      num = '1';
      HTMLlist = this.list1;
      console.log('HERE');
    } else {
      if (li.classList.contains("category2")) {
        curList = this.dinos2;
        num = '2';
        HTMLlist = this.list2;
      } else {
        curList = this.dinos3;
        num = '3';
        HTMLlist = this.list3;
      }
    }

    console.log("Before switch: ");
    console.log(curList);

    //Move the dino in the array
    if (ev.target.classList.contains("moveUp")) {
      for (var i = 1; i < curList.length; i++) {
        if (curList[i].id === curID) {
          var temp = curList[i - 1];
          curList[i - 1] = curList[i];
          curList[i] = temp;
        }
      }
    } else {
      for (var i = 0; i < curList.length - 1; i++) {
        if (curList[i].id === curID) {
          var temp = curList[i + 1];
          curList[i + 1] = curList[i];
          curList[i] = temp;
          break;
        }
      }
    }

    console.log("After switch: ");
    console.log(curList);

    if (li.classList.contains("category1")) {
      this.dinos1 = curList;
    } else {
      if (li.classList.contains("category2")) {
        this.dinos2 = curList;
      } else {
        this.dinos3 = curList;
      }
    }


    //Save order change
    this.saveDinos(num);

    //Remove all of the dinos from the list, then put them back in the new order
    while (HTMLlist.firstChild) {
      HTMLlist.removeChild(HTMLlist.firstChild);
    }



    this.renderDinoList(num);
  },


  favoriteDino(ev) {
    var li = ev.target.parentElement;
    li.classList.toggle("favorite");
  },


  loadDinos(num) {
    return JSON.parse(localStorage.getItem("dinos" + num));
  },

  saveDinos(num) {
    var curList;

    switch (num) {
      case '1':
        curList = this.dinos1;
        break;
      case '2':
        curList = this.dinos2;
        break;
      case '3':
        curList = this.dinos3;
        break;
    }

    localStorage.setItem("dinos" + num, JSON.stringify(curList));
  },


  setID() {
    ++this.IDCounter;
    this.saveID();
    return this.IDCounter;
  },

  saveID() {
    localStorage.setItem("IDCounter", this.IDCounter);
  },

  loadID() {
    return Number(localStorage.getItem("IDCounter"));
  }


}


//Starts the app object
app.init(
  //Passing the init method an object
  {
    formSelector: '#dino-form',
    listSelector: ['#dino-list-1', '#dino-list-2', '#dino-list-3']
  }
)
