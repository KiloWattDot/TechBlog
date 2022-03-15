const sequelize = require('../config/connection');
const { User, Posts } = require('../models')


const userSeeds = require('./userSeeds.json')
const postSeeds = require('./postSeeds.json')

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

    process.exit(0)
}

seedDatabase();