exports.getUsers = async (req, res) => {

}

exports.getUser = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            user: req.currentUser
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}