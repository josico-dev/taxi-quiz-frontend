import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import Exam from './components/Exam';
import RandomQuestion from './components/RandomQuestion';
import Home from './components/Home';
import Loading from './components/Loading';


function App() {
  return (
    <div className="App">

      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/questions" element={<RandomQuestion />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/grades" element={<Loading />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;