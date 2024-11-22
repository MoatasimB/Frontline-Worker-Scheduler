import './App.css';
import Login from "./components/Login";

function App() {
  return (
    <div className="App" style={{
        display: 'flex',          // Enable Flexbox
        justifyContent: 'center', // Horizontal alignment
        alignItems: 'center',     // Vertical alignment
        width: '100vw',           // Full viewport width
        height: '100vh',          // Full viewport height
    }}>
      <Login/>
    </div>
  );
}

export default App;
