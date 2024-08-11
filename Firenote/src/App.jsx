import Navbar from "./components/Navbar.jsx";
import Addnote from "./components/Addnote.jsx";
import Notes from "./components/Notes.jsx";
import Intro from "./components/Intro.jsx";
import { useEffect, useState } from "react";

export default function App() {
    const [notes, setNotes] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getdata();
    }, []);

    const getdata = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(
                "https://firenote-155c7-default-rtdb.asia-southeast1.firebasedatabase.app/notes.json"
            );
            if (!res.ok) {
                throw new Error("Cannot connect to the firebase.");
            }
            const notes = await res.json();
            const modifynotes = [];
            for (const key in notes) {
                modifynotes.push({
                    id: key,
                    text: notes[key]
                });
            }
            setNotes(modifynotes);
        } catch (err) {
            setError(err.message);
        }

        setLoading(false);
    };

    return (
        <div className="max-w-screen-md grid mx-auto px-2">
            <Navbar />

            {isLoading && <p>Loading...</p>}
            {error && (
                <p className="text-2xl text-red-700 font-bold text-center mt-2">
                    {error}
                </p>
            )}
            {!isLoading && !error && (
                <>
                    <Addnote getdata={getdata} />
                    {notes.map((note, index) => (
                        <Notes key={index} note={note} getdata={getdata} />
                    ))}
                </>
            )}
            {notes.length < 1 && <Intro/>}
        </div>
    );
}
