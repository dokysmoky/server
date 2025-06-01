const db = require("../db"); // however you connect to your database

exports.submitReport = async (req, res) => {
  const {
    user_id,
    product_id,
    comment_id,
    reported_user_id,
    report_reason,
    report_date,
  } = req.body;

  try {
    await db.query(
      `INSERT INTO report (user_id, product_id, comment_id, reported_user_id, report_reason, report_date)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [user_id, product_id, comment_id, reported_user_id, report_reason, report_date]
    );

    res.status(201).json({ message: "Report submitted successfully" });
  } catch (err) {
    console.error("Error submitting report:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
