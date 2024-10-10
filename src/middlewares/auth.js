const adminAuth = (req, res, next) => {
  const token = "xyz";
  const isAdminAuthorised = token === "xy";
  if (!isAdminAuthorised) {
    res.status(401).send("Unauthorized Request");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  const token = "xyz";
  const isAdminAuthorised = token === "xy";
  if (!isAdminAuthorised) {
    res.status(401).send("Unauthorized Request");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
