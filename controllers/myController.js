const userModel = require("../models/myModel.js");
const jwt = require("jsonwebtoken");
const jwtAge = 300;
const regName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
const regEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gim;

class myController {
  static home = (req, res) => {
    const user = req.user;
    if (user) {
      res.redirect(`/:${user.username}`);
    } else {
      res.render("home", { title: "facebook" });
    }
  };

  static signup = (req, res) => {
    const user = req.user;
    if (user) {
      res.redirect(`/:${user.username}`);
    } else {
      res.render("signup", { title: "Sign up", error: "" });
    }
  };

  static signingup = async (req, res) => {
    try {
      const data = req.body;
      const { name, username, email, password, tc } = data;
      if (name && username && email && password && tc) {
        const uName = await userModel.findOne({ username });
        const eMail = await userModel.findOne({ email });
        if (regName.test(name)) {
          if (username.length > 5) {
            if (regEmail.test(email)) {
              if (password.length > 6) {
                if (uName == null) {
                  if (eMail == null) {
                    const newDoc = userModel({
                      name: name,
                      username: username,
                      email: email,
                      password: password,
                      status: true,
                    });
                    const result = await newDoc.save();
                    const token = jwt.sign(
                      { userID: result._id },
                      process.env.JWT_SECRET_KEY,
                      { expiresIn: "5d" }
                    );
                    res.cookie("token", token);
                    res.redirect(`/${result.username}`);
                  } else {
                    res.render("signup", {
                      title: "Sign up",
                      error: "Email already registered",
                    });
                  }
                } else {
                  res.render("signup", {
                    title: "Sign up",
                    error: "Username not available",
                  });
                }
              } else {
                res.render("signup", {
                  title: "Sign up",
                  error: "Password should be at 6 characters",
                });
              }
            } else {
              res.render("signup", {
                title: "Sign up",
                error: "Email is not valid",
              });
            }
          } else {
            res.render("signup", {
              title: "Sign up",
              error: "Username should be valid and at least 6 characters",
            });
          }
        } else {
          res.render("signup", {
            title: "Sign up",
            error: "Name should be valid and at least 4 characters",
          });
        }
      } else {
        res.render("signup", {
          title: "Sign up",
          error: "All fields are mandatory",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  static signin = (req, res) => {
    const user = req.user;
    if (user) {
      res.redirect(`/:${user.username}`);
    } else {
      res.render("login", { title: "Sign in", error: "" });
    }
  };

  static signingin = async (req, res) => {
    try {
      const { username, password } = req.body;
      const userPass = await userModel.findOne({ username });
      console.log(userPass);
      if (password === userPass.password) {
        const token = jwt.sign(
          { userID: userPass._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "5d" }
        );
        res.cookie("token", token);
        res.redirect(`/${userPass.username}`);
      } else {
        res.render("login", {
          title: "Sign in",
          error: "Username or password is incorrect",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  static dashboard = (req, res) => {
    const user = req.user;
    if (user) {
      res.render("dashboard", { title: "Hello", user: user.username });
    } else {
      res.redirect("/");
    }
  };

  static signout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/sign-in");
  };
}

module.exports = { myController };
