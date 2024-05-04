import { BrowserRouter as Router, Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import LoginForm from './components/loginForm/LoginForm';
import Home from './components/home/Home';
import DetailCard from './components/detailCard/DetailCard';

const PrivateRoute = () => {
  const user = JSON.parse(localStorage.getItem('username'));
  return user ? <Outlet /> : <Navigate to="/" replace />;
}

const ValidateDetailCard = () => {
  const location = useLocation();
  return location.state ? <Outlet /> : <Navigate to="/home" replace />;
}

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' exact element={<LoginForm />} />
          <Route element={<PrivateRoute />} >
            <Route path='/home' element={<Home />} />
            <Route element={<ValidateDetailCard />}>
              <Route path='/home/detail' element={<DetailCard />} />
            </Route>
            
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
