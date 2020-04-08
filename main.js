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

const correctLetters = ["r", "s", "t", "l", "n", "e", "d", "h", "c", "a", "p"];
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

displayWord();