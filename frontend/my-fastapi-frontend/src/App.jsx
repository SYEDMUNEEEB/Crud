import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Books from "./Pages/Books";

import "./index.css";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Books />} />
             
            </Routes>
        </Router>
    );
}
