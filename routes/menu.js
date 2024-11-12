const express = require('express');
const bodyparser = require('body-parser');
const Menu = require('../models/menu');
const router = express.Router();

router.use(bodyparser.json());
router.use(bodyparser.urlencoded({ extended: true }));

// Get all notes
router.get('/menu', async (req, res) => {
    try {
        const menu = await Menu.find().sort({ date: -1 });
        res.status(200).json(menu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Add a new note
router.post('/menu', async (req, res) => {
    const menu = new Menu({
        title: req.body.title,
        content: req.body.content,
        price:req.body.price,
        image:req.body.image,
    });

    try {
        const newmenu = await menu.save();
        res.status(201).json(newmenu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a menu
router.put('/menu/:id', async (req, res) => {
    try {
        const updatedmenu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedmenu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a menu
router.delete('/menu/:id', async (req, res) => {
    try {
        await Menu.findByIdAndDelete(req.params.id);
        res.json({ message: 'menu deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;