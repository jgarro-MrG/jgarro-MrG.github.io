function getUserChoice(userInput) {
    userInput = userInput.toLowerCase();

    if (userInput === 'rock') {
        return userInput;
    } else if (userInput === 'paper') {
        return userInput;
    } else if (userInput === 'scissors') {
        return userInput;
    } else {
        console.log("Error: Invalid Input")
    }   
  } 

  function getComputerChoice() {
    var randomNumber = Math.floor(Math.random() * 3);  
    if (randomNumber === 0) {
        return 'rock';
    } else if (randomNumber === 1) {
        return 'paper';
    } else if (randomNumber === 2) {
        return 'scissors';    
    }    
  } 

  function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return "It's a tie!"
    }
    if (userChoice === 'rock') {
        if (computerChoice === 'scissors') {
            return "You win!"
        } else if (computerChoice === 'paper') {
            return "The computer wins!"
        }
    } 
    if (userChoice === 'paper') {
        if (computerChoice === 'rock') {
            return "You win!"
        } else if (computerChoice === 'scissora') {
            return "The computer wins!"
        }
    }   
    if (userChoice === 'scissors') {
        if (computerChoice === 'paper') {
            return "You win!"
        } else if (computerChoice === 'rock') {
            return "The computer wins!"
        }
    }  
  } 
  
  function playGame() {
    var userChoice = getUserChoice('rock');
    var computerChoice = getComputerChoice();  
    console.log(userChoice);
    console.log(computerChoice);  
    console.log(determineWinner(userChoice, computerChoice));
  } 

  playGame();
  
  
  
  
  
  