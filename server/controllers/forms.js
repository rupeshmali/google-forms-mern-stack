const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { v4: uuidv4 } = require('uuid');


exports.create = async (req, res) => {
    try {
        const { user_id } = req.body;
        const uuid = uuidv4();
        const form = await prisma.form.create({
            data: {
                form_title: 'Untitled form',
                form_description: '',
                user_id: user_id,
                form_uuid: uuid
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
        const forms = await prisma.user.findUnique({
            where: { id: req.currentUser.id },
            include: {
                forms: {
                    include: {
                        questions: {
                            include: {
                                options: true
                            }
                        }
                    }
                }
            }
        });
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
    const { title, description } = req.body;
    console.log("Came in update contoller.");
    console.log("req. body received: ", req.body);
    try {

        let updatedForm;
        if (title !== undefined && title.trim() !== '') {
            updatedForm = await prisma.form.update({
                where: { form_id: parseInt(id, 10) },
                data: {
                    form_title: title || 'Untitled',
                },
            });
        }

        if (description !== undefined && description.trim() !== '') {
            updatedForm = await prisma.form.update({
                where: { form_id: parseInt(id, 10) },
                data: {
                    form_description: description || '',
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

exports.addQuestion = async (req, res) => {
    console.log("INSIDE ADDQUESTIONS");
    const { id } = req.params;
    const question = req.body;

    try {
        console.log("FORM ID received: ", id);
        console.log("QUESTIONS body received in server side: ", JSON.stringify(question, null, 2));

        if(question.text===''){
            throw new Error('Question can not be blank.')
        }

        const response = await prisma.$transaction(async (prisma) => {
            if (!Array.isArray(question.options)) {
                throw new Error(`Options for question "${question.question}" are not an array`);
            }
            const createdQuestion = await prisma.question.create({
                data: {
                    question_text: question.text,
                    question_required: question.required,
                    question_type: question.type,
                    form_id: Number(id)
                },
            });

            for (const option of question.options) {
                console.log("Contoller: option: ", option);
                if (!(option === '')) {
                    await prisma.option.create({
                        data: {
                            option_text: option,
                            question_id: createdQuestion.question_id,
                        },
                    });
                }
            }
        }
        );

        return res.status(200).json({
            success: true,
            response
        });
    } catch (error) {
        console.error("Error adding questions:", error.message);
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
