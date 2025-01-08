import express from "express";

const app = express();
const PORT = 8000;

const data = {
    name: "Hammad Ur Rehman",
    age: 20,
    occupation: "Software development",
    gender: "Male",
}

app.get('/', (req, res) => {
    console.log(req.headers)
    res.setHeader('X-name', "Hammad Ur Rehman")
    res.json({
        success: true,
        message: "Data retrieved successfully",
        data
    })
})



app.listen(PORT, () => {
    console.log(`Server is listening on the port ${PORT}`);
})