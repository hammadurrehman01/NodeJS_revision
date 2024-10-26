import http from "http";
import fs from "fs";

const myServer = http.createServer((req, res) => {
    const currentDate = new Date(Date.now());
    fs.appendFile('./http_server/res.txt', `New Request: ${currentDate} from ${req.headers.host}\n`, () => { })
    switch (req.url) {
        case "/":
            res.end("Welcome to the nodejs server");
            break;
        case "/about":
            res.end("About page");
            break;
        case "/contact":
            res.end("contact page");
            break;
        default:
            res.end("404 Not found");
            break;
    }
})

myServer.listen(8000, () => console.log("Server is listening on port 8000"))