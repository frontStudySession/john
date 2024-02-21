import './App.css';
import { NavigationProvider, Routes, Route } from '@router/Router';
import Home from '@pages/Home';
import About from '@pages/About';
import Login from '@pages/Login';
import SignUp from '@pages/SignUp';

function App() {
  return (
    <NavigationProvider>
      <Routes className="App">
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/about"
          element={<About />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<SignUp />}
        />
      </Routes>
    </NavigationProvider>
  );
}

export default App;
