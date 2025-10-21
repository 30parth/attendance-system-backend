"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("./models/User");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.post('/users', async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = new User_1.User({ name, email });
        await user.save();
        res.status(201).json(user);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
const PORT = process.env.PORT || 3000;
async function start() {
    await (0, db_1.connectDB)();
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}
start().catch(err => {
    console.error('Failed to start server', err);
    process.exit(1);
});
