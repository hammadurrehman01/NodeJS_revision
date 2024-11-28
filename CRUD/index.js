import express from "express";
import usersData from "./MOCK_DATA.json" assert { type: "json" };
import fs from "fs";
import path from "path";

const app = express();

app.use(express.json());

app.get('/api/users', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        data: usersData,

    })
})

app.get('/users', (req, res) => {
    const html = `
    <ul>
    ${usersData.map((user) => `<li>${user.first_name}</li>.`).join("")}
    </ul>
    `
    return res.send(html)
})


app.get('/user/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = usersData.find((user) => user.id === id)
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        })
    }
    res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: user,

    })
})

app.post('/users', (req, res) => {
    const data = req.body;
    if (!data) {
        return res.status(400).json({
            success: false,
            message: "Please send the proper data",
        })
    }
    usersData.push({ ...data, id: usersData.length + 1 });
    fs.writeFile("CRUD/MOCK_DATA.json", JSON.stringify(usersData), (err, data) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Something went wrong while writing data",
            })
        }
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data
        })

    })

})

app.put('/user/:id', (req, res) => {
    const id = Number(req.params.id);
    const data = req.body;
    try {
        const userIndex = usersData.findIndex((user) => user.id === id)


        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        usersData[userIndex] = { ...usersData[userIndex], ...data }

        const filePath = path.resolve('./CRUD/MOCK_DATA.json');
        fs.writeFile(filePath, JSON.stringify(usersData, null, 2), () => { });

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: usersData[userIndex],
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
})

app.delete('/user/:id', (req, res) => {
    const id = Number(req.params.id);
    try {
        const userIndex = usersData.findIndex((user) => user.id === id);


        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        usersData.splice(userIndex, 1);

        const filePath = path.resolve('./CRUD/MOCK_DATA.json');
        fs.writeFile(filePath, JSON.stringify(usersData, null, 2), () => { });

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
})

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})