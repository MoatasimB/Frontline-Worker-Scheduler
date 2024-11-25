import './App.css';
import Register from "./components/Register";

function App() {
  return (
    <div className="App" style={{
        display: 'flex',          // Enable Flexbox
        justifyContent: 'center', // Horizontal alignment
        alignItems: 'center',     // Vertical alignment
        width: '100vw',           // Full viewport width
        height: '100vh',          // Full viewport height
    }}>
      <Register/>
    </div>
  );
}

export default App;
