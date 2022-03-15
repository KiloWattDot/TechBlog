const router = require('express').Router();
const { User, Posts, Comments } = require('../models')
const withAuth = require('../utils/auth')
const bcrypt = require('bcrypt');
const { post } = require('./api/user-routes');
const res = require('express/lib/response');

// Render Homepage, countvisit within session,
router.get('/', async (req, res) => {
    // req.session.save(() => {
    //     if (req.session.countVisit) { 
    //         req.session.countVisit++ 
    //     }  req.session.countVisit = 1 
    // })

    try {
        const dbPostData = await Posts.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comments,
                    attributes: ['description']
                }
            ]

        })

        const allPost = dbPostData.map((post) =>
            post.get({plain: true})    
        );
        console.log(allPost)
        res.render('homepage', {
            allPost,
            // loggedIn: req.session.loggedIn,
            // countVisit: req.session.countVisit,
        
        })
    } catch (err) { 
        console.log(err)
        res.status(500).json(err)
    }
})


router.get('/register', async (req, res) => {
    try {
        res.render('register', {
            loggedIn: req.session.loggedIn
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})



router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
});
  

module.exports = router;