const { UserBio } = require("../models");
module.exports = {
  create: async (req, res, next) => {
    try {
      // const user = req.user;
      const { username, bio, user_id } = req.body;
      const created = await UserBio.findOne({
        where: { username: username },
      });

      if (created) {
        return res.status(400).json({
          status: false,
          message: "You've Already Created a Bio",
          data: null,
        });
      }
      const create = await UserBio.create({
        username,
        bio,
        user_id,
      });
      return res.status(201).json({
        status: true,
        message: "Bio Created",
        data: create,
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      //   const user = req.user;
      const { user_id, bio } = req.body;
      const created = await UserBio.findOne({
        where: { user_id: user_id },
      });
      if (!created) {
        return res.status(400).json({
          status: false,
          message: "You've Haven't Created Bio Yet",
          data: null,
        });
      }

      const updated = await UserBio.update(
        {
          bio: bio,
        },
        {
          where: {
            user_id: user_id,
          },
        }
      );

      const updateSuccess = await UserBio.findOne({
        where: { user_id: user_id },
      });

      return res.status(200).json({
        status: true,
        message: "Bio Updated",
        data: {
          bio: updateSuccess.bio,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  index: async (req, res, next) => {
    try {
      const findAll = await UserBio.findAll();
      return res.status(200).json({
        status: true,
        message: "Success Get All Data",
        data: findAll,
      });
    } catch (error) {
      next(error);
    }
  },
  show: async (req, res, next) => {
    try {
      const { id } = req.params;

      const found = await UserBio.findOne({ where: { id: id } });
      if (!found) {
        return res.status(200).json({
          status: true,
          message: "Data Not Exist",
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: "Success Get Data",
        data: found,
      });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const user = req.user;

      const deleted = await UserBio.destroy({ where: { user_id: user.id } });

      return res.status(200).json({
        status: true,
        message: "Success Delete Data",
        data: deleted,
      });
    } catch (error) {
      next(error);
    }
  },
};
