import Note from "../models/Notes.js";

export const getAllNotes = async (req, res) => {
    try{
        const notes = await Note.find();
        res.status(200).json(notes);
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error getting notes'});
    }
};

export const getNoteById = async (req, res) => {
    try{
        const note = await Note.findById(req.params.id);
        if (!note) {
            res.status(404).json({message: 'Note ID not found'});
        }
        res.status(200).json(note);
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error getting notes'});
    }
}

export const createNote = async (req, res) => {
    try {
        const {title, content} = req.body;

        const newNote = await Note.create({
            title,
            content
        });
        res.status(201).json(newNote);
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error creating note'});
    }
}

export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            {
                new: true,
            }
        );

        if (!updatedNote) return res.status(404).json({ message: "Note not found" });

        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error in updateNote controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteNote = async (req, res) => {
    const { id } = req.params;

    try {
       const deleteNote = await Note.findByIdAndDelete(id);
       if (!deleteNote) return res.status(404).json({ message: "Note not found" });
       res.status(200).json({message: 'Note deleted'});
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error deleting note'});
    }
};