import { Router } from "express";
import { IUser, User } from "../models/User";

const authRoutes = Router();

authRoutes.post('/login', async (req, res) => {
    
    const { email, password } = req.body;
    
    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // const user :IUser = await User.findOne({ email }).select('+password');
        const user :IUser | null = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        if (user.password != password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        return res.status(200).json({ user: { name: user.name, email: user.email } });

    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

});

export default authRoutes;