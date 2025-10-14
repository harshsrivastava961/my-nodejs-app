// greetings.js (This is our custom module)

function sayHello(name) {
    return `Hello, ${name}!`;
}

function sayGoodbye(name) {
    return `Goodbye, ${name}!`;
}

// Export the functions so they can be used in other files
module.exports = {
    sayHello: sayHello,
    sayGoodbye: sayGoodbye,
    // You can also use shorthand if key and value are the same:
    // sayHello,
    // sayGoodbye
};