import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Cadastro from './pages/cadastro'
import Dash from './pages/dash';
import Perfil from './pages/perfil';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/dash' element={<Dash />} />
        <Route path='/perfil' element={<Perfil />} />
      </Routes>
    </Router>
  )
}

export default App
