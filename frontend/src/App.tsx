import User from './component/User'
import Admin from './component/Admin'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Admin />} />
        <Route path='/user' element={<User />} />
      </Routes>
    </BrowserRouter>)
}

export default App
