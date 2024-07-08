const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.create = async (req, res) => {
    try {
        console.log("Controller called for Form creation.");
        const { user_id } = req.body;
        // const form = await prisma.form.
        const form = await prisma.form.create({
            data: {
                form_title: 'Untitled form',
                form_description: '',
                user_id: user_id
            }
        })

        console.log("form created: ", form);
        return res.status(201).json({
            success: true,
            message: "Form created successfully",
            form
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.getByUser = async (req, res) => {
    try {
        console.log("SERVER SIDE - Came inside getByUser ");
        console.log("SERVER SIDE - User details given by middleware: ", req.currentUser);
        const forms = await prisma.form.findMany({
            where:{
                user_id : req.currentUser.id
            }
        })
        console.log("Forms found for user: ", forms);
        return res.status(200).json({
            success: true,
            forms
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}