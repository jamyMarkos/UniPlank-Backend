const Company = require("../models/Company");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Includes roles other than super_admin and customer
exports.registerUsersHandler = async (req, res) => {
  try {
    const { userId, userRole } = req;
    const { firstName, lastName, email, role } = req.body;

    if (role == "team_member" && !["admin", "customer"].includes(userRole)) {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient privileges" });
    }

    if (role == "admin" && !["customer"].includes(userRole)) {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient privileges" });
    }

    if (role == "worker" && !["super_admin"].includes(userRole)) {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient privileges" });
    }

    if (role == "customer") {
      return res.status(400).json({
        message: "Customers cannot be registered with this end point",
      });
    }

    defaultPassword = firstName + "@" + new Date().getFullYear();
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role,
    });

    if (role == "team_member" && userRole == "admin") {
      // Fetch the customer id from the admin
      try {
        const admin = await User.findOne({ where: { id: userId } });
        user.customer_id = admin.customer_id;
      } catch (error) {
        res.status(401).json({ message: "Invalid request header" });
      }
    }

    if (role == "admin") {
      user.customer_id = userId;
    }

    await user.save();

    res.status(201).json({ user });
  } catch (error) {
    console.log("object", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

exports.registerCustomerHandler = async (req, res) => {
  try {
    const { userId, userRole } = req;
    const {
      firstName,
      lastName,
      email,
      companyID,
      position,
      city,
      country,
      state,
      phone,
    } = req.body;

    if (userRole != "super_admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient privileges" });
    }

    const company = await User.findOne({ where: { id: companyID } });
    if (!company) {
      return res.status(400).json({ message: "Invalid company ID" });
    }

    defaultPassword = firstName + "@" + new Date().getFullYear();
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "customer",
      company_id: companyID,
      position,
      city,
      country,
      state,
      phoneNumber: phone,
    });

    await user.save();

    res.status(201).json({ user });
  } catch (error) {
    console.log("object", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// Handler to get all customers
exports.getAllCustomersHandler = async (req, res) => {
  try {
    const { userRole, userId } = req;

    const customers = await User.findAll({
      where: { role: "customer" },
      include: [
        {
          model: Company,
          as: "company", // Make sure the alias matches the one in the association
          attributes: ["id", "name"], // Specify which fields you want from the Company model
        },
      ],
    });
    res.status(200).json({ customers });
  } catch (error) {
    console.log("object", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// Handler to get a customer by ID
exports.getCustomerHandler = async (req, res) => {
  try {
    const { userRole, userId } = req;
    const { id } = req.params;

    const customer = await User.findOne({ where: { id, role: "customer" } });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ customer });
  } catch (error) {
    console.log("object", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// Handler to get all workers
exports.getAllWorkersHandler = async (req, res) => {
  try {
    const { userRole, userId } = req;

    const workers = await User.findAll({
      where: { role: "worker" },
    });
    res.status(200).json({ workers });
  } catch (error) {
    console.log("object", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// Get members of a given customer

exports.getCustomerMembersHandler = async (req, res) => {
  try {
    const { userId, userRole } = req;

    let members;

    if (userRole == "customer") {
      members = await User.findAll({ where: { customer_id: userId } });
    } else if (userRole == "admin") {
      // Fetch the admin user data to get the customer_id
      const adminUser = await User.findByPk(userId);

      if (!adminUser || !adminUser.customer_id) {
        return res
          .status(404)
          .json({ message: "Customer ID not found for the admin user" });
      }

      // Fetch members using the customer_id from the admin user
      members = await User.findAll({
        where: { customer_id: adminUser.customer_id },
      });
    } else {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    res.status(200).json({ members });
  } catch (error) {
    console.log("object", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};
