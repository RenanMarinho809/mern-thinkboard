import React, {useEffect, useState} from 'react'
import Navbar from "../components/Navbar.jsx";
import RateLimitedUi from "../components/RateLimitedUI.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard.jsx";

const HomePage = () => {
    const [isRatedLimited , setIsRatedLimited] = useState(true);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await axios.get("http://localhost:5001/api/notes")
                console.log(res.data);
                setNotes(res.data);
                setIsRatedLimited(false);
            } catch (error) {
                console.log("Error fetching notes");
                console.log(error.response);
                if (error.response?.status === 429) {
                    setIsRatedLimited(true);
                } else {
                    toast.error("Failed to load notes");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, []);

    return (
        <div className="min-h-screen">
            <Navbar />
            {isRatedLimited && <RateLimitedUi />}

            <div className="max-w-7xl mx-auto p-4 mt-6">
                {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

                {notes.length > 0 && !isRatedLimited && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note) => (
                            <div>
                                <NoteCard  key={note._id} note={note} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
export default HomePage
