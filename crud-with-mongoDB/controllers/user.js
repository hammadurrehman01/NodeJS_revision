import User from "../models/user.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (users) {
            res.status(200).json({
                success: true,
                message: "Users retrieved successfully",
                data: users,
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params._id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }
        else {
            return res.status(200).json({
                success: true,
                message: "User retrieved successfully",
                data: user,

            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const createUser = async (req, res) => {
    const { firstName, lastName, email, gender, age, } = req.body;
    try {
        if (!firstName, !lastName, !email, !gender, !age) {
            return res.status(400).json({
                success: false,
                message: "Please send the proper data",
            })
        }

        const user = await User.create({
            firstName,
            lastName,
            email,
            gender,
            age,
        })

        if (user) {
            return res.status(201).json({
                success: true,
                message: "User created successfully",
                data: user
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const updateUser = async (req, res) => {
    const data = req.body;
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            gender: data.gender,
            age: data.age,
        })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: user,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete(req.params.id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}