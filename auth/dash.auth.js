module.exports = {
    ensureNotAuthenticated: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect("/users/dashboard");
    },
  };