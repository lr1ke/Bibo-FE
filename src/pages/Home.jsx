
import { useState } from "react";
import api from "../api";
import "../styles/Home.css"

function Home() {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [charCount, setCharCount] = useState(0);

    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) alert("Note created!");
                else alert("Failed to make note.");
                getNotes();
            })
            .catch((err) => alert(err));
    };

    return (
        <>
        <div class="flex flex-col min-h-screen bg-gray-100 font-sans antialised">
        <div class="flex-grow container mx-auto mt-10px-4 sm:px:0">
        <div class="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md  flex flex-col">
            <div>
            <h2 class="text-xl mb-4 font-semibold text-center">Practice</h2>
            <form onSubmit={createNote}>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    class="mb-4 flex-grow p-2 border border-blue-400 rounded-l-md"
                    placeholder="Describe your outer world..."
                    maxLength={80}
                />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value);
                        setCharCount(e.target.value.length);
                    }}
                    class="mb-4  p-2 border border-blue-400 rounded-l-md h-80 w-full"
                    placeholder="share your experience. Connect to your inner world..."
                    maxLength="800"
                ></textarea>
                <p>{charCount}/800</p>

                {/* <p>Character count: {charCount}</p> */}
                <br />

                <input type="submit" value="Share" 
                class="mb-4 w-full bg-gradient-to-r from-pink-300 to-yellow-200  hover:from-green-300 hover:to-blue-300 text-white p-2 rounded px-4 py-2 rounded-r-md">
                </input>
            </form>
        </div>
        </div>
        </div>
        </div>
        </>
        ); }

export default Home;
