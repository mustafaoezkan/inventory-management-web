import { Routes, Route } from 'react-router-dom';
import Login from "./components/Authentication/Login";
import ResetPassword from './components/Authentication/ResetPassword';
import Layout from "./components/General/Layout";
import RequireAuth from './components/General/RequireAuth';
import LandingPage from './components/LandingPage/LandingPage';
import Register from './components/Authentication/Register';
import Category from './components/Category/Category';
import Product from './components/Product/Product';
import Missing from './components/General/Missing';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route path="giris" element={<Login />} />
        <Route path="sifremi-unuttum" element={<ResetPassword />} />
        {/* Private routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<LandingPage />} />
          <Route path='/kullanici-ekle' element={<Register />} />
          <Route path='/kategori' element={<Category />} />
          <Route path='/urun' element={<Product />} />
        </Route>
        {/* Missing routes */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
