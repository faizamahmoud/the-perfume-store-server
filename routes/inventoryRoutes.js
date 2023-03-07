const express = require('express');
const router = express.Router();
const perfumeController = require('../controllers/perfumeController');

// GET all perfumes
router.get('/', perfumeController.getAllPerfumes);

// GET a specific perfume by ID
router.get('/:id', perfumeController.getPerfumeById);

module.exports = router;
