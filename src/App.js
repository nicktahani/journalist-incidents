import './App.css';
import { FetchIncidentsData } from './components/FetchIncidentsData';
import { TooltipProvider } from './contexts/TooltipContext';

function App() {
  return (
    <div className="App">
      <TooltipProvider>
        <FetchIncidentsData />
      </TooltipProvider>
    </div>
  );
}

export default App;
