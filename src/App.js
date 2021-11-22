import { Routes, Route } from "react-router-dom"
import './App.css'
import { OrderPage, PackagePage } from '$components/page'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<OrderPage />}/>
        <Route path="package" element={<PackagePage />}/>
      </Routes>
    </div>
  );
}

export default App
