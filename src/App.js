import './App.css';
import NavigationBar from './navigation/NavigationBar';
import Products from './products/components/Products';
import Western from './products/components/Western';
import Accesseries from './products/components/Accesseries';
import Footbear from './products/components/Footbear';
import Tredentional from './products/components/Tredentional';
import Watches from './products/components/Watches';
import Admin from './comonents/admin';
import Men from './comonents/men';
import Shop from './Shop';
import CartPage from './CartPage';
import LoginPage from './LoginPage';
import UserRegistration from './comonents/user/register';
import UserAccount from './comonents/user/account';
import OrderList from './comonents/user/orders';
import { CartProvider } from './CartContext';
import { AuthProvider } from './AuthContext';
import { SearchProvider } from './SearchContext';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Woman from './comonents/woman';
import PaymentPage from './comonents/payment/index';
import ShipmentPage from './comonents/shipment/index';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <SearchProvider>
              <Routes>
                <Route path="/" element={<NavigationBar />}>
                  <Route index element={<Shop />} />
                  <Route path="shop" element={<Shop />} />
                  <Route path="login" element={<LoginPage />} />
                  <Route path="user/register" element={<UserRegistration />} />
                  <Route path="cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
                  <Route path="Products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
                  <Route path="Admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
                  <Route path="Men" element={<ProtectedRoute><Men /></ProtectedRoute>} />
                  <Route path="Woman" element={<ProtectedRoute><Woman /></ProtectedRoute>} />
                  <Route path="Western" element={<ProtectedRoute><Western /></ProtectedRoute>} />
                  <Route path="Accesseries" element={<ProtectedRoute><Accesseries /></ProtectedRoute>} />
                  <Route path="Footbear" element={<ProtectedRoute><Footbear /></ProtectedRoute>} />
                  <Route path="Tredentional" element={<ProtectedRoute><Tredentional /></ProtectedRoute>} />
                  <Route path="Watches" element={<ProtectedRoute><Watches /></ProtectedRoute>} />
                  <Route path="user/account" element={<ProtectedRoute><UserAccount /></ProtectedRoute>} />
                  <Route path="user/orders" element={<ProtectedRoute><OrderList /></ProtectedRoute>} />
                  <Route path="payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
                  <Route path="shipment" element={<ProtectedRoute><ShipmentPage /></ProtectedRoute>} />
                </Route>
              </Routes>
            </SearchProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
