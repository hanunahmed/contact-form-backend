const db = require("../database/db");

const submitContact = async (req, res) => {
  try {
    const { name, email } = req.body;

    await db.execute(
      "INSERT INTO contacts (name, email) VALUES (?, ?)",
      [name, email]
    );

    res.status(201).json({
      success: true,
      message: "Contact saved successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getContacts = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM contacts ORDER BY id DESC"
    );

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  submitContact,
  getContacts
};

