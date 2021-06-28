const sequelize = require("../config/connection");
const Category = require("../models/Category");
const User = require("../models/User");
const Event = require('../models/Event');
const Participants = require('../models/Participants');
const categoryData = require("./categoryData.json");
const eventData = require("./eventData.json");
const userData = require("./userData.json");
const participants = require('./participants.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Category.bulkCreate(categoryData);
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  await Event.bulkCreate(eventData);
  await Participants.bulkCreate(participants);
  

  process.exit(0);
};

seedDatabase();
