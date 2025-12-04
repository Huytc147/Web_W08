import userM from "../models/user.m.js";
import bcrypt from "bcryptjs";

export const renderLogin = (req, res) => {
  res.render("auth/login", { layout: "auth" });
};

export const renderRegister = (req, res) => {
  res.render("auth/register", { layout: "auth" });
};

// Controller to handle user logout
export const getLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to logout" });
    }
    res.redirect("/auth/login");
  });
};

// Controller to handle user login
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Retrieve user by username
    const user = await userM.oneByUsername(username);

    if (!user) {
      return res.render("auth/login", {
        layout: "auth",
        error: "Invalid username or password",
      });
    }

    // Compare provided password with stored hashed password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.render("auth/login", {
        layout: "auth",
        error: "Invalid username or password",
      });
    }

    // Login success
    req.session.userId = user.id;
    // Handle "remember me" checkbox: set persistent cookie when requested
    if (req.body.remember) {
      // 30 days
      req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
    } else {
      // Session cookie (expires on browser close)
      req.session.cookie.maxAge = null;
    }
    res.render("auth/loginsuccess", {
      layout: "auth",
      user: {
        username: user.username,
        name: user.name,
        email: user.email,
        initials: user.name
          .split(" ")
          .map((n) => n.charAt(0).toUpperCase())
          .join(""),
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to handle user registration
export const postRegister = async (req, res) => {
  const { username, name, email, password } = req.body;
  try {
    // Check if username or email already exists
    const existingUser = await userM.oneByUsername(username);

    if (existingUser) {
      return res.render("auth/register", {
        layout: "auth",
        error: "Username already taken",
        form: {
          username,
          name,
          email,
        },
      });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create new user object
    const newUser = {
      username,
      name,
      email,
      password: hashedPassword,
    };

    // Add the new user to the database
    const id = await userM.add(newUser);

    // Registration success
    req.session.userId = id;
    res.render("auth/loginsuccess", {
      layout: "auth",
      user: {
        username: newUser.username,
        name: newUser.name,
        email: newUser.email,
        initials: newUser.name
          .split(" ")
          .map((n) => n.charAt(0).toUpperCase())
          .join(""),
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
