import { useState } from "react";

const Addnote = ({ getdata }) => {
    const [note, setNote] = useState("");

    const add = async e => {
        e.preventDefault();
        if (note.trim() === "") {
            alert("Please enter a note before adding!");
            return;
        }
        try {
            const res = await fetch(
                "https://firenote-155c7-default-rtdb.asia-southeast1.firebasedatabase.app/notes.json",
                {
                    method: "POST",
                    body: JSON.stringify(note),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        } catch (err) {
            alert("Somthing Went Wrong,Please Come Back Later");
        }

        setNote("");
        getdata();
    };
    return (
        <form
            className="rounded bg-[#be9b7b] px-2 py-3.5 flex justify-between mt-2"
            onSubmit={add}
        >
            <input
                type="text"
                placeholder="Add note here"
                className="rounded px-3 py-1.5 outline-none placeholder-[#854442] placeholder-opacity-50 font-bold text-[#854442]"
                value={note}
                onChange={e => setNote(e.target.value)}
            />
            <button className="bg-[#3c2f2f] text-[#fff4e6] px-2 rounded active:bg-[#fff4e6] active:text-[#3c2f2f] font-bold transition-all active:scale-90 cursor-pointer">
                Add
            </button>
        </form>
    );
};

export default Addnote;
