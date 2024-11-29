import './App.css';
import Register from "./components/Register";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
      <div className="App" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
    }}>
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />

            </Routes>
        </Router>
      </div>
  );
}

export default App;

