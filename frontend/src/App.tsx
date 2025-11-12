import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import DashBoardLayout from "./layout/DashboardLayout"
import Product from "./pages/Product"
import { ToastContainer } from "react-toastify"
import AddProduct from "./pages/AddProduct"
import Purchase from "./pages/Purchase"

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      <Routes>
        <Route element={<DashBoardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product" element={<Product />} />
          <Route path="/add products" element={<AddProduct />} />
          <Route path="/purchase" element={<Purchase />} />




        </Route>
      </Routes>
    </>
  )
}

export default App