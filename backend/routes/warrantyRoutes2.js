import express from 'express';
// import mongoose from 'mongoose';
import multer from 'multer';
import Warranty from '../models/Warranty2.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/warranties2', upload.single('pdf'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ error: 'No file uploaded' });
        }

        const warranty = new Warranty({ // Use Warranty instead of warrantySchema
            name: req.file.originalname,
            data: req.file.buffer,
            contentType: req.file.mimetype,
        });

        await warranty.save();
        res.status(201).send({ message: 'File uploaded successfully', warranty });
    } catch (error) {
        console.error('Error saving file:', error);
        res.status(500).send({ error: 'Failed to upload file' });
    }
});

router.get('/warranties2/:id', async (req, res) => {
  try {
    const warranty = await Warranty.findById(req.params.id);
    if (!warranty) {
      return res.status(404).send('File not found.');
    }

    res.set('Content-Type', warranty.contentType);
    res.set('Content-Disposition', `attachment; filename="${warranty.name}"`);
    res.send(warranty.data);
  } catch (error) {
    console.error('Error retrieving file:', error);
    res.status(500).send('Failed to retrieve file.');
  }
});

export default router;
