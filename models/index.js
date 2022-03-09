const User = require('./User');
const Posts = require('./Posts');
const Comments = require('./Comments');


User.hasMany(Posts, {
    foreignKey: 'username',
    onDelete: 'CASCADE'
});

Posts.hasMany(Comments, {
    foreignKey: 'post_id',
    onDelete:'CASCADE'
})

Comments.belongsTo(Posts, {
    foreignKey: 'post_id',
});


module.exports = { User, Posts, Comments};