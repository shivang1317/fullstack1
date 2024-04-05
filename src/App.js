import "./App.css";
import Form from "./Form";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Verification from "./Verification";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/verify" element={<Verification />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;