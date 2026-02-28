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
                  <Route path="cart" element={<CartPage />} />
                  <Route path="Products" element={<Products />} />
                  <Route path="Admin" element={<Admin />} />
                  <Route path="Men" element={<Men />} />
                  <Route path="Woman" element={<Woman />} />
                  <Route path="Western" element={<Western />} />
                  <Route path="Accesseries" element={<Accesseries />} />
                  <Route path="Footbear" element={<Footbear />} />
                  <Route path="Tredentional" element={<Tredentional />} />
                  <Route path="Watches" element={<Watches />} />
                  <Route path="login" element={<LoginPage />} />
                  <Route path="user/register" element={<UserRegistration />} />
                  <Route path="user/account" element={<UserAccount />} />
                  <Route path="user/orders" element={<OrderList />} />
                  <Route path="payment" element={<PaymentPage />} />
                  <Route path="shipment" element={<ShipmentPage />} />
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
