const Company = require("../models/Company");

exports.GetCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.status(200).json({ companies });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.GetCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findOne({ where: { id } });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json({ company });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.CreateCompany = async (req, res) => {
  try {
    const { name } = req.body;
    const company = await Company.create({ name });
    res.status(201).json({ company });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.UpdateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const company = await Company.findOne({ where: { id } });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    company.name = name;
    await company.save();
    res.status(200).json({ company });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
