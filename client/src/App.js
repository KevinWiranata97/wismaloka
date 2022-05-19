import logo from './logo.svg';
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from './views/LoginPage';
import HomePage from './views/HomePage';
import CreatePage from './views/CreatePage';
import { BlockAccessToLogin, AccessOpen } from './component/RouterGuard';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<BlockAccessToLogin><HomePage /></BlockAccessToLogin>} />
        <Route path="/login" element={<AccessOpen><LoginPage /></AccessOpen>} />
        <Route path="/addNewPost" element={<BlockAccessToLogin><CreatePage /></BlockAccessToLogin> } />
      </Routes>
    </div>
  );
}

export default App;
