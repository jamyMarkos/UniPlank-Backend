exports.authorizeRole = (roleNames) => {
  return (req, res, next) => {
    if (!roleNames.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient privileges" });
    }
    next();
  };
};
