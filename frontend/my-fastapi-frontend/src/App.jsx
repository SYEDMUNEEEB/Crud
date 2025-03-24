import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Books from "./Pages/Books";
import AddBook from "./Pages/AddBook";
import EditBook from "./Pages/EditBook";
import "./index.css";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Books />} />
                <Route path="/add" element={<AddBook />} />
                <Route path="/edit/:id" element={<EditBook />} />
            </Routes>
        </Router>
    );
}
