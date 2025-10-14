// use_lodash.js

// Require the third-party lodash module
const _ = require('lodash'); // The convention for lodash is to use '_'

const numbers = [1, 2, 3, 4, 5];

// Example 1: Sum of numbers using lodash's `sum` method
const sum = _.sum(numbers);
console.log('Sum of numbers:', sum); // Expected: 15

// Example 2: Reverse an array
const reversedNumbers = _.reverse([...numbers]); // Use spread to create a copy, as reverse modifies in place
console.log('Reversed numbers:', reversedNumbers); // Expected: [5, 4, 3, 2, 1]

// Example 3: Get a random number within a range
const randomNumber = _.random(1, 10);
console.log('Random number (1-10):', randomNumber); // Expected: a random number between 1 and 10

// Example 4: Convert string to camelCase
const sentence = "hello world how are you";
const camelCaseString = _.camelCase(sentence);
console.log('CamelCase string:', camelCaseString); // Expected: helloWorldHowAreYou