import React from "react";
import Navbar from "../components/navbar";
import PieChart from "../components/graficoDespesa";
import PieChartReceita from "../components/graficoReceita";
import { useState, useRef, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import suaImagem from "../assets/img.png";


export default function Dash() {


    const [activeTab, setActiveTab] = useState('');
    const [historico, setHistorico] = useState([]);
    const [desp_total, setDesp_total] = useState(0);
    const [diferenca, setDiferenca] = useState(0);
    const [rece_total, setRece_total] = useState(0);
    const addDescDespesaRef = useRef()
    const addTipoDespesaRef = useRef()
    // const addValorReceitaRef = useRef()
    const addDescReceitaRef = useRef()
    const addTipoReceitaRef = useRef()
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()
    const [valorDespesa, setValorDespesa] = useState('');
    const [valorReceita, setValorReceita] = useState('');
    
    const addValorDespesaRef = useRef(null)
    const addValorReceitaRef = useRef(null);

    const difereca = rece_total - desp_total
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/dash', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                setHistorico(response.data.documents);
                // console.log(response.data.documents)
            } catch (error) {

                navigate('/login')
                // window.location.reload()

            }
        }

        fetchData();
    }, [])

    const calcularValores = (historico) => {
        let total_des = 0;
        let total_rec = 0;
    
        // Função para remover o 'R$', pontos e vírgulas e converter para número
        const formatarValor = (valor) => {
            // Substitui 'R$', remove pontos de milhar e troca a vírgula por ponto decimal
            return parseFloat(valor.replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.'));
        }
    
        historico.forEach((item) => {
            const valor = formatarValor(item.valor); // Aqui, formatamos o valor
            console.log(valor)
    
            if (item.desre === 'despesa') {
                total_des += valor; // Soma as despesas (valores negativos)
            } else {
                total_rec += valor; // Soma as receitas
            }
        });
    
        return { total_des, total_rec };
    }

    useEffect(() => {
        const { total_des, total_rec } = calcularValores(historico);

        setDesp_total(total_des);
        setRece_total(total_rec);
        setDiferenca(total_rec - total_des);
    }, [historico]);





    async function addGastos(e) {
        e.preventDefault()
        setActiveTab('adicionandoDespesa')

    }

    async function addReceitas(e) {
        e.preventDefault()
        setActiveTab('adicionandoReceita')

    }

    async function handleAddDespesa(e) {
        e.preventDefault()

        console.log(valorDespesa)
        // console.log(typeof(addValorReceitaRef.current.value))
        // const valor = valorDespesa
        const descricao = addDescDespesaRef.current.value
        const tipo = addTipoDespesaRef.current.value
        const desre = 'despesa'

        try {
            const response = await api.post('/dash/addDespesa', {
                valor: valorDespesa,
                descricao,
                tipo,
                desre,

            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }

            }

            )
            if (response.status == 200 || response.status == 201) {
                toast.success('Despesa adicionada com sucesso!', {
                    position: "top-right",
                    autoClose: 2000,
                    pauseOnHover: false,
                    theme: 'dark',


                });
                setTimeout(() => {
                    window.location.reload();
                }, 3000)
            }
        } catch (error) {
            console.log(error)
            toast.error('Erro ao adicionar despesa.', {
                position: "top-right",
                autoClose: 2000,
                theme: 'dark',
                pauseOnHover: false,
            });

        }
    }

    const formatarMoeda = (valor) => {
        // Remove qualquer caractere que não seja número
        const valorNumerico = parseFloat(valor.replace(/[^0-9]/g, '')) / 100;
        if (isNaN(valorNumerico)) return ''; // Verifica se o valor é válido

        // Formata o valor como moeda brasileira
        return valorNumerico.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    };

    const handleChangeDespesa = (e) => {
        const valorFormatado = formatarMoeda(e.target.value);
        setValorDespesa(valorFormatado);   
    };

    const handleChangeReceita = (e) => {
        const valorFormatado = formatarMoeda(e.target.value);
        setValorReceita(valorFormatado);   
    };



    async function handleAddReceita(e) {

        e.preventDefault()
        const valor = valorReceita
        const descricao = addDescReceitaRef.current.value
        const tipo = addTipoReceitaRef.current.value
        const desre = 'receita'

        try {
            const response = await api.post('/dash/addReceita', {
                valor,
                descricao,
                tipo,
                desre,

            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }

            }

            )
            if (response.status == 200 || response.status == 201) {
                toast.success('Receita adicionada com sucesso!', {
                    position: "top-right",
                    autoClose: 2000,
                    pauseOnHover: false,
                    theme: 'dark',


                });
                setTimeout(() => {
                    window.location.reload();
                }, 3000)
            }
        } catch (error) {
            console.log(error)
            toast.error('Erro ao adicionar receita.', {
                position: "top-right",
                autoClose: 2000,
                theme: 'dark',
                pauseOnHover: false,
            });

        }


    }

    return (
        <div className="bg-gray-900 min-h-screen">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${suaImagem})` }} // Coloque a URL da imagem ou o caminho local
            ></div>
            <div className="relative z-10">
                <Navbar />
                <div className="py-10 px-5">
                    <section className="flex justify-center space-x-6 mb-8">
                        <button disabled className="bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded-lg shadow-md transition-colors duration-300">
                            Despesas Totais
                            <br />
                            <span className="text-lg">
                                {desp_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </span>
                        </button>
                        <button disabled className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-lg shadow-md transition-colors duration-300">
                            Diferença
                            <span className="text-lg">
                                <br />
                                {diferenca.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </span>
                        </button>
                        <button disabled className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-lg shadow-md transition-colors duration-300">
                            Receitas Totais
                            <span className="text-lg">
                                <br />
                                {rece_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </span>
                        </button>
                    </section>

                    <div className="flex justify-center mb-12">
                        <form className="space-x-6">
                            <button
                                className="bg-slate-800 text-white px-6 py-3 rounded-lg shadow-md hover:bg-slate-700 transition-colors duration-300"
                                onClick={addGastos}
                            >
                                Adicionar gastos
                            </button>
                            <button
                                className="bg-slate-800 text-white px-6 py-3 rounded-lg shadow-md hover:bg-slate-700 transition-colors duration-300"
                                onClick={addReceitas}
                            >
                                Adicionar receitas
                            </button>
                        </form>
                    </div>
                    {activeTab === 'adicionandoDespesa' && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-slate-600 p-6 rounded-lg shadow-lg w-80">
                                <section>
                                    <h2 className="text-xl font-semibold text-white mb-4">Adicione uma Despesa</h2>
                                    <form className="space-y-4">
                                        <div>
                                            <label className="text-white">R$</label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Digite o valor"
                                                ref={addValorDespesaRef}
                                                value={valorDespesa}
                                                onChange={handleChangeDespesa}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-white">Descrição: </label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Digite a descrição"
                                                ref={addDescDespesaRef}

                                            />
                                        </div>
                                        <div>
                                            <label className="text-white">Tipo:</label>
                                            <select
                                                className="w-full px-3 py-2 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                ref={addTipoDespesaRef}

                                            >
                                                <option value="">Selecione o tipo</option>
                                                <option value="alimentacao">Alimentação</option>
                                                <option value="divida">Divida</option>
                                                <option value="entretenimento">Entretenimento</option>
                                                <option value="outros">Outros</option>
                                            </select>
                                        </div>
                                        <div className="flex justify-center space-x-5">
                                            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-300"

                                            >
                                                Cancelar
                                            </button>
                                            <ToastContainer />
                                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
                                                onClick={handleAddDespesa}

                                            >
                                                Adicionar
                                            </button>
                                        </div>
                                    </form>
                                </section>
                            </div>
                        </div>

                    )

                    }

                    {activeTab === 'adicionandoReceita' && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-slate-600 p-6 rounded-lg shadow-lg w-80">
                                <section>
                                    <h2 className="text-xl font-semibold text-white mb-4">Adicione uma Receita</h2>
                                    <form className="space-y-4">
                                        <div>
                                            <label className="text-white">R$</label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Digite o valor"
                                                ref={addValorReceitaRef}
                                                value={valorReceita}
                                                onChange={handleChangeReceita}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-white">Descrição: </label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Digite a descrição"
                                                ref={addDescReceitaRef}

                                            />
                                        </div>
                                        <div>
                                            <label className="text-white">Tipo:</label>
                                            <select
                                                className="w-full px-3 py-2 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                ref={addTipoReceitaRef}

                                            >
                                                <option value="">Selecione o tipo</option>
                                                <option value="salario">Salario</option>
                                                <option value="vendas">Vendas</option>
                                                <option value="dividendos">Dividendos</option>
                                                <option value="outros">Outros</option>
                                            </select>
                                        </div>
                                        <div className="flex justify-center space-x-5">
                                            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-300"

                                            >
                                                Cancelar
                                            </button>
                                            <ToastContainer />
                                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
                                                onClick={handleAddReceita}

                                            >
                                                Adicionar
                                            </button>
                                        </div>
                                    </form>
                                </section>
                            </div>
                        </div>

                    )

                    }




                    <div className="flex flex-wrap justify-center space-x-10 space-y-10 md:space-y-0">
                        <div className="bg-white rounded-lg shadow-md p-3 w-full md:w-1/3 max-h-[560px] overflow-auto">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">Histórico</h2>
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="border-b-2 border-gray-300 p-2 bg-slate-400 text-gray-800">
                                            Descrição
                                        </th>
                                        <th className="border-b-2 border-gray-300 p-2 bg-slate-400 text-gray-800">
                                            Valor
                                        </th>
                                        <th className="border-b-2 border-gray-300 p-2 bg-slate-400 text-gray-800">
                                            Data
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-slate-100 text-gray-700">
                                    {historico.slice().reverse().map((item, index) => (
                                        <tr key={index}>
                                            <td
                                                className={`border-b text-lg text-center border-gray-300 p-2 ${item.desre === 'despesa' ? 'text-red-500' : 'text-green-500'
                                                    }`}
                                            >
                                                {item.descricao.charAt(0).toUpperCase() + item.descricao.slice(1)}
                                            </td>
                                            <td
                                                className={`border-b text-lg  text-center border-gray-300 p-2 ${item.desre === 'despesa' ? 'text-red-500' : 'text-green-500'
                                                    }`}
                                            >
                                                {item.desre === 'despesa' ? `- ${item.valor}` : `+ ${item.valor}`}
                                            </td>
                                            <td
                                                className={`border-b text-lg  text-center border-gray-300 p-2 ${item.desre === 'despesa' ? 'text-red-500' : 'text-green-500'
                                                    }`}
                                            >
                                                {new Date(item.creatdat).toLocaleDateString('pt-BR')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-3 w-full md:w-1/4">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">Gráfico de Despesas</h2>
                            <PieChart />
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-3 w-full md:w-1/4">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">Gráfico de Receitas</h2>
                            <PieChartReceita />
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}
