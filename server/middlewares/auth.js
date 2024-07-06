const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.verifyUser = async (req, res, next) => {
    try {
        const authorization = req.headers['authorization']
        if (!authorization) {
            throw new Error("Invalid Token")
        }
        const token = authorization.split(' ')[1]
        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        const user = await prisma.user.findFirst({
            where: {
                id
            }
        })
        if (!user) {
            throw new Error('Invalid Token')
        }
        req.currentUser = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        })
    }
}