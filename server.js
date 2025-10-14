// // 1. Require the built-in 'http' module
// const http = require('http');

// // 2. Define the hostname and port for our server
// const hostname = '127.0.0.1'; // This is 'localhost', your own computer
// const port = 3000; // A common port for local development

// // 3. Create the server using http.createServer()
// // This function takes a callback that runs for every request the server receives.
// // The callback has two arguments: the request object (req) and the response object (res).
// const server = http.createServer((req, res) => {
//     // 4. Set the status code and content type of the response header
//     //    200 means 'OK' (the request was successful)
//     //    'Content-Type': 'text/plain' tells the browser to render the response as plain text
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');

//     // 5. Write the response body and end the response
//     //    res.end() signals to the server that the response is complete.
//     res.end('Hello, World from my Node.js Server!');
// });

// // 6. Start the server and make it listen for connections on the specified port and hostname
// // The callback function here is optional and runs once the server starts listening.
// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });



const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    // Use the req.url property to determine the route
    if (req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html'); // Changed to text/html
        res.end('<h1>Welcome to the Home Pagess</h1>');

    } else if (req.url === '/about') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h2>This is the About Page</h2><p>We are learning Node.js!</p>');

    } else {
        // Handle all other URLs with a 404 Not Found error
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>404ss - Page Not Found</h1>');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});