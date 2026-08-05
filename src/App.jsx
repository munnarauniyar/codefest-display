import { Routes, Route, Navigate } from "react-router-dom";
import Display from "./pages/Display";
import Admin from "./pages/Admin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/display" replace />} />
      <Route path="/display" element={<Display />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;