import './App.css';
import { FetchIncidentsData } from './components/FetchIncidentsData';

function App() {
  return (
    <div className="App">
      <h1 className='header'>anti-press incidents (1992-present)</h1>
      <FetchIncidentsData />
    </div>
  );
}

export default App;
