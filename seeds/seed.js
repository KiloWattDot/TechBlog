const sequelize = require('../config/connection');
const { User, Posts, Comments } = require('../models')


const userSeeds = require('./userSeeds.json')
const postSeeds = require('./postSeeds.json')
const commentSeeds = require('./commentSeeds.json')

const seedDatabase = async () => {
    await sequelize.sync({ force: true})

    await User.bulkCreate(userSeeds , {
        individualHooks: true,
        returning: true,
    });

    await Posts.bulkCreate(postSeeds , {
        individualHooks: true,
        returning: true,
    });

    await Comments.bulkCreate(commentSeeds , {
        individualHooks: true,
        returning: true,
    });


    process.exit(0)
}

seedDatabase();