let addItemForm = document.querySelector('#addItemForm');
let itemList = document.querySelector('.actionItems');
let storage = chrome.storage.sync; 


const renderActionItems = (actionItems) => {
  actionItems.forEach((item) => {
    renderItem(item.text);
  })
}

addItemForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let submission = addItemForm.elements.namedItem('itemText').value;
  if(submission){
    add(submission);
    renderItem(submission);
    addItemForm.elements.namedItem('itemText').value = '';
  }
})


const add = (submission) =>{
  let actionItem = {
    id: 1,
    date: new Date().toString(),
    text: submission,
    completed: null
  }

  console.log(actionItem);


  chrome.storage.sync.get(['actionItems'], (data) => {
      let items = data.actionItems;
      if(!items){
        items = new Array ();
        items.push(actionItem);
      }else{
        items.push(actionItem);
      }
      items.push(actionItem);
      chrome.storage.sync.set({
        actionitems: items
      }, () => {
      chrome.storage.sync.get(['actionItems'], (data) => {
        console.log(data);
        });
      })
    })
  }

const renderItem = (submission) => {
  let element = document.createElement('div');
  element.classList.add('actionItem__item');

  let mainElement = document.createElement('div');
  mainElement.classList.add('actionItem__main');
  
  let checkElement = document.createElement('div');
  checkElement.classList.add('actionItem__check');

  let textElement = document.createElement('div');
  textElement.classList.add('actionItem__text');
  
  let deleteElement= document.createElement('div');
  deleteElement.classList.add('actionItem__delete');
  
  checkElement.innerHTML = 
  '<div class="actionItem__checkBox"><i class="fas fa-check" aria-hidden="true"></i></div> ' ;

  textElement.textContent = submission;
  deleteElement.innerHTML = '<i class="fas fa-times" aria-hidden="true"></i>';
  mainElement.appendChild(checkElement);
  mainElement.appendChild(textElement);
  mainElement.appendChild(deleteElement);
  element.appendChild(mainElement);
  itemList.prepend(element);
}

// progressbar.js@1.0.0 version is used
// Docs: http://progressbarjs.readthedocs.org/en/1.0.0/

var circle = new ProgressBar.Circle('#container', {
    color: '#aaa',
    // This has to be the same size as the maximum width to
    // prevent clipping
    strokeWidth: 4,
    trailWidth: 1,
    easing: 'easeInOut',
    duration: 1400,
    text: {
      autoStyleContainer: false
    },
    from: { color: '#00FF00', width: 1 },
    to: { color: '#008000', width: 4 },
    // Set default step function for all animate calls
    step: function(state, circle) {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);
  
      var value = Math.round(circle.value() * 100);
      if (value === 0) {
        circle.setText('');
      } else {
        circle.setText(value);
      }
  
    }
  });
  circle.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
  circle.text.style.fontSize = '2rem';
  
  circle.animate(1.0);  // Number from 0.0 to 1.0