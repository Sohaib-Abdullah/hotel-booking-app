export const WellComeUser = async (req, res, next) => {
  res.status(200).json({ message: "Welcome to our API!" });
};
