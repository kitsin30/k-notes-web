import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import './App.css';
import LoginForm from './components/loginForm/LoginForm';
import Home from './components/home/Home';
import DetailCard from './components/detailCard/DetailCard';
import AddNote from './components/addEditNote/AddNote';
import EditNote from './components/addEditNote/EditNote';
import ForgotForm from './components/forgotForm/ForgotForm';
import RegisterForm from './components/registerForm/RegisterForm';

const PrivateRoute = () => {
  const user = JSON.parse(localStorage.getItem('username'));
  return user ? <Outlet /> : <Navigate to="/" replace />;
}

const AnonymousRoute = () => {
  const user = JSON.parse(localStorage.getItem('username'));
  return user ? <Navigate to="/home" replace /> : <Outlet />;
}

const ValidateDetailCard = () => {
  const detailCardData = JSON.parse(localStorage.getItem('detailCardPage'));
  return detailCardData ? <Outlet /> : <Navigate to="/home" replace />;
}

const ValidateAddPage = () => {
  const addPage = JSON.parse(localStorage.getItem('addPage'));
  return addPage ? <Outlet /> : <Navigate to="/home" replace />;
}

const ValidateEditPage = () => {
  const editPage = JSON.parse(localStorage.getItem('editPage'));
  return editPage ? <Outlet /> : <Navigate to="/home/detail" replace />;
}

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route element={<AnonymousRoute />}>
            <Route path='/' exact element={<LoginForm />} />
            <Route path='/register' exact element={<RegisterForm />} />
            <Route path='/forgot' exact element={<ForgotForm />} />
          </Route>
          <Route element={<PrivateRoute />} >
            <Route path='/home' element={<Home />} />
            <Route element={<ValidateDetailCard />}>
              <Route path='/home/detail' element={<DetailCard />} />

              <Route element={<ValidateEditPage />}>
                <Route path='/home/detail/editnote' element={<EditNote />} />
              </Route>

            </Route>

            <Route element={<ValidateAddPage />}>
              <Route path='/home/addnote' element={<AddNote />} />
            </Route>
            
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
