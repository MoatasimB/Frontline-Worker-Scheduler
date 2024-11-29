import './App.css';
import Register from "./components/Register";
import Login from "./components/Login.jsx";
import Timesheet from "./components/Timesheet.jsx";
import Schedule from "./components/Schedule.jsx";
import EditSchedule from "./components/EditSchedule.jsx";
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
                <Route path="/timesheet/:id" element={<Timesheet />} />
                <Route path="/schedule/:id" element={<Schedule />} />
                <Route path="/schedule/:id/edit" element={<EditSchedule />} />

            </Routes>
        </Router>
      </div>
  );
}

export default App;

