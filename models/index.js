const User = require('./User');
const Event = require('./Event');
const Category = require('./Category');
const Participants = require('./Participants');

User.hasMany(Event, {
    foreignKey: 'owner_id',
    onDelete: 'CASCADE',
});

Event.belongsTo(User, {
    foreignKey: 'owner_id',
});

Category.hasMany(Event, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE',
});

User.belongsToMany(Event, {
    through: 'participants',
    unique: false,
    foreignKey: "user_id",
    as: 'joined'
});

Event.belongsToMany(User, {
    through: 'participants',
    unique: false,
    onDelete: "CASCADE",
    foreignKey: "event_id",
    as: 'participant'

});

module.exports = { Event, User, Category, Participants };