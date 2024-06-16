import React from "react";
import "../styles/Note.css"

function Note({ note }) {

        const convertTimestamp = (timestamp) => {
            const date = new Date(timestamp * 1000);
            const timeString = date.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: false});
            return timeString;
        };
        const time = convertTimestamp(note.timestamp);
    return (
        <>
        <section>
        <div className="my-4 transition-transform transform hover:scale-105">
        <div>
            <p className="text-center border-b border-gray-400 pb-2">{note.content}</p>
            <p className="mb-1 note-date">{time}  {note.title}</p>
        </div>
        </div>           
        </section>
        </>
    );
}

export default Note