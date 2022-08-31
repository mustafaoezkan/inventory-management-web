import { Routes, Route } from 'react-router-dom';
import Login from "./components/Authentication/Login";
import ResetPassword from './components/Authentication/ResetPassword';
import Layout from "./components/General/Layout";
import RequireAuth from './components/General/RequireAuth';
import LandingPage from './components/LandingPage/LandingPage';
import Category from './components/Category/Category';
import Product from './components/Product/Product';
import Missing from './components/General/Missing';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import User from './components/Users/User';

const theme = createTheme({
  palette: {
    primary: {
      main: "#00ADB5",
    },
    secondary: {
      main: "#393E46",
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route path="giris" element={<Login />} />
          <Route path="sifremi-unuttum" element={<ResetPassword />} />
          {/* Private routes */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<LandingPage />} />
            <Route path='/kullanici' element={<User />} />
            <Route path='/kategori' element={<Category />} />
            <Route path='/urun' element={<Product />} />
          </Route>
          {/* Missing routes */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
