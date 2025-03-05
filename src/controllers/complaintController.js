const express = require("express");
const Complaint = require("../models/Complaint");
const mongoose = require("mongoose");
const router = express.Router();

const ADMIN_EMAIL = "admin@admin.com";

// Create Complaint (User)
router.post("/", async (req, res) => {
  try {
    const { username, email, subject, description } = req.body;
    if (!username || !email || !subject || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const complaint = new Complaint({ username, email, subject, description });
    await complaint.save();
    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ error: "Error creating complaint" });
  }
});

// Modify Complaint (User)
router.put("/:id", async (req, res) => {
  try {
    const { email, subject, description } = req.body;
    if (!email || !subject || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const complaint = await Complaint.findOne({ _id: req.params.id });
    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    // Ensure that only the complaint owner can update it
    if (complaint.email !== email) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    complaint.subject = subject;
    complaint.description = description;
    const updatedComplaint = await complaint.save();

    res.json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ error: "Error updating complaint" });
  }
});


// Delete Complaint (User)
router.delete("/:id", async (req, res) => {
  try {
    const { email } = req.body;
    const complaint = await Complaint.findOneAndDelete({ _id: req.params.id, email });
    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found or unauthorized" });
    }
    res.json({ message: "Complaint deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting complaint" });
  }
});

router.post("/user", async (req, res) => { // Change from GET to POST
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const userComplaints = await Complaint.find({ email });
    if (userComplaints.length === 0) {
      return res.status(404).json({ error: "No complaints found for this user" });
    }
    res.status(200).json(userComplaints);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user complaints" });
  }
});


// Get All Complaints (Admin Only)
router.get("/admin/all", async (req, res) => {
  try {
    const email = req.query.email;  // ✅ Change from req.body.email to req.query.email
    if (email !== ADMIN_EMAIL) {
      return res.status(403).json({ error: "Unauthorized access" });
    }
    const allComplaints = await Complaint.find();
    res.status(200).json(allComplaints);
  } catch (error) {
    res.status(500).json({ error: "Error fetching all complaints" });
  }
});


// Add Reply (Admin Only)
router.patch("/reply/:id", async (req, res) => {
  try {
    const { email, reply } = req.body;
    if (email !== ADMIN_EMAIL) {
      return res.status(403).json({ error: "Unauthorized access" });
    }
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { reply },
      { new: true }
    );
    if (!updatedComplaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }
    res.json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ error: "Error adding reply" });
  }
});

module.exports = router;