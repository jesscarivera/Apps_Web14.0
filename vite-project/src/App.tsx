import { useState } from 'react'
import './App.css'
import 'antd/dist/reset.css';
import UserForm from './modules/user/userForm'; 
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductTable from './modules/product/productTable'; // Cambiado a mayúscula
import OrderTable from './modules/order/orderTable'; // Cambiado a mayúscula

function App() {
  const [count, setCount] = useState(0)
  console.log(count)

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/users">Usuarios</Link></li>
            <li><Link to="/products">Productos</Link></li>
            <li><Link to="/orders">Ordenes</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/users" element={<UserForm />} />
          <Route path="/products" element={<ProductTable />} />
          <Route path="/orders" element={<OrderTable />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App