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