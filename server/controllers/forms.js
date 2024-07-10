const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.create = async (req, res) => {
    try {
        const { user_id } = req.body;
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
        const forms = await prisma.form.findMany({
            where: {
                user_id: req.currentUser.id
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

exports.update = async (req, res) => {
    const { id } = req.params;
    const { form_title, form_description } = req.body;

    try {

        let updatedForm;
        if (form_title !== undefined && form_title.trim() !== '') {
            updatedForm = await prisma.form.update({
                where: { form_id: parseInt(id, 10) },
                data: {
                    form_title: form_title || 'Untitled', // Only update the form_title field
                },
            });
        }

        if (form_description !== undefined && form_description.trim() !== '') {
            updatedForm = await prisma.form.update({
                where: { form_id: parseInt(id, 10) },
                data: {
                    form_description: form_description || '',
                },
            });
        }

        return res.status(200).json({
            success: true,
            updatedForm
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

exports.addQuestions = (req, res) => {
    const { questions } = req.body;
    try {
        
    } catch (error) {

    }
}