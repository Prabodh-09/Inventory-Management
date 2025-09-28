const Container = require('../models/Container');

// Get all containers
exports.getContainers = async (req, res) => {
  try {
    const containers = await Container.find();
    res.json(containers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new container
exports.addContainer = async (req, res) => {
  try {
    const newContainer = new Container(req.body);
    const saved = await newContainer.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a container
exports.updateContainer = async (req, res) => {
  try {
    const updated = await Container.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a container
exports.deleteContainer = async (req, res) => {
  try {
    await Container.findByIdAndDelete(req.params.id);
    res.json({ message: 'Container deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
