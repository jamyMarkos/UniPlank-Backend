exports.authorizeRole = (roleName) => {
  return (req, res, next) => {
    if (req.user.role !== roleName) {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient privileges" });
    }
    next();
  };
};
