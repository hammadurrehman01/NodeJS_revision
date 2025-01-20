import express from "express";
import connectDB from "./db/index.js";
import userRoute from "./routes/user.js";

const app = express();
connectDB();

app.use(express.json());

app.use("/users", userRoute);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})