import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const CadastroForm = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate()

    async function handleSubmit(values) {
        console.log(values);
        // console.log(values);
        // console.log(values);
        // Aqui você pode adicionar a lógica para enviar os dados ao backend
        
        try {
            const response = await api.post("/cadastro", {
                email: values.email.toLowerCase(),
                name: values.name,
                password: values.password,
            })

            console.log("Cadastrado com sucesso:", response.data);
            setErrorMessage("");
            confirm("Cadastrado com sucesso")
            navigate('/login')


        } catch (e) {
            console.error("Erro ao cadastrar:", e);
            setErrorMessage("Ocorreu um erro ao tentar cadastrar. Tente novamente.");
        }
    }

    const CadastroSchema = Yup.object().shape({
        email: Yup.string().email('Email inválido').required('Campo obrigatório'),
        name: Yup.string().min(3, 'O nome deve conter no mínimo 3 caracteres').required('Campo obrigatório'),
        password: Yup.string().min(8, 'A senha deve conter no mínimo 8 caracteres').required('Campo obrigatório'),
        passwordNovamente: Yup.string()
            .oneOf([Yup.ref('password'), null], 'As senhas devem coincidir')
            .required('Campo obrigatório')
    });

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <section className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-3xl font-bold text-center mb-6">Cadastrar</h2>
                <Formik
                    initialValues={{ email: '', name: '', password: '', passwordNovamente: '' }}
                    validationSchema={CadastroSchema}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <div className="mb-4">
                            <label className="block text-lg font-medium">Email</label>
                            <Field
                                type="email"
                                name="email"
                                className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Digite seu email"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg font-medium">Nome</label>
                            <Field
                                type="text"
                                name="name"
                                className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Digite seu nome"
                            />
                            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg font-medium">Senha</label>
                            <Field
                                type="password"
                                name="password"
                                className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Digite sua senha"
                            />
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg font-medium">Confirmar Senha</label>
                            <Field
                                type="password"
                                name="passwordNovamente"
                                className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Confirme sua senha"
                            />
                            <ErrorMessage name="passwordNovamente" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        {errorMessage && (
                            <div className="mb-4 text-red-500 text-lg">{errorMessage}</div>
                        )}
                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white font-bold py-2 rounded-md hover:bg-green-600 transition duration-200"
                        >
                            Cadastrar
                        </button>
                    </Form>
                </Formik>
                <p className="text-center mt-4">
                    Já tem uma conta?{" "}
                    <Link className="text-green-500 hover:underline" to={'/login'}>Login</Link>
                </p>
            </section>
        </div>
    );
}

export default CadastroForm;
