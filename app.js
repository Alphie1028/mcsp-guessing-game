//This will store everything for the game.
let gameData = {};

//Start the game up, get player name and magic number
function gameStart(){
    gameData.magicNum = (Math.floor(Math.random() * (100 - 0 + 1) + 0));
    gameData.pastStats = {};
    console.log('The game has started, the magic number is ' + gameData.magicNum);
    gameData.name = window.prompt('Welcome to the ultimate guessing game! Who will be attemping it today?');
    sureYouWantToPlay();
}

//Make sure (name) actually wants to play
function sureYouWantToPlay(){
    // use window.confirm try console.log(window)
    let ans = window.prompt('Do you actually want to play this game ' + gameData.name + '?');
    if(ans === null || ans == 'maybe' || ans == 'MAYBE'){
        let ans = window.prompt('This is a simple yes or no ' + gameData.name + '. Please try again.');
        if(ans == 'yes' || ans == 'sure' || ans == 'yea' || ans == 'YES' || ans == 'SURE' || ans == 'YEA'){
            window.alert('Great! ' + gameData.name + ', Your goal is to guess a number between 0 and 1000. Press OK to continue.');
            getGuess();
        }else{
            window.alert('Thats a shame, good bye.');
        }
    }else if(ans == 'yes' || ans == 'sure' || ans == 'yea' || ans == 'YES' || ans == 'SURE' || ans == 'YEA'){
            window.alert('Great! ' + gameData.name + ', Your goal is to guess a number between 0 and 100. Press OK to continue.');
            getGuess();
        }else{
            window.alert('Thats a shame, good bye.');
    }
}

//get the players first guess
function getGuess(){
    gameData.guess = parseInt(window.prompt(`Okay ${gameData.name}, enter in your first guess.`));
    gameData.playerHistory = [];
    gameData.playerHistory.push(gameData.guess);
    gameData.counter = 1;
    firstGuess();
}

//check the players guess, if wrong give hint, add 1 to counter, loop to other guesses
function firstGuess(){
    if(gameData.guess === gameData.magicNum){
        howBadRU();
        window.alert(`${gameData.skill}\nPlayer history: ${gameData.playerHistory}`);
    }else{
        otherGuess();
    }
}

//After the first guess failed, player gets asked to try again
function otherGuess(){
    if(gameData.guess < gameData.magicNum){
        gameData.counter += 1;
        gameData.guess = parseInt(window.prompt(`Looks like that was lower ${gameData.name},\nhow about you try again?`));
        gameData.playerHistory.push(gameData.guess);
        otherGuess();
    }else if(gameData.guess > gameData.magicNum){
        gameData.counter += 1;
        gameData.guess = parseInt(window.prompt(`Woah there that was a bit higher than the real number.\nHow about you try again ${gameData.name}, this time lower.`));
        gameData.playerHistory.push(gameData.guess);
        otherGuess();
    }else{
        howBadRU();
        gameData.playerHistory.pop();
        window.alert(`${gameData.skill}\nCorrect answer was: ${gameData.magicNum}\nPlayer history: ${gameData.playerHistory}`);
        gameData.pastStats[gameData.name] = [gameData.counter];
        console.log(gameData);
        compareHistory();
        let playAgain = window.prompt(`Well, would you or someone else like to play again?`);
        if(playAgain == 'yes' || playAgain == 'sure' || playAgain == 'yea' || playAgain == 'YES' || playAgain == 'SURE' || playAgain == 'YEA'){
            gameData.magicNum = (Math.floor(Math.random() * (100 - 0 + 1) + 0));
            samePlayerOrNot();
            getGuess();
        }
        else{
            return;
        }
    }
}

//checks to see if its the same player or nah
function samePlayerOrNot(){
    let ans = window.prompt(`Will it be ${gameData.name} playing again?`);
    if(ans == 'yes' || ans == 'sure' || ans == 'yea' || ans == 'YES' || ans == 'SURE' || ans == 'YEA'){
        window.alert(`Maybe you can beat your highscore this time ${gameData.name}`);
    }else{
        gameData.name = window.prompt('Okay, so who will be playing this time?');
        window.alert(`Welcome ${gameData.name}, guess a number between 0-100`);
    }
}

//check to see how bad the player is
function howBadRU(){
    if(gameData.counter === 0){
        gameData.skill = 'Holy smokes Batman, correct on your first try?!?!?!';
    }else if(gameData.counter <= 5){
        gameData.skill = `Great job ${gameData.name}, it only took you ${gameData.counter} tries!`;
    }else if( gameData.counter >= 6 && gameData.counter <= 20){
        gameData.skill = `Not too shabby... Only ${gameData.counter} tries ${gameData.name}.`
    }else{
        gameData.skill = `Okay ${gameData.name}, maybe dont quit your day job...`
    }
}

//compare all past scores for current player
function compareHistory(){
    
    let temp = gameData.pastStats[gameData.name];
    console.log(temp);
    let lastScore =temp.slice(-1);
    if(temp.length <= 2){
        if(gameData.counter === lastScore){
            window.alert(`Well you didnt do any worse than last game ${gameData.name}.\nThis Score: ${gameData.counter} Last Score: ${lastScore}`);
        }else if(gameData.counter < lastScore){
            window.alert(`Good job at being better this time ${gameData.name}!\nThis Score: ${gameData.counter} Last Score: ${lastScore}`);
        }else{
            window.alert(`You mean to tell me you did worse ${gameData.name}?!?!\nThis Score: ${gameData.counter} Last Score: ${lastScore}`);
        }
    }else{
        return;
    }
}

//actually staring the game.
gameStart();