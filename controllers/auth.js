require("dotenv").config();
const { user_game } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = {
  register: async (req, res, next) => {
    try {
      const { name, password } = req.body;
      const existUser = await user_game.findOne({ where: { username: name } });
      if (existUser) {
        return res.status(422).json({
          jsonapi: {
            version: "1.0",
          },
          meta: {
            author: "Muhammad Umar Mansyur",
            copyright: "2022 ~ BE JavaScript Binar Academy",
          },
          status: 422,
          message: "Name already exist",
        });
      }
      const encryptedPassword = await bcrypt.hash(password, 10);
      const user = await user_game.create({
        username: name,
        password: encryptedPassword,
      });
      return res.status(201).json({
        jsonapi: {
          version: "1.0",
        },
        meta: {
          author: "Muhammad Umar Mansyur",
          copyright: "2022 ~ BE JavaScript Binar Academy",
        },
        status: 201,
        message: "Data berhasil ditambahkan",
        data: {
          username: user.username,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { name, password } = req.body;
      const user = await user_game.findOne({ where: { username: name } });
      if (!user) {
        return res.status(404).json({
          jsonapi: {
            version: "1.0",
          },
          meta: {
            author: "Muhammad Umar Mansyur",
            copyright: "2022 ~ BE JavaScript Binar Academy",
          },
          status: 404,
          message: "User not found",
        });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          jsonapi: {
            version: "1.0",
          },
          meta: {
            author: "Muhammad Umar Mansyur",
            copyright: "2022 ~ BE JavaScript Binar Academy",
          },
          status: 401,
          message: "Password is not valid",
        });
      }
      let payload = {
        id: user.id,
        username: user.username,
        password: user.password,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.status(200).json({
        jsonapi: {
          version: "1.0",
        },
        meta: {
          author: "Muhammad Umar Mansyur",
          copyright: "2022 ~ BE JavaScript Binar Academy",
        },
        status: 200,
        message: "Login success",
        data: {
          id: user.id,
          accessToken: token,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  saya: (req, res, next) => {
    const user = req.user_game;
    try {
      const result = {
        jsonapi: {
          version: "1.0",
        },
        meta: {
          author: "Muhammad Umar Mansyur",
          copyright: "2022 ~ BE JavaScript Binar Academy",
        },
        status: 200,
        message: "Success",
        data: user,
      };
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
  loginGoogle: async (req, res, next) => {
    try {
      const code = req.query.code;
      if (!code) {
        const url = googleOauth2.generateAuthURL();
        return res.redirect(url);
      }

      await googleOauth2.setCredentials(code);
      const { data } = await googleOauth2.getUserData();
      // kolom password jika login menggunakan google jadikan tempat email
      let userExist = await User.findOne({ where: { email: data.password } });
      let exist = false;
      if (!userExist) {
        userExist = await user_game.create({
          username: data.name,
          password: data.email,
        });
      } else {
        exist = true;
        userExist = await User.update(
          {
            name: data.name,
            password: data.email,
          },
          { where: { password: data.password }, returning: true }
        );
      }
      return res.status(200).json({
        data: exist == true ? userExist[1][0] : userExist,
      });
    } catch (err) {
      next(err);
    }
  },

  loginFacebook: async (req, res, next) => {
    try {
      const code = req.query.code;
      if (!code) {
        const url = facebookOauth2.generateAuthURL();
        return res.redirect(url);
      }
      const access_token = await facebookOauth2.getAccessToken(code);
      const userInfo = await facebookOauth2.getUserInfo(access_token);
      console.log(userInfo.picture.data.url);
      res.send(userInfo);
    } catch (err) {
      next(err);
    }
  },
};
