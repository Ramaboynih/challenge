const { UserHistory } = require("../models");

module.exports = {
    create: async(req, res) => {
        try {
            const { score } = req.body;
            const user = req.user;
            const created = await UserHistory.create({
                username: user.username,
                score,
                user_id: user.id,
            });
            return res.status(200).json({
                status: true,
                message: "Score Saved",
                data: created,
            });
        } catch (error) {
            console.log(error.message);
        }
    },
    index: async(req, res) => {
        try {
            const showAll = await UserHistory.findAll();
            return res.status(200).json({
                status: true,
                message: "Success Get All Data",
                data: showAll,
            });
        } catch (error) {
            console.log(error.message);
        }
    },
};