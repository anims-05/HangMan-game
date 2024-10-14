var programming_lang = ["html", "css",
    "python",
    "java",
    "javascript",
    "swift",
    "c",
    "r",
    "golang", "php", "mongodb", "json", "csharp", "kotlin", "sql"];

let ans = "";
let maxwrong = 6;
let mistakes = 0;
let guessed = [];
let wordstatus = null;
var happysound = document.getElementById('happyclick');
var sadsound = document.getElementById('sadclick');
var winningsound = document.getElementById('won');
var losingsound = document.getElementById('lost');

// Chooses a randomword
function randomword() {
    ans = programming_lang[Math.floor(Math.random() * programming_lang.length)];
    // alert(ans);
}

// generate alphabetic bttns
function generateBttns() {
    let bttnhtml = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
        `<button class="btn btn-lg btn-primary m-2" id = '` + letter + `' onClick = handleguess('` + letter + `')>` + letter + `</button>`).join('');
    document.getElementById('keyboard').innerHTML = bttnhtml;
}

// maxwrong
document.getElementById('maxwrong').innerHTML = maxwrong;

// generates blank or letter
function guessedword(){
    wordstatus = ans.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _")).join('');
    document.getElementById('wordspotlight').innerHTML = wordstatus;
}

// making alphabets appear
function handleguess(chosenletter){
    guessed.indexOf(chosenletter)=== -1 ? guessed.push(chosenletter) : null;
    document.getElementById(chosenletter).setAttribute('disabled', true);

    if(ans.indexOf(chosenletter)>= 0)
    {
        guessedword();
        checkifwon();
        happysound.currentTime = 0;
        happysound.play();
    }
    else{
        mistakes++;
        updatemistake();
        checkiflost();
        updatepic();
        sadsound.currentTime = 0;
        sadsound.play();
        
    }
}

// update picture
function updatepic()
{
    document.getElementById("hangman-pic").src =  mistakes +".jpg";
}

// update mistakes
function updatemistake()
{
    document.getElementById('mistakes').innerHTML = mistakes;
}

// checking if lost
function checkiflost()
{
    if(mistakes===maxwrong)
    {   
        // losingsound.currentTime = 0;
        losingsound.play();
        document.getElementById('keyboard').innerHTML = "Better luck next time!";
        document.getElementById('wordspotlight').innerHTML = "The answer was " + ans;
    }
}
// checking if won
function checkifwon(){
    if(wordstatus===ans)
    {  
        // winningsound.currentTime = 0;
        winningsound.play();
        document.getElementById('keyboard').innerHTML = "Congrats! You won";
    }
}

// resetting
function reset()
{
    mistakes = 0;
    guessed = [];
    wordstatus = null;
    document.getElementById('hangman-pic').src = "0.jpg";

    randomword();
    guessedword();
    updatemistake();
    generateBttns();
}
generateBttns();
randomword();
guessedword();

