module.exports = {
    ensureAuthenticated: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect("/users/login");
    },

    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      }
      next()
    },

    ensureNotAuthenticated: function (req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect("/users/dashboard");
    }
  };
  