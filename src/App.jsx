import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import Header from './components/ui/Header'
import Footer from './components/ui/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:productId" element={<Product />} />
      </Routes>
      <Footer/>
    </Router>
    
  )
}

export default App