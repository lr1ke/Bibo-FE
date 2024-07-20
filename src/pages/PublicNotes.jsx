import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note"
import "../styles/Home.css"
import "../styles/Note.css"


function PublicNotes() {
    const [notes, setNotes] = useState([]);
  

    useEffect(() => {
        getPublicNotes();
    }, []);

    const getPublicNotes = () => {
        api
            .get("/api/public-notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
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
        {/* <img src={sevenHorizontal} alt="horizontalThree" class="w-full h-64 object-cover rounded-lg" /> */}

        <div >
            
        <h1 class="text-2xl font-semibold mb-8 text-center">Sanctuary </h1></div>
        <div >
        <p class="text-center italic text-gray-600">for all notes </p>

        </div>

            {sortedDates.map(([date, notesForDate]) => {
                // Sort notes for each date in reverse order
                const sortedNotesForDate = notesForDate.sort((noteA, noteB) => noteB.timestamp - noteA.timestamp);
                return (
                    <div key={date} >
                        <h2 class=" bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-yellow-300
                         px-2  my-12">{date}</h2>
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
        );
        }

export default PublicNotes;