import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Flows from "./components/Flows";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Flows" element={<Flows />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
