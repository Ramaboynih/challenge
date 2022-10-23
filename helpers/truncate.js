const { User } = require("../models");
const { UserBio } = require("../models");
const { UserHistory } = require("../models");

//
module.exports = {
    user: async() => {
        await User.destroy({ truncate: true, restartIdentity: true });
    },
    userBio: async() => {
        await UserBio.destroy({ truncate: true, restartIdentity: true });
    },
    userHistory: async() => {
        await UserHistory.destroy({ truncate: true, restartIdentity: true });
    },
    userBioDelete: async() => {
        await UserBio.destroy({ where: { id: 1 } });
    },
    userBioAdd: async() => {
        await UserBio.create({
            username: "userTest",
            bio: "Bio Test",
            user_id: 1,
        });
    },
};