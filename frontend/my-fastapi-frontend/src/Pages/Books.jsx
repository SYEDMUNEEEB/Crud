import { useEffect, useState } from "react";

async function getBooks() {
    try {
        const response = await fetch("http://127.0.0.1:8000/books");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
    }
}

async function deleteBook(bookId) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/books/${bookId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete the book");
        }

        return await response.json();
    } catch (error) {
        console.error("Error deleting book:", error);
    }
}

async function updateBook(bookId, updatedBook) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/book/${bookId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedBook),
        });
        if (!response.ok) {
            throw new Error("Failed to update the book");
        }
        return await response.json();  
    } catch (error) {
        console.error("Error updating book:", error);
    }
}

async function addBook(newBook) {
    try {
        const response = await fetch("http://127.0.0.1:8000/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newBook),
        });
        if (!response.ok) {
            throw new Error("Failed to add the book");
        }
        return await response.json();
    } catch (error) {
        console.error("Error adding book:", error);
        throw error;
    }
}

function Books() {
    const [books, setBooks] = useState([]);
    const [editingBook, setEditingBook] = useState(null);
    const [newBook, setNewBook] = useState({
        title: "",
        author: "",
        description: "",
        year: "",
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getBooks()
            .then((data) => {
                console.log("Fetched books:", data);
                setBooks(data);
            })
            .catch((error) => {
                console.error("Error fetching books:", error);
                setBooks([]);
            });
    }, []);

    const handleChange = (e) => {
        setNewBook({
            ...newBook,
            [e.target.name]: e.target.value,
        });
    };

    const handleEditChange = (e) => {
        setEditingBook({
            ...editingBook,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addBook(newBook)
            .then((addedBook) => {
                setBooks([...books, addedBook]);
                setIsModalOpen(false);
                setNewBook({ title: "", author: "", description: "", year: "" });
            })
            .catch((error) => {
                console.error("Error adding book:", error);
            });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        updateBook(editingBook.id, editingBook)
            .then((updatedBook) => {
                setBooks((prevBooks) =>
                    prevBooks.map((book) =>
                        book.id === updatedBook.id ? { ...book, ...updatedBook } : book
                    )
                );
                setEditingBook(null);  
                setIsModalOpen(false);
            })
            .catch((error) => {
                console.error("Error updating book:", error);
            });
    };

    const handleDelete = (bookId) => {
        deleteBook(bookId)
            .then(() => {
                setBooks(books.filter((book) => book.id !== bookId));
            })
            .catch((error) => {
                console.error("Error deleting book:", error);
            });
    };

    return (
        <div className="container">
            <h1 className="title">Book List</h1>
            <button onClick={() => setIsModalOpen(true)} className="add-book-btn">
                Add Book
            </button>

         
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{editingBook ? "Edit Book" : "Add New Book"}</h2>
                        <form onSubmit={editingBook ? handleEditSubmit : handleSubmit}>
                            <label>Title</label>
                            <input
                                type="text"
                                name="title"
                                value={editingBook?.title || newBook.title}
                                onChange={editingBook ? handleEditChange : handleChange}
                                required
                            />
                            <label>Author</label>
                            <input
                                type="text"
                                name="author"
                                value={editingBook?.author || newBook.author}
                                onChange={editingBook ? handleEditChange : handleChange}
                                required
                            />
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={editingBook?.description || newBook.description}
                                onChange={editingBook ? handleEditChange : handleChange}
                                required
                            />
                            <label>Year</label>
                            <input
                                type="number"
                                name="year"
                                value={editingBook?.year || newBook.year}
                                onChange={editingBook ? handleEditChange : handleChange}
                                required
                            />
                            <button type="submit" className="submit-btn">
                                {editingBook ? "Update Book" : "Add Book"}
                            </button>
                        </form>
                        <button onClick={() => setIsModalOpen(false)} className="close-btn">
                            Close
                        </button>
                    </div>
                </div>
            )}

      
            {books?.length > 0 ? (
                <table className="book-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Description</th>
                            <th>Year</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.description}</td>
                                <td>{book.year}</td>
                                <td>
                                    <button onClick={() => { setEditingBook(book); setIsModalOpen(true); }} className="edit-btn">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(book.id)} className="delete-btn">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="no-books">No books available.</p>
            )}
        </div>
    );
}

export default Books;
