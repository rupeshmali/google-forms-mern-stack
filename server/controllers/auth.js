const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt')

exports.signUp = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        if (!firstName || !email || !password) {
            throw new Error('Firstname, Email and Password are required.')
        }

        const user = await prisma.user.findFirst({
            where: { email }
        })
        if (user) {
            throw new Error('Welcome back! It seems you already have an account. Please log in to access your profile.')
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword
            }
        })

        return res.status(201).json({
            success: true,
            message: "Your account has been successfully created.",
            user: {
                firstName,
                email
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.signIn = async (req, res) => {
    try {

    } catch (error) {

    }
}