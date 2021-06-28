const User = require('./User');
const Event = require('./Event');
const Category = require('./Category');

User.hasMany(Event, {
    foreignKey: 'owner_id',
    onDelete: 'CASCADE',
});

Event.belongsTo(User, {
    foreignKey: 'owner_id',
});

Event.hasOne(Category, {
    foreignKey: 'category_id',
});

Category.hasMany(Event, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE',
});

User.belongsToMany(Event, {
    through: "Participants",
    unique: false,
    foreignKey: "user_id",
});

Event.belongsToMany(User, {
    through: "Participants",
    unique: false,
    onDelete: "CASCADE",
    foreignKey: "event_id",
})