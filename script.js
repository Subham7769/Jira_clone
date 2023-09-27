const createBtn = document.querySelectorAll("section>div>button");
const inputElement = document.querySelectorAll("section>div>input");
const cardContainersAll = document.querySelectorAll("section>div>div");

// add 'eventListener' to 'create' buttons
for (let i = 0; i < createBtn.length; i++) {
  createBtn[i].addEventListener("click", createTask);
}
// create button will show you the 'input' field
function createTask(event) {
  const textInput = event.target.nextElementSibling;
  textInput.className = "show";
  //automatically focus to the input element
  textInput.focus(); 
}

// adding 'eventListeners'  'keyup' on 'enter' button
for (let i = 0; i < inputElement.length; i++) {
  inputElement[i].addEventListener("keyup", handleInput);
}

// after entering the 'taskname', creating 'cards' to be added in the section
function handleInput(event) {
  if (event.keyCode === 13) {
    const taskName = event.target.value;

    // create a 'newCard' to be list down
    let newCard = document.createElement("div");
    newCard.draggable = true;
    newCard.className = "newCard";
    newCard.id = `${count}`;
    newCard.innerHTML = `
        <b>${taskName}</b>
        <button onclick="deleteTask(this)" class="deleteBtn">x</button>`;

    // add 'newCards' in to the 'currentCardsContainer'
    const currentCardsContainer = event.target.nextElementSibling;
    currentCardsContainer.className = "cardsContainer";

    // putting the 'newCards' inside the 'currentCardsContainer'
    currentCardsContainer.appendChild(newCard);

    // putting the 'newCards' inside the Card array 'cardArr'
    cardArr.push(newCard);
    count++;

    // add 'eventLister' to every 'newCard' 'dragStart' which will help in identifying the 'CurrentCard' using its 'id' in 'cardArr' for its dropping functionality
    newCard.addEventListener("dragstart", (event) => {
      console.log("dragstart");
      currentCard = cardArr[Number(event.target.id)];
    });

    // 'empty' & 'hide' the 'input' element after adding the 'newCards'
    event.target.value = "";
    event.target.className = "hide";
  }
}

// to 'delete' the card using delete 'button'
function deleteTask(deleteBtn) {
  const parentCard = deleteBtn.parentNode;
  parentCard.remove();
}

var cardArr = [];
var count = 0;
var dragElementId;
var currentCard;

// add 'eventListener' to the 'cardContainers'
for (let i = 0; i < cardContainersAll.length; i++) {
  cardContainersAll[i].addEventListener("dragover", toTriggerDrop);
  cardContainersAll[i].addEventListener("drop", appendDrop);
}
// this function will ensure to let the 'drop' event to be triggered
function toTriggerDrop(event) {
  // it will ensure to trigger the drop event by preventing the default behavior
  event.preventDefault();
  console.log("drag over");
}
//  this function will ensure to 'append' the 'drop element' in to the 'cardContainers'
function appendDrop(event) {
  console.log("drop event triggered");
  event.target.appendChild(currentCard);
  event.preventDefault();
}
