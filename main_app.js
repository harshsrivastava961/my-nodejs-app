// main_app.js (This file will use our greetings module)

// Require our local module. Use a relative path.
const greetings = require('./greetings');

const message1 = greetings.sayHello('Alice');
const message2 = greetings.sayGoodbye('Bob');

console.log(message1);
console.log(message2);