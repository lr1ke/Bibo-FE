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
        <div className="my-4 transition-transform transform hover:scale-105  ">
        <div>
            <div className="flex">          
                <p className="mb-1 note-date">{time} </p>
            </div>
            <p className=" border-b border-gray-300 pb-2 ">{note.content}</p>
            <div className="flex ">          
                <p className="mb-1 note-date">  {note.title}</p>
            </div>
        </div>
        </div>           
        </section>
        </>
    );
}

export default Note

