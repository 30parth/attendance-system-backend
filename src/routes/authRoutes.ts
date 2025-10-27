import { Router } from "express";
import { IUser, User } from "../models/User";

const authRoutes = Router();

authRoutes.post('/login', async (req, res) => {
    
    const { username, password } = req.body;
    
    try {
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const user :IUser | null = await User.findOne({ email :username });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        if (user.password != password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        return res.status(200).json({ user: { name: user.name, email: user.email ,role: user.role} });

    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

});

export default authRoutes;