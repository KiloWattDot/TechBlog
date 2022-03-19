const router = require("express").Router();
const { User, Posts, Comments } = require("../../models");
const withAuth = require("../../utils/auth");
const bcrypt = require("bcrypt");
const { post } = require("../../models");

//CREATE NEW USER
router.post("/register", async (req, res) => {
  try {
    // User is giving information to create account.
    // CleanUser is for making sure user doesn't already exist
    const dbUserData = await User.create(req.body);
    const cleanUser = dbUserData.get({ plain: true });
    // Adding these attributes to the users session
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = cleanUser.id;
      req.session.username = cleanUser.username;
    });
    // Error for already taken username or email
    if (!cleanUser) {
      return res
        .status(404)
        .json({ message: "Email or Username already taken" });
    }
    res.status(200).json(cleanUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// User Login
// Check for valid user email and password along with setting loggedIn as true in session
router.post("/login", async (req, res) => {
  try {    
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    // Valid User email check
    if (!dbUserData) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password. Please Try again" });
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    // Valid Password check
    if (!validPassword) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password. Please Try again" });
    }

    // Session attribute loggedIn
    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// User creates a new Post
router.post("/post", withAuth, async (req, res) => {
  const newPost = await Posts.create({
    title: req.body.title,
    description: req.body.description,
  });

  res.status(200).json(newPost);
});


router.delete("/post/:id", withAuth, async (req, res) => {
    const newPost = await Takes.destroy({ 
        where: { id: req.params.id } });
    res.status(200).json(newPost);
  });
  

// User comment post
router.post("/comment", withAuth, async (req, res) => {
  try {
    const newComment = await Comments.create({
      description: req.body.description,
      username: "kilowattdot",
      post_id: req.body.post_id,
      // user_id: req.session.id
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});


// User logout and session destroyed
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
