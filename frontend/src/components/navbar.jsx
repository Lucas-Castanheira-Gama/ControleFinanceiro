import React, { useState, useEffect } from "react";
import { FaUserEdit, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { fetchAllData } from "../services/apiService";

export default function Navbar() {
  const token = localStorage.getItem('token');
  const [nome, setNome] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { info } = await fetchAllData(token);
        setNome(info.user.name);
      } catch (error) {
        console.log('Erro ao carregar dados:', error);
      }
    };
    loadData();
  }, [token]);

  // Função para lidar com logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
    // Redirecionar para a página de login ou atualizar o estado conforme necessário
  };

  // Atraso para evitar fechamento rápido do menu
  let closeTimeout;
  const handleMouseEnter = () => {
    clearTimeout(closeTimeout); // Cancela qualquer fechamento agendado
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout = setTimeout(() => setIsDropdownOpen(false), 200); // Fecha após 200ms
  };

  return (
    <nav className="p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl text-green-800 font-bold">
          Controle Financeiro
        </div>

        {/* Menu */}
        <ul className="flex space-x-6 text-green-600 text-lg">
          <li className="hover:text-green-900 cursor-pointer"><Link to={'/'}>Home</Link></li>
          <li className="hover:text-green-900 cursor-pointer"><Link to={'/dash'}>Dashboard</Link></li>
          <li className="hover:text-green-900 cursor-pointer">Sobre</li>
          <li className="hover:text-green-900 cursor-pointer">Serviços</li>
          <li className="hover:text-green-900 cursor-pointer">Contato</li>
        </ul>

        {/* User Dropdown */}
        <div 
          className="relative text-green-600 cursor-pointer text-xl"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="hover:text-blue-400">{nome}</div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 text-gray-700 z-10">
              <Link 
                to="/perfil" 
                className="flex items-center px-4 py-2 hover:bg-green-100"
              >
                <FaUserEdit className="mr-2" /> Perfil
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 hover:bg-green-100"
              >
                <FaSignOutAlt className="mr-2" /> 
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
