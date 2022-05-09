let counterTag = document.querySelector('#counter');
let interval;
let likedNumbers = [];

document.querySelector('#minus').addEventListener('click', handleMinus);
document.querySelector('#plus').addEventListener('click', handlePlus);
document.querySelector('#heart').addEventListener('click', handleHeart);
document.querySelector('#pause').addEventListener('click', handlePause);
document
   .querySelector('#comment-form')
   .addEventListener('submit', handleComment);

function counter() {
   interval = setInterval(function () {
      counterTag.innerText = parseInt(counterTag.innerText) + 1;
   }, 1000);
}
counter();

function handleMinus() {
   counterTag.innerText = parseInt(counterTag.innerText) - 1;
}

function handlePlus() {
   counterTag.innerText = parseInt(counterTag.innerText) + 1;
}

function handleHeart() {
   document.querySelector('body > ul').remove();
   document
      .querySelector('#restart')
      .insertAdjacentHTML('afterend', '<ul class="likes"></ul>');
   let likedNumbersCount = {};
   likedNumbers.push(parseInt(counterTag.innerText));
   likedNumbers.forEach(function (i) {
      likedNumbersCount[i] = (likedNumbersCount[i] || 0) + 1;
   });
   Object.keys(likedNumbersCount).forEach((key) => {
      let heartComment = document.createElement('li');
      if (likedNumbersCount[key] === 1) {
         heartComment.innerHTML = `${key} has been liked 1 time`;
      } else {
         heartComment.innerHTML = `${key} has been liked ${likedNumbersCount[key]} times`;
      }
      document.querySelector('body > ul').appendChild(heartComment);
   });
}

function handlePause() {
   let resumeButton = document.createElement('button');
   let space = document.createTextNode(' ');
   resumeButton.setAttribute('id', 'resume');
   resumeButton.textContent = 'resume';
   resumeButton.addEventListener('click', handleResume); //loop
   clearInterval(interval);
   document.querySelector('#minus').disabled = true;
   document.querySelector('#plus').disabled = true;
   document.querySelector('#heart').disabled = true;
   document.querySelector('#submit').disabled = true;
   document.querySelector('#restart').disabled = true;
   document.querySelectorAll('.delete').disabled = true;
   document.querySelector('#pause').remove();
   document
      .querySelector('body')
      .insertBefore(resumeButton, document.querySelector('#restart'));
   document
      .querySelector('body')
      .insertBefore(space, document.querySelector('#restart'));
}

function handleResume() {
   let pauseButton = document.createElement('button');
   let space = document.createTextNode(' ');
   pauseButton.setAttribute('id', 'pause');
   pauseButton.textContent = 'pause';
   pauseButton.addEventListener('click', handlePause); //loop
   counter();
   document.querySelector('#minus').disabled = false;
   document.querySelector('#plus').disabled = false;
   document.querySelector('#heart').disabled = false;
   document.querySelector('#submit').disabled = false;
   document.querySelector('#restart').disabled = false;
   document.querySelectorAll('.delete').disabled = false;
   document.querySelector('#resume').remove();
   document
      .querySelector('body')
      .insertBefore(pauseButton, document.querySelector('#restart'));
   document
      .querySelector('body')
      .insertBefore(space, document.querySelector('#restart'));
}

function addRestart() {
   let restart = document.createElement('button');
   restart.setAttribute('class', 'button');
   restart.setAttribute('id', 'restart');
   restart.textContent = 'restart';
   restart.addEventListener('click', () => {
      counterTag.innerText = 0;
      likedNumbers = [];
      document.querySelector('body > ul').remove();
      document.querySelector('#list').remove();
      document
         .querySelector('#restart')
         .insertAdjacentHTML('afterend', '<ul class="likes"></ul>');
      document
         .querySelector('body > div > h3')
         .insertAdjacentHTML(
            'afterend',
            '<div id="list" class="comments"></div>'
         );
   });
   document
      .querySelector('body')
      .insertBefore(restart, document.querySelector('body > ul'));
}
addRestart();

function handleComment(e) {
   e.preventDefault();
   let p = document.createElement('p');
   let text = document.createElement('tag');
   let deleteButton = document.createElement('button');
   deleteButton.setAttribute('class', 'delete');
   deleteButton.addEventListener('click', (e) => {
      e.target.parentNode.remove();
   });
   p.textContent = `${e.target['comment'].value} `;
   deleteButton.textContent = 'Delete';
   p.appendChild(text);
   p.appendChild(deleteButton);
   document.querySelector('#list').appendChild(p);
   e.target.reset();
}
