const sequelize = require("../config/connection");
const categoryData = require("./categoryData.json");
const eventData = require("./eventData.json");
const userData = require("./userData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Category.bulkCreate(categoryData);
  await Event.bulkCreate(eventData);
  await User.bulkCreate(userData);

  process.exit(0);
};

seedDatabase();
