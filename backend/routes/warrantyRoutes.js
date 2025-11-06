import express from 'express';
import Warranty from '../models/Warranty.js';

const router = express.Router();

// Create a new warranty
router.post('/warranties', async (req, res) => {
  try {
    const warranty = new Warranty(req.body);
    await warranty.save();
    res.status(201).send(warranty);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all warranties with filtering and sorting
router.get('/warranties', async (req, res) => {
  try {
    const { fiscalCode, companyName, sortBy } = req.query;

    // Build the filter object
    const filter = {};
    if (fiscalCode)
      filter.fiscalCode = fiscalCode;
    if (companyName)
      filter.companyName = { $regex: companyName, $options: 'i' }; // Case-insensitive search

    // Build the sort object
    const sort = {};
    if (sortBy) {
      const sortFields = sortBy.split(','); // e.g., "scadentDate,-totalAmount"
      sortFields.forEach((field) => {
        if (field.startsWith('-')) {
          sort[field.slice(1)] = -1; // Descending order
        } else {
          sort[field] = 1; // Ascending order
        }
      });
    }

    // Query the database with filter and sort
    const warranties = await Warranty.find(filter).sort(sort);
    res.status(200).send(warranties);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a warranty by ID
router.get('/warranties/:id', async (req, res) => {
  try {
    const warranty = await Warranty.findById(req.params.id);
    if (!warranty) {
      return res.status(404).send();
    }
    res.status(200).send(warranty);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a warranty by ID
router.patch('/warranties/:id', async (req, res) => {
  try {
    const warranty = await Warranty.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!warranty) {
      return res.status(404).send();
    }
    res.status(200).send(warranty);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a warranty by ID
router.delete('/warranties/:id', async (req, res) => {
  try {
    const warranty = await Warranty.findByIdAndDelete(req.params.id);
    if (!warranty) {
      return res.status(404).send();
    }
    res.status(200).send(warranty);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;