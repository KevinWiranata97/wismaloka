const { comparePass } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { imageKit } = require("../middlewares/imgKitMulter");
const { User, UserHouse } = require("../models/index");
const snap = require("../helpers/midtrans");

class UserController {
  //Register Admin
  static async adminRegister(req, res, next) {
    try {
      const { username, email, password, phoneNumber } = req.body;

      if (req.file) {
        const { buffer, originalname } = req.file;
        const result = await imageKit(buffer, originalname);
        const profilePict = result.data.url;
        const newUser = await User.create({
          username,
          email,
          password,
          phoneNumber,
          profilePict,
          role: "Admin",
          isPremium: true,
        });

        await UserHouse.create({
          UserId: newUser.id,
        });

        res.status(201).json({
          Code: 201,
          data: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
          },
        });
      } else {
        const newUser = await User.create({
          username,
          email,
          password,
          phoneNumber,
          role: "Admin",
          isPremium: true,
        });

        await UserHouse.create({
          UserId: newUser.id,
        });

        res.status(201).json({
          Code: 201,
          data: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
          },
        });
      }
    } catch (error) {
      next(error);
    }
  }

  //Register Agen
  static async agenRegister(req, res, next) {
    try {
      const { username, email, password, phoneNumber } = req.body;
      if (req.file) {
        const { buffer, originalname } = req.file;

        const result = await imageKit(buffer, originalname);
        const profilePict = result.data.url;

        const newUser = await User.create({
          username,
          email,
          password,
          phoneNumber,
          profilePict,
          role: "Agen",
          isPremium: false,
        });

        await UserHouse.create({
          UserId: newUser.id,
        });

        res.status(201).json({
          Code: 201,
          data: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
          },
        });
      } else {
        const newUser = await User.create({
          username,
          email,
          password,
          phoneNumber,
          role: "Agen",
          isPremium: false,
        });

        await UserHouse.create({
          UserId: newUser.id,
        });

        res.status(201).json({
          Code: 201,
          data: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
          },
        });
      }
    } catch (error) {
      next(error);
    }
  }

  //Register User
  static async userRegister(req, res, next) {
    try {
      const { username, email, password, phoneNumber } = req.body;

      if (req.file) {
        const { buffer, originalname } = req.file;
        const result = await imageKit(buffer, originalname);
        const profilePict = result.data.url;

        const newUser = await User.create({
          username,
          email,
          password,
          phoneNumber,
          profilePict,
          role: "User",
          isPremium: false,
        });

        await UserHouse.create({
          UserId: newUser.id,
        });

        res.status(201).json({
          Code: 201,
          data: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
          },
        });
      } else {
        const newUser = await User.create({
          username,
          email,
          password,
          phoneNumber,
          role: "User",
          isPremium: false,
        });

        await UserHouse.create({
          UserId: newUser.id,
        });

        res.status(201).json({
          Code: 201,
          data: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
          },
        });
      }
    } catch (error) {
      next(error);
    }
  }

  //Login
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const getUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!email) {
        throw { name: "Email is required" };
      }
      if (!password) {
        throw { name: "Password is required" };
      }

      if (!getUser) {
        throw { name: "401" };
      }
      const getValidUser = comparePass(password, getUser.password);

      if (!getValidUser) {
        throw { name: "401" };
      }

      const payload = { id: getUser.id };
      const token = createToken(payload);

      res.status(200).json({
        Code: 200,
        access_token: token,
        id: getUser.id,
        role: getUser.role,
        name: getUser.username,
        isPremium: getUser.isPremium,
        profilePict: getUser.profilePict,
      });
    } catch (error) {
      next(error);
    }
  }

  //get data user
  static async fetchUser(req, res, next) {
    try {
      const getUser = await User.findAll({
        attributes: { exclude: ["password"] },
      });

      if (getUser.length === 0) {
        throw { name: "Data not found" };
      }

      res.status(200).json({
        Code: 200,
        data: getUser,
      });
    } catch (error) {
      next(error);
    }
  }

  static async fetchOneUser(req, res, next) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
      });
      if (user <= 0) {
        throw { name: "Data not found" };
      }
      res.status(200).json({
        Code: 200,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;

      const getUser = await User.findByPk(id);
      if (!getUser) {
        throw { name: "Data not found" };
      }

      await User.destroy({ where: { id } });

      res.status(200).json({
        Code: 200,
        msg: `delete user with id ${id} success`,
      });
    } catch (error) {
      next(error);
    }
  }

  //midtrans
  static async payment(req, res, next) {
    let parameter = {
      transaction_details: {
        order_id: Math.floor(Math.random() * 100000),
        gross_amount: 200000,
      },
      credit_card: {
        secure: true,
      },
    };

    const trx = await snap.createTransaction(parameter);
    res.status(201).json({
      token: trx.token,
      redirect_url: trx.redirect_url,
    });
  }

  static async premiumUser(req, res, next) {
    const { id } = req.user;

    await User.update({ isPremium: true }, { where: { id } });

    res.status(200).json({
      message: "congrats, your account is premium",
    });
  }
}

module.exports = UserController;
