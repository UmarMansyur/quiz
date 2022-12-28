require("dotenv").config();
const { user_game, user_game_biodata } = require("../models");
const { QueryTypes, where } = require("sequelize");
const googleOauth2 = require('../utils/oauth2/google')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const roles = require('../utils/roles');
const userType = require('../utils/userTypes');

module.exports = {
  register: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const existUser = await user_game.findOne({ where: { email } });
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
        email,
        role: roles.user,
        userType: userType.basic,
        password: encryptedPassword,
      });

      const detailUser = await user_game_biodata.create({
        user_id: user.id,
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
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const user = await user_game.authenticate(req.body);
      const access_token = user.generateToken();
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
          email: user.email,
          role: user.role,
          token: access_token,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  saya: async (req, res, next) => {
    try {


      const user = await user_game_biodata.findOne(
        {
          include: [
            {
              model: user_game,
              as: "user",
              where: {
                email: req.user.email
              }
            },
          ],
        },
        {
          where: {
            user_id: req.user.id
          }
        }
      );
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
      let userExist = await user_game.findOne({ where: { email: data.email } });

      if (!userExist) {
        userExist = await user_game.create({
          email: data.email,
          role: roles.user,
          userType: userType.google
        });
        detailUser = await user_game_biodata.create({
          user_id: userExist.id,
          nama: data.name,
          thumbnail: data.picture
        })
      } else {
        await user_game_biodata.update({
          thumbnail: data.picture
        }, {
          where: {
            user_id: userExist.id
          }
        })
      };

      const response = await user_game_biodata.findOne({
        include: [
          {
            model: user_game,
            as: 'user',
            where: {
              id: userExist.id
            }
          }
        ]
      });

      const payload = {
        id: userExist.id,
        email: userExist.email,
        role: userExist.role,
      };

      const token =  jwt.sign(payload, process.env.JWT_SECRET)

      return res.status(200).json({
        status: true,
        message: "Data Retrived Successfully",
        data: token
      })
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
      res.send(userInfo);
    } catch (err) {
      next(err);
    }
  },
};
