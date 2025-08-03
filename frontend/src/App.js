import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuthContext } from './hooks/useAuthContext';
function App() {
  // const { user } = useAuthContext() // front end check !! only weak security user &&
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            < Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/signup"
              element={<Signup />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
