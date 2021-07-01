const withAuth = (req, res, next) => {
    if (!req.user) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;