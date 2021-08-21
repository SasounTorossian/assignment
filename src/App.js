import logo from './logo.svg';
import './App.css';
import LineChart from "./Components/LineChart/LineChart"
import Header from "./Components/Header/Header"
import Footer from "./Components/Footer/Footer"

function App() {
  return (
    <div className="App">
      <Header />
      <LineChart />
      <Footer />
    </div>
  );
}

export default App;
