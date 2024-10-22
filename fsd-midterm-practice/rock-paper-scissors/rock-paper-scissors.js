// FIND THE TODO SECTION
// WRITE YOUR CODE UNDER THE SECTION
// DO NOT DELETE ANY COMMENTS
// USE THEM AS GUIDANCE

// TODO 1: create a function named getUserChoice that takes a single parameter userInput
function getUserChoice(userInput) {
    // TODO 2: make the userInput all lowercase
    userInput = userInput.toLowerCase();
      
    // TODO 3: check to make sure that the user typed a valid choice: ‘rock’, ‘paper’, or ‘scissors’ and do something about it
    if (userInput === 'rock') {
        return userInput;
    } else if (userInput === 'paper') {
        return userInput;
    } else if (userInput === 'scissors') {
        return userInput;
    } else {
        console.log("Error: Invalid Input")
    }   
  } // DO NOT DELETE THIS LINE 

  // TODO 5: Create a new function named getComputerChoice with no parameters
  function getComputerChoice() {
    // Inside its block, utilize Math.random() and Math.floor() to get a whole number between 0 and 2.
    var randomNumber = Math.floor(Math.random() * 3);  
    // depending on the number, return either 'rock', 'paper', or 'scissors'
    if (randomNumber === 0) {
        return 'rock';
    } else if (randomNumber === 1) {
        return 'paper';
    } else if (randomNumber === 2) {
        return 'scissors';    
    }    
  } // DO NOT DELETE THIS LINE

  // TODO 7: Create a function named determineWinner that takes two parameters named userChoice and computerChoice.
  function determineWinner(userChoice, computerChoice) {
    // write an if statement that checks if the userChoice parameter equals the computerChoice parameter
    if (userChoice === computerChoice) {
        return "It's a tie!"
    }
    // TODO 8: write if statement that checks if the userChoice is 'rock'
    if (userChoice === 'rock') {
        if (computerChoice === 'scissors') {
            return "You win!"
        } else if (computerChoice === 'paper') {
            return "The computer wins!"
        }
    } 
    // TODO 9: write another if statement for if the userChoice is 'paper'
    if (userChoice === 'paper') {
        if (computerChoice === 'rock') {
            return "You win!"
        } else if (computerChoice === 'scissora') {
            return "The computer wins!"
        }
    }  
    // TODO 10: write yet another if statement for if the userChoice is 'scissors'.
    if (userChoice === 'scissors') {
        if (computerChoice === 'paper') {
            return "You win!"
        } else if (computerChoice === 'rock') {
            return "The computer wins!"
        }
    }  
  } // DO NOT DELETE THIS LINE 
  // TODO 12: Create a function named playGame.
  function playGame() {
    //  create a variable named userChoice set equal to the result of calling getUserChoice(), passing in either 'rock', 'paper', or 'scissors' as an argument.
    var userChoice = getUserChoice('rock');
    // Create another variable named computerChoice, and set it equal to the result of calling getComputerChoice()
    var computerChoice = getComputerChoice();  
    // Under both of these variables, use console.log to print them to the console.
    console.log(userChoice);
    console.log(computerChoice);  
    // TODO 13: call the determineWinner() function. Pass in the userChoice and computerChoice variables as its parameters. Make sure to put this function call inside of a console.log() statement so you can see the result.
    console.log(determineWinner(userChoice, computerChoice));
  } // DO NOT DELETE THIS LINE
  // TODO 14: to start the game, call the playGame() function on the last line of your program
  playGame();
  
  
  
  
  
  