const express = require("express");
const axios = require("axios");

const app = express();

// ✅ FIXED BACKEND URL (use your actual IP)
const BACKEND_URL = "http://172.21.93.221:5000";

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/users`);
        const users = response.data;

        let html = "<h1>User List</h1><ul>";
        users.forEach(user => {
            html += `<li>${user.name}</li>`;
        });
        html += "</ul>";

        res.send(html);
    } catch (error) {
        console.error(error.message); // 👈 helps debug
        res.send("Error connecting to backend");
    }
});

app.listen(3000, () => {
    console.log("Frontend running on port 3000");
});