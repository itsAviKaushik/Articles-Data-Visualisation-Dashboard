import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import "animate.css/animate.min.css";
import { BrowserRouter as Router } from 'react-router-dom'
import GeneralSettings from './components/GeneralSettings';

function App() {
  return (
    <Router>
      <GeneralSettings />
      <Header />
      <Home />
    </Router>
  );
}

export default App;
