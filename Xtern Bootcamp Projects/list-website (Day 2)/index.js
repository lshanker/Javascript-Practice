
/*----------Functions-----------*/


function addButtons(li){
  var promote = document.createElement('button');
  promote.innerHTML = "Promote";
  promote.addEventListener("click", function(){
    promoteEntry(this);
  }, false);

  var del = document.createElement('button');
  del.innerHTML = "Delete";
  del.addEventListener("click", function(){
    deleteEntry(this);
  }, false);

  li.appendChild(promote);
  li.appendChild(del);
}

function promoteEntry(button){
  var li = button.parentElement;

  if(button.innerHTML === "Promote"){
    button.innerHTML = "Demote";
    li.style.color = "red";
  }else{
    button.innerHTML = "Promote";
    li.style.color = "black";
  }

}

function deleteEntry(button){
  var li = button.parentElement;

  li.parentNode.removeChild(li);
}


function addToListBottom(content){

  //First make the new list item
  var li = document.createElement('li');
  li.innerHTML = content;
  addButtons(li);

  //Now append it to the ul element on the page
  var ul = document.querySelector('ul');
  ul.appendChild(li);
}


function addToListTop(content){

    //First make the new list item
    var li = document.createElement('li');
    li.innerHTML = content;
    addButtons(li);

    //Now append it before the list's first child
    var ul = document.querySelector('ul');
    ul.insertBefore(li, ul.firstChild);


}


function handleSubmit(ev){
  ev.preventDefault();
  const form = ev.target;

  var entry = form.listEntry.value;

  if(form.topCheckbox.checked){
    addToListTop(entry);
  }else{
    addToListBottom(entry);
  }

}




/*------------Listeners-------------*/

listEntryForm.addEventListener('submit', handleSubmit);
