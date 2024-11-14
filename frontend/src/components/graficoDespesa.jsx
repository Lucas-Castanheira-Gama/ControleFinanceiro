import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import api from '../services/api';
import { useEffect, useState } from 'react';
import { fetchAllData } from '../services/apiService';

// Registra os elementos que serão usados
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {

  const [historico, setHistorico] = useState([])
  const token = localStorage.getItem('token')

  useEffect(() => {
    const loadData = async () => {
      try {
        const { graficDespesa } = await fetchAllData(token)
        setHistorico(graficDespesa)

      } catch (error) {
        console.log('Erro ao carregar dados', error)
      }

    }
    loadData();

  }, [])

  const labels = [];
  const valor = [];

  const despesaMap = {}

  const formatarValor = (valor) => {
    // Substitui 'R$', remove pontos de milhar e troca a vírgula por ponto decimal
    return parseFloat(valor.replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.'));
                    
}

  historico.forEach((item) => {
    if (item['desre'] === 'despesa') {
      const valor = formatarValor(item['valor']);
      if (despesaMap[item['tipo']]) {
        despesaMap[item['tipo']] += valor;
    } else {
        despesaMap[item['tipo']] = valor;
    }
    }
  })

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

  for (const [tipo, soma] of Object.entries(despesaMap)) {
    const capitalizado = capitalizeFirstLetter(tipo);
    labels.push(capitalizado)
    valor.push(soma)
  }




  return (
    <div className="w-full max-w-md  bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-white text-xl font-semibold text-center mb-4">Despesas totais</h2>
      <Pie data={{
        
        labels: labels,
        datasets: [
          {
            label: 'R$',
            data: valor,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
          },
        ],
      }
      } />
    </div>
  );
};

export default PieChart;
