import { useState } from "react";
import { createBook } from "../API/Api";
import { useNavigate } from "react-router-dom";
import "../index.css";

function AddBook() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [year, setYear] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createBook({ title, author, description, year });
        navigate("/");
    };

    return (
        <div className="container">
            <h2>➕ Add Book</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Book Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                />
                <input
                    type="text"
                    placeholder="Author Name"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                    style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                />
                <input
                    type="number"
                    placeholder="Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                    style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                />
                <button type="submit" className="add-btn" style={{ width: "100%" }}>
                    Save Book
                </button>
            </form>
        </div>
    );
}

export default AddBook;
