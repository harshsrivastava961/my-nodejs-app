// 1. Require the built-in 'fs' (File System) module
const fs = require('fs');

// 2. Use the 'readFile' method from the 'fs' module
//    It takes the file path, encoding, and a callback function
fs.readFile('message.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    console.log('File content:');
    console.log(data);
});

console.log('Attempting to read file...'); // This will often print first due to async nature