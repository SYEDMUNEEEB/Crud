import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookById, updateBook } from "../API/Api";
import "../index.css";

function EditBook() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [year, setYear] = useState("");

    useEffect(() => {
        fetchBook();
    }, []);

    const fetchBook = async () => {
        try {
            const book = await getBookById(id);
            if (book) {
                setTitle(book.title || "");
                setAuthor(book.author || "");
                setDescription(book.description || "");
                setYear(book.year || "");
            } else {
                console.error("Book not found!");
            }
        } catch (error) {
            console.error("Error fetching book:", error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateBook(id, { title, author, description, year });
            navigate("/"); // Redirect to home
        } catch (error) {
            console.error("Error updating book:", error);
        }
    };

    return (
        <div className="container">
            <h2>✏️ Edit Book</h2>
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Title"
                    style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                />
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                    placeholder="Author"
                    style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                />
                <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="Year"
                    style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                />
                <button type="submit" className="edit-btn" style={{ width: "100%" }}>
                    Update Book
                </button>
            </form>
        </div>
    );
}

export default EditBook;
