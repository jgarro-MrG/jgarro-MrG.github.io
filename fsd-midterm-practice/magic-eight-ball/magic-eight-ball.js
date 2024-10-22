var userName = prompt("What is your name?");        // TODO 1

if (userName !== "") {                              // TODO 2
    console.log("Hello " + userName + "!")
} else {
    console.log("Hello!")
}

var userQuestion = prompt("Ask a question.");       // TODO 3
console.log(userQuestion);                          // TODO 4
var randomNumber = Math.floor(Math.random() * 8);   // TODO 5
var eightBall = "";   

if (randomNumber === 0) {                           // TODO 7
    eightBall = 'It is certain';
} else if (randomNumber === 1) {
    eightBall = 'It is decidedly so';
} else if (randomNumber === 2) {
    eightBall = 'Reply hazy try again';
} else if (randomNumber === 3) {
    eightBall = 'Cannot predict now';
} else if (randomNumber === 4) {
    eightBall = 'Do not count on it';
} else if (randomNumber === 5) {
    eightBall = 'My sources say no';
} else if (randomNumber === 6) {
    eightBall = 'Outlook not so good';
} else {
    eightBall = 'Signs point to yes';
}
console.log(eightBall);                             // TODO 8