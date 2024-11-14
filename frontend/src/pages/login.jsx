import { Link, useNavigate } from "react-router-dom";
import api from "../services/api"
import { useRef, useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function App() {

  const emailRef = useRef()
  const senhaRef = useRef()
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate()
  localStorage.setItem('token', '')
  const [showPassword, setShowPassword] = useState(false)

  // async function handleSubmit(e) {
  //   e.preventDefault()


  //   try {
  //     const response = await api.post('/login', {
  //       email: emailRef.current.value.toLowerCase(),
  //       password: senhaRef.current.value,
  //     });

  //     setErrorMessage("");



  //     emailRef.current.value = "";
  //     senhaRef.current.value = "";

  //     console.log("Login bem-sucedido:", response.data);
  //     const token = response.data.access_token;
  //     localStorage.setItem("token", token)
  //     navigate("/dash")



  //   } catch (error) {
  //     setErrorMessage("Email ou senha incorretos.");
  //     console.error("Erro no login:", error.response?.data || error.message);
  //   }

  // }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }






  const validationSchema = Yup.object({
    email: Yup.string().email('Email invalido').required('Obrigatorio'),
    password: Yup.string().min(8, 'A senha de ter pelo menos 8 caracteres').required('Obrigatorio'),
  })

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <section className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-3xl font-bold text-center mb-6">Entrar</h2>
        {/* Formik */}
        <Formik
          initialValues={{ email: '', password: '' }} // Valores iniciais
          validationSchema={validationSchema} // Validação Yup
          // validateOnChange={false}
          // validateOnBlur={}
          onSubmit={async (values, { setSubmitting }) => {

            setErrorMessage('')

            // console.log('Dados do Formulário:', values);

            try {
              const response = await api.post('/login', {
                email: values['email'],
                password: values['password'],
              });

              // console.log("Login bem-sucedido:", response.data);
              const token = response.data.access_token;
              localStorage.setItem("token", token)
              navigate("/dash")

            } catch (error) {
              setErrorMessage(error.response?.data?.message || 'Email ou senha incorretos.');

              // setErrorMessage('');

            } finally {
              setSubmitting(false); // Finaliza o estado de submissão
            }




          }}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* Campo Email */}
              <div className="mb-4">
                <label className="block text-lg font-medium">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Digite seu email"
                />
                {/* Mensagem de erro */}
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Campo Senha */}
              <div className="mb-4">
                <label className="block text-lg font-medium">Senha</label>

                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Digite sua senha"
                  />

                  <button
                    type="button" // Adicione "type='button'" para evitar que o botão envie o formulário
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {/* Mensagem de erro */}
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>


              {/* Se houver erros gerais */}
              <div className="mb-4 text-red-500 text-lg">{/* errorMessage */}</div>

              {/* Botão de Envio */}
              <div className="mb-4">
                {errorMessage && <div className="text-red-500 text-lg">{errorMessage}</div>}
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white font-bold py-2 rounded-md hover:bg-green-600 transition duration-200"
                disabled={isSubmitting} // Desativa o botão enquanto envia
              >
                Entrar
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-center mt-4">
          Não tem uma conta?{' '}
          <a className="text-green-500 hover:underline" href="/cadastro">
            Registrar
          </a>
        </p>
      </section>
    </div>


  );
}
