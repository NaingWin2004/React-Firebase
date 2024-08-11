import React from "react";

const Notes = ({ note,getdata }) => {
    const { text, id } = note;
    const delenote = async () => {
        try {
            const res = await fetch(
                `https://firenote-155c7-default-rtdb.asia-southeast1.firebasedatabase.app/notes/${id}.json`,
                {
                    method: "DELETE"
                }
            );
            if (!res.ok) {
                throw new Error("Cannot connect to the firebase.");
            }
            getdata()
        } catch (err) {
            alert(err.message);
        }
    };
    return (
        <div className="rounded bg-[#be9b7b] px-2 py-3.5 flex justify-between mt-2 text-[#fff4e6] font-bold items-center">
            <p> + {text}</p>
            <button
                className="bg-[#854442] rounded-full p-1 hover:bg-[#4b3832] transition-all cursor-pointer"
                onClick={delenote}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </div>
    );
};

export default Notes;
