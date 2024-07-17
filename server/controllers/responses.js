const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getForm = async (req, res) => {
    try {
        if (req.params.id === '' || req.params.id === undefined) {
            throw new Error('Something went wrong')
        }
        const form = await prisma.form.findUnique({
            where: { form_uuid: req.params.id },
            include: {
                questions: {
                    include: {
                        options: true
                    }
                }
            }
        });
        return res.status(200).json({
            success: true,
            form
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
exports.saveResponse = async (req, res) => {
    try {
        const { formId, answers } = req.body;
        const response = await prisma.response.create({
            data: {
                response_data: answers,
                form_id: formId
            }
        })
        return res.status(200).json({
            success: true,
            response
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
exports.getAnswers = async (req, res) => {
    try {
        const { id } = req.params;
        if (req.params.id === '' || req.params.id === undefined) {
            throw new Error('Something went wrong')
        }
        const answers = await prisma.response.findMany({
            where: {
                form_id: Number(id)
            }
        })
        return res.status(200).json({
            success: true,
            answers
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}