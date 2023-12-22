const noteController = require("express").Router();
const Note = require("../models/Note");
const verifyToken = require('../middlewares/verifyToken');

noteController.get('/getAll', async (req, res) => {
    try {
        const notes = await Note.find({}).sort({ createdAt: 'desc' }).populate("userId", '-password');
        return res.status(200).json(notes);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
});

noteController.get('/getAll/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const notes = await Note.find({ userId }).sort({ createdAt: 'desc' })
        return res.status(200).json(notes);
    } catch (error) {
        return res.status(500).json(error);
    }
});


noteController.get('/find/:id', async (req, res) => {
    try {
        const notes = await Note.findById(req.params.id)
        return res.status(200).json(notes);
    } catch (error) {
        return res.status(500).json(error);
    }
});

noteController.get('/featured', async (req, res) => {
    try {
        const notes = await Note.find({ featured: true }).populate("userId", '-password').limit(3);
        return res.status(200).json(notes);
    } catch (error) {
        return res.status(500).json(error);
    }
});
noteController.post('/post', verifyToken, async (req, res) => {
    try {
        const note = await Note.create(req.body);
        note.userId = req.user.id;
        const savedNote = await note.save();

        if (savedNote) {
            return res.status(201).json({ title: savedNote.title, userId: savedNote.userId });

        } else {
            return res.status(400).json({ message: "Error saving note" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
});



noteController.put("/update/:id", verifyToken, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (note.userId.toString() !== req.user.id.toString()) {
            throw new Error("You can update only your own posts");
        }
        
        const updatedNote = await Note
            .findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .populate('userId', '-password');

        return res.status(200).json(updatedNote);
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

noteController.delete('/delete/:id', verifyToken, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (note.userId.toString() !== req.user.id.toString()) {
            throw new Error("You can delete only your own posts");
        }

        await Note.findByIdAndDelete(req.params.id);

        return res.status(200).json({ msg: "Successfully deleted the blog" });
    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = noteController;