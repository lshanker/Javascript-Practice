const app = {
  init(selectors) {
    this.dinos = JSON.parse(localStorage.getItem("dinos"));
    this.max = this.dinos.length;
    this.namesAfterRefresh();
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



    ++this.max
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
    favButton.addEventListener("click", function() {
      promoteEntry(this);
    }, false);

    const delButton = document.createElement('button');
    delButton.textContent = "Delete";
    delButton.setAttribute("class", "alert button");
    delButton.addEventListener("click", function() {
      deleteEntry(this);
    }, false);

    const upButton = document.createElement('button');
    upButton.textContent = "Move Up";
    upButton.setAttribute("class", "warning button");
    upButton.addEventListener("click", function() {
      moveUp(this);
    }, false);

    const downButton = document.createElement('button');
    downButton.textContent = "Move Down";
    downButton.setAttribute("class", "secondary button");
    downButton.addEventListener("click", function() {
      moveDown(this);
    }, false);

    item.appendChild(span);
    item.appendChild(favButton);
    item.appendChild(delButton);
    item.appendChild(upButton);
    item.appendChild(downButton);

    return item
  },

  namesAfterRefresh(){
      var dinos = JSON.parse(localStorage.getItem("dinos"));
      console.log(dinos);

      var ul = document.querySelector('ul');

      for(var i = 0; i< dinos.length; i++){
        var li = this.renderListItem(dinos[i]);
        console.log(li);
        ul.appendChild(li);
      }
  }
}


function promoteEntry(button) {

  //TODO try using .closest

  var li = button.parentElement;

  if (li.style.color === "black") {
    li.style.color = "gold";
    li.style.fontWeight = 'bold';
  } else {
    li.style.color = "black";
    li.style.fontWeight = 'normal';
  }
}


function deleteEntry(button) {
  var li = button.parentElement;
  li.parentNode.removeChild(li);

  //Remove the dino from the array
  var curID = Number(li.getAttribute('name'));

  for (var i = 0; i < app.dinos.length; i++) {

    if (app.dinos[i]['id'] === curID) {
      app.dinos.splice(i, 1);
    }
  }

  //Don't forget to update the counter and the stored array
  --app.max;
  localStorage.setItem("dinos", JSON.stringify(app.dinos));
}

function moveUp(button) {
  var li = button.parentElement;
  var curID = Number(li.getAttribute('name'));

  var dinos = JSON.parse(localStorage.getItem("dinos"));

  for (var j = 0; j < dinos.length; j++) {
    //Switch the two elements to move the desired dino down one
    if (j != 0) {
      if (dinos[j]['id'] === curID) {
        var temp = dinos[j];
        dinos[j] = dinos[j - 1];
        dinos[j - 1] = temp;
      }
    }
  }

  localStorage.setItem("dinos", JSON.stringify(dinos));

  namesFromStorage();
}


function moveDown(button) {
  var li = button.parentElement;
  var curID = Number(li.getAttribute('name'));

  var dinos = JSON.parse(localStorage.getItem("dinos"));

  console.log(dinos);

  for (var j = 0; j < dinos.length - 1; j++) {
    //Switch the two elements to move the desired dino up one
    if (j != dinos.length - 1) {
      if (dinos[j]['id'] === curID) {
        var temp = dinos[j];
        dinos[j] = dinos[j + 1];
        dinos[j + 1] = temp;
        break;
      }
    }
  }

  console.log(dinos);

  localStorage.setItem("dinos", JSON.stringify(dinos));

  namesFromStorage();
}

function namesFromStorage() {

  var dinos = JSON.parse(localStorage.getItem("dinos"));

  var ul = document.querySelector('ul');
  var children = ul.children;

  for (var i = 0; i < children.length; i++) {
    children[i].getElementsByTagName("span")[0].innerHTML = dinos[i]['name'];
    children[i].setAttribute("name", dinos[i]['id']);
  }

}





app.init({
  formSelector: '#dino-form',
  listSelector: '#dino-list',
})
