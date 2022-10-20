const auth = require("./auth");
const user_bio = require("./userbio");
const userHistory = require("./userHistory");
module.exports = {
    exception: (err, req, res, next) => {
        res.render("server-error", { error: err.message });
    },
    notFound: (req, res, next) => {
        res.render("not-found");
    },
    auth,
    user_bio,
    userHistory,
};