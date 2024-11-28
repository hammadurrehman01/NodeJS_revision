import http from "http";
import url from "url";


const myServer = http.createServer((req, res) => {
    const myUrl = url.parse(req.url, true)

    switch (myUrl.pathname) {

        case "/":
            res.end("Welcome to the nodejs server");
            break;
        case "/contact":
            res.end("contact page");
            break;
        case "/about":
            const username = myUrl.query.username;
            res.end(`About page of ${username}`);
            break;
        default:
            res.end("404 Not found");
            break;
    }


})

myServer.listen(8000, () => console.log("Server is listening on port 8000"))




