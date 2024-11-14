import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import api from "../services/api";
import { fetchAllData } from "../services/apiService";
import suaImagem from "../assets/img.png";

export default function Perfil() {
    const [isEditable, setIsEditable] = useState(false);
    const [dados, setDados] = useState(null); // Inicializa com `null` para saber quando os dados ainda estão sendo carregados
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const toggleEdit = () => {
        setIsEditable(!isEditable);
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const { info } = await fetchAllData(token);
                setDados(info); // Quando os dados forem carregados, atualiza o estado
            } catch (error) {
                navigate('/login');
            }
        };
        loadData();
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        console.log(e);
        try {
            const response = await api.post('/info/salvar', {
                name: e.nome,
                date: e.data,
                telefone: e.telefone
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            // console.log(response);
            confirm('Dados atualizados com sucesso!')
            window.location.reload();
        } catch (er) {
            console.log('aqui ta o erro', er);
        }
    };

    const ValidationSchema = Yup.object().shape({
        nome: Yup.string().min(3, 'Deve conter no minimo 3 caracteres').required('campo obrigatorio'),
        telefone: Yup.string().min(15, 'Numero invalido')
    });

    const handleTelefoneChange = (e, setFieldValue) => {
        const input = e.target.value.replace(/\D/g, ""); // Remove qualquer caractere não numérico
        let formattedTelefone = input;

        if (input.length > 2 && input.length <= 7) {
            formattedTelefone = `(${input.slice(0, 2)}) ${input.slice(2)}`;
        } else if (input.length > 7) {
            formattedTelefone = `(${input.slice(0, 2)}) ${input.slice(2, 7)}-${input.slice(7, 11)}`;
        }

        setFieldValue('telefone', formattedTelefone); // Atualiza o valor do telefone no Formik
    };

    // Renderiza o formulário apenas quando os dados estiverem carregados
    if (!dados) {
        return <div>Carregando...</div>; // Exibe uma mensagem de carregamento até que os dados sejam carregados
    }

    return (

        <div className="min-h-screen overflow-hidden relative">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${suaImagem})`,
                backgroundSize: "100vw 100vh", // Define o tamanho fixo da imagem como 100% da largura e altura da tela
                backgroundAttachment: "fixed", }} // Coloque a URL da imagem ou o caminho local
            ></div>
            <div className="relative z-10">
                <Navbar />
                <div className="flex items-center justify-center min-h-screen ">
                    <section className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                        <h2 className="text-2xl font-bold text-center mb-6">Perfil</h2>
                        <Formik
                            initialValues={{
                                nome: dados.user.name || '',
                                email: dados.user.email || '',
                                data: dados.user.date || '',
                                telefone: dados.user.telefone || ''
                            }}
                            validationSchema={ValidationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ setFieldValue }) => (
                                <Form>
                                    <div className="mb-4 items-center">
                                        <div className="flex items-center">
                                            <label className="w-24 font-medium">Nome</label>
                                            <Field
                                                type="text"
                                                name="nome"
                                                readOnly={!isEditable}
                                                className={`border rounded-md p-2 flex-grow focus:outline-none ${isEditable ? "bg-white border-gray-300" : "bg-gray-200 border-gray-200"}`}
                                            />
                                            <Link to="#" onClick={toggleEdit} className="ml-2 text-green-500 hover:text-green-700">
                                                <FaEdit className="text-lg" />
                                            </Link>
                                        </div>
                                        <ErrorMessage name="nome" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    <div className="mb-4 flex items-center">
                                        <label className="w-24 font-medium">Email</label>
                                        <Field
                                            type="email"
                                            name="email"
                                            readOnly
                                            className="border border-gray-300 rounded-md p-2 flex-grow bg-gray-200 text-gray-700"
                                        />
                                    </div>
                                    <div className="mb-4 flex items-center">
                                        <label className="w-24 font-medium">Data de nascimento</label>
                                        <Field
                                            type="date"
                                            name="data"
                                            className="border border-gray-300 rounded-md p-2 flex-grow bg-white text-gray-700"
                                            max={new Date().toLocaleDateString('pt-BR')}
                                        />
                                    </div>
                                    <div className="mb-4 items-center">
                                        <div className="flex items-center">
                                            <label className="w-24 font-medium">Telefone</label>
                                            <Field
                                                type="text"
                                                name="telefone"
                                                onChange={(e) => handleTelefoneChange(e, setFieldValue)}
                                                maxLength="15"
                                                className="border border-gray-300 rounded-md p-2 flex-grow bg-white text-gray-700"
                                            />
                                        </div>
                                        <ErrorMessage name="telefone" component="div" className="text-red-500 text-sm mt-1 text-center" />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-green-500 text-white font-bold py-2 mt-4 rounded-md hover:bg-green-600 transition duration-200"
                                    >
                                        Salvar
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </section>
                </div>
            </div>
        </div>
    );
}
