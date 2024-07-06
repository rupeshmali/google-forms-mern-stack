const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();


exports.signUp = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        if (!firstName || !email || !password) {
            throw new Error('Firstname, Email and Password are required.')
        }

        const user = await prisma.user.findFirst({
            where: {
                email
            }
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
    const { email, password } = req.body;
    try {
        if (email === '' || password === '') {
            throw new Error('Email and Password are required.')
        }

        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })
        if (!user) {
            throw new Error('There seems to be a problem with your login credentials. Please verify your email and password and try again.');
        }
        if (!bcrypt.compareSync(password, user.password)) {
            throw new Error('There seems to be a problem with your login credentials. Please verify your email and password and try again.');
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

        return res.status(200).json({
            success: true,
            message:`Welcome back, ${user.firstName}! You're logged in.`,
            token,
            user: {
                email: user.email,
                name: user.firstName + user.lastName
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