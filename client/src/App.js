import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Students from "./pages/Students";
import StudentDetail from "./pages/StudentDetail";
import AuthManager from "./components/AuthManager";

function App() {
  return (
      <Router>
          <div className="App">
              <div className="container">
                  <div className="content">
                      <AuthManager>
                          <Routes>
                              <Route path="/" element={<Students />} />
                              <Route path="/:id" element={<StudentDetail />} />
                          </Routes>
                      </AuthManager>
                  </div>
              </div>
          </div>
      </Router>
  );
}

export default App;
