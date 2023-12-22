const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
        min: 4,
    },
    desc: {
        type: String,
        required: true,
        min: 12,
    },
    imageUrl: {
        type: String,  
    },
}, { timestamps: true });

module.exports = mongoose.model("Note", NoteSchema);
