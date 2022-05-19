const { comparePass } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { imageKit } = require("../middlewares/imgKitMulter");
const { User, UserHouse } = require("../models/index");

class UserController {
  //Register Admin
  static async adminRegister(req, res, next) {
    try {
     
      const { username, email, password, phoneNumber, isPremium } = req.body;

      // console.log(req.body, "======");
      if (req.file) {
        const { buffer, originalname } = req.file;
        // console.log(req.file, "<<<<<<");
        const result = await imageKit(buffer, originalname);
        const profilePict = result.data.url;
        const newUser = await User.create({
          username,
          email,
          password,
          phoneNumber,
          profilePict,
          role: "Admin",
          isPremium,
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
          },
        });
      } else {
        const newUser = await User.create({
          username,
          email,
          password,
          phoneNumber,
          role: "Admin",
          isPremium,
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

      // console.log(result.data, "++++++");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  //Register Agen
  static async agenRegister(req, res, next) {
    try {
      const { username, email, password, phoneNumber, isPremium } = req.body;
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
          isPremium,
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
          },
        });
      } else{
        const newUser = await User.create({
          username,
          email,
          password,
          phoneNumber,
          role: "Agen",
          isPremium,
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
      console.log(error);
      next(error);
    }
  }

  //Register User
  static async userRegister(req, res, next) {
    try {
      const { username, email, password, phoneNumber, isPremium } = req.body;

      if(req.file){
        const { buffer, originalname } = req.file;
        // console.log(req.file, "<<<<<<");
        const result = await imageKit(buffer, originalname);
        const profilePict = result.data.url;
  
        const newUser = await User.create({
          username,
          email,
          password,
          phoneNumber,
          profilePict,
          role: "User",
          isPremium,
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
          },
        });
      }else{
        const newUser = await User.create({
          username,
          email,
          password,
          phoneNumber,
          role: "User",
          isPremium,
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
            role: newUser.role
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
      });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  //get data user
  static async fetchUser(req, res, next) {
    try {
      const getUser = await User.findAll({
        attributes: { exclude: ["password"] },
      });

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
      console.log(error);
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;

      const getUser = await User.findByPk(id);
      if (getUser <= 0) {
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
}

module.exports = UserController;
