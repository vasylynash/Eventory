const authConfig = require('./src/auth/authConfig');
const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// handlebars engine
const handlebars = require('express-handlebars');

app.set('view engine', 'hbs');

app.engine('hbs', handlebars({
  layoutsDir: `${__dirname}/views/layouts`,
  extname: 'hbs',
  partialsDir:`${__dirname}/views/partials`,
  helpers: require('./utils/helpers'),
}));

const sess = {
  secret: process.env.SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.use(authConfig.initialize());
app.use(authConfig.session());

/* Middleware that registers user global variable for the request (to make it available in handlebars)
Must be after passport middleware
*/
app.use(function (req, res, next) {
  if (req.user) {
    res.locals.currentUser = req.user.get({ plain: true });
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
