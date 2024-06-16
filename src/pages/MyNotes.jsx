
import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note"
import "../styles/Home.css"

function MyNotes() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const convertTimestampToDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const dateString = date.toLocaleDateString("en-US", 
            { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'}
        );
        return dateString;
    };
    
    const groupByDate = (notes) => {
        return notes.reduce((groupedNotes, note) => {
            const date = convertTimestampToDate(note.timestamp);
            if (!groupedNotes[date]) {
                groupedNotes[date] = [];
            }
            groupedNotes[date].push(note);
            return groupedNotes;
        }, {});
    };
    
    const groupedNotes = groupByDate(notes);

    // Sort the dates in descending order
    const sortedDates = Object.entries(groupedNotes).sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA));

    return (
        <>
        <div class="flex flex-col min-h-screen bg-gray-100 font-sans antialised">
        <div class="container mx-auto mt-10 px-4 sm:px-0">
        <div class="max-w 3-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div class="flex items-center justify-between mb-4">
        <div class="container mx-auto mt-10 px-4 sm:px-0">
        <div class="max-w 3-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 class="text-2xl font-semibold mb-8 text-center">Public Notes</h1>
            {sortedDates.map(([date, notesForDate]) => {
                // Sort notes for each date in reverse order
                const sortedNotesForDate = notesForDate.sort((noteA, noteB) => noteB.timestamp - noteA.timestamp);
                return (
                    <div key={date}>
                        <h2 class="text-center my-12">{date}</h2>

                        {sortedNotesForDate.map((note) => (
                            <Note  note={note} key={note.id} />
                        ))}
                    </div>
                );
            })}
        </div>
        </div>
        </div>
        </div>
        </div>

        </div>
        </>
        ); }

export default MyNotes;
