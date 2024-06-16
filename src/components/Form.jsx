import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        
        if (method === 'register' && password !== passwordConfirm) {
            // Show an error message and return to prevent the form from being submitted
            alert('Passwords do not match');
            return;
        }
    
        try {
            const res = await api.post(route, { username, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <>
            <div class="flex items-center justify-center h-screen">
        <div class="bg-white p-8 shadow-md shadow-md rounded-lg max-w-md w-full">
        
        <form onSubmit={handleSubmit} class="space-y-4">
        <h2 class="text-xl font-semibold">{name}</h2>
        <div>
        <label for="username" class="block mb-1 font-medium">Username</label>
        <input
            // className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            class="w-full p-2 border rounded"
        />
        </div>
        <input
            // className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            class="w-full p-2 border rounded"
        />
        {method === 'register' && (
        <div>
            <label for="passwordConfirm" class="block mb-1 font-medium">Confirm Password</label>
            <input
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                placeholder="Confirm Password"
                class="w-full p-2 border rounded"
            />
        </div>
        )}
        {loading && <LoadingIndicator />}
        <button class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700" type="submit">
            {name}
        </button>
        </form>
        </div>
        </div>
        </>
    );
}

export default Form