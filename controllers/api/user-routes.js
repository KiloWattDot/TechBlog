const router = require('express').Router();
const { User } = require('../../models')

//CREATE NEW USER
router.post('/register', async (res, req) => {

    try {
        // User is giving information to create account. 
        // CleanUser is for making sure user doesn't already exist
        const dbUserData = await User.create(req.body);
        const cleanUser = dbUserData.get({plain: true});
        // Adding these attributes to the users session
        req.session.save(() => {
            req.session.loggedIn = true
            req.session.user_id = cleanUser.id;
            req.session.username = cleanUser.username;

        });
        // Error for already taken username or email
        if(!cleanUser) {
            return res.status(404).json({message: 'Email or Username already taken'})
        }
        res.status(200).json(cleanUser);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.post('/login', async (req, res) => {
    try {
        const dbUserdata = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (!dbUserdata) {
            return res.status(400).json({message: 'Incorrect email or password. Please Try again'})
        }
        req.session.save(() => { 
          req.session.loggedIn = true  

        });

        res.status(200);

        const validPassword = await bcrypt.
        
        
    }
})