import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import './App.css';
import LoginForm from './components/loginForm/LoginForm';
import Home from './components/home/Home';
import DetailCard from './components/detailCard/DetailCard';

const PrivateRoute = () => {
  const user = JSON.parse(localStorage.getItem('username'));
  return user ? <Outlet /> : <Navigate to="/" replace />;
}

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' exact element={<LoginForm />} />
          <Route element={<PrivateRoute />} >
            <Route path='/home' element={<Home />} />
            <Route path='/home/detail' element={<DetailCard />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
