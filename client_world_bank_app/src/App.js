import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllViews from './AllViews';
import AddView from './AddView';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<AllViews/>}/>
            <Route path="/add_view" element={<AddView/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
