//DOM Elements 
const wordElement = document.getElementById('word');
const wrongLettersElement = document.getElementById('wrong-letters');
const playAgainButton = document.getElementById('play-button');
const popUp = document.getElementById('pop-up-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

//Hangman 
const hangmanParts = document.querySelectorAll('.body-part');

//Words
const words = ['pasta', 'truck', 'balloon', 'nintendo', 'paint', 'hiking', 'capone', 'school'];

let selectedWord = words[Math.floor(Math.random() * words.length)];
console.log(selectedWord);

const correctLetters = [];
const wrongLetters = [];

//Show Hidden Word
//turn selectedWord, which is a string, into an array of letters using split('')
//for each letter return an element (span) with class of letter
//using include(), check to see if any of the letters are in the correct letter
//if letter is included, show letter. else, show empty string 
//turn array back into a string with join

function displayWord() {
    wordElement.innerHTML = 
    `${selectedWord
        .split('')
        .map(letter =>
            `<span class='letter'>
            ${correctLetters.includes(letter) ? letter : ''}
            </span>`
            ).join('')}`;
    
    //console.log(wordElement.innerText);
    
    //Remove New Line Character 
    const innerWord = wordElement.innerText.replace(/\n/g, '')
    //console.log(innerWord); 

    if (innerWord === selectedWord) {
        finalMessage.innerText = 'You Won!';
        popUp.style.display = 'flex';
    }
};

//Update The Wrong Letters
function updateWrongLettersElement() {

    //display wrong letters
    wrongLettersElement.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong !</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    //display hangman's parts 
    hangmanParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    //check if lost
    if (wrongLetters.length === hangmanParts.length) {
        finalMessage.innerText = 'Game Over!'
        popUp.style.display = 'flex';
    }
};

//Show Notification
function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
};

//Keydown Letter Press - ONLY Letters 65-90
window.addEventListener('keydown', event => {
    //console.log(event.keyCode);

    if(event.keyCode >= 65 && event.keyCode <= 90) {
        console.log('you typed a letter');
        const letter = event.key;

            if(selectedWord.includes(letter)) {

                    if(!correctLetters.includes(letter)) {
                        correctLetters.push(letter);

                        displayWord();
                    } else {
                        showNotification()
                    }

            } else {
                if(!wrongLetters.includes(letter)) {
                    wrongLetters.push(letter);

                    updateWrongLettersElement();
                } else {
                    showNotification();
                }
            }
    } else {
        alert('You can only choose A through Z');
    }
});

//Restart Game
playAgainButton.addEventListener('click', () => {
    //empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLettersElement();

    popUp.style.display = 'none';
});

displayWord();