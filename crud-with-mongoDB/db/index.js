import { connect } from "mongoose";

export const connectDB = async () => {
    try {
        const connection = await connect("mongodb://127.0.0.1:27017/practice");
        if (connection) {
            console.log("MONGO Connected!")
        } else {
            console.log("Mongo was not be able to connect yet")
        }
    } catch (error) {
        console.log(error.message)
    }
}

export default connectDB