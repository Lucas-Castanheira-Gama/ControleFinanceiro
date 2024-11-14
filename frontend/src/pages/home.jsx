import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import suaImagem from "../assets/img.png";


// Função para buscar os dados das ações da Alpha Vantage

// Função para buscar os dados das criptomoedas do CoinGecko


export default function Home() {
  const [acoes, setAcoes] = useState([]);
  const [cryptos, setCryptos] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem('token');

  console.log(token)


  return (
    <div className="bg-gray-900 min-h-screen text-white relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${suaImagem})`,
          backgroundSize: "100vw 100vh", // Define o tamanho fixo da imagem como 100% da largura e altura da tela
          backgroundAttachment: "fixed", // Faz a imagem permanecer fixa ao rolar a página
        }}
      ></div>



      <div className="relative z-10"> {/* Container para manter o conteúdo acima do fundo */}
        {token && (
          <Navbar />
        )}
        {/* Hero Section */}
        {!token && (
          <header className=" py-16">
            <div className="container mx-auto text-center">
              <h1 className="text-4xl font-bold text-green-500">Mantenha suas finaças sob controle</h1>
              <p className="mt-4 text-lg text-gray-600">
                Gerencie suas finanças de forma simples e eficaz.
              </p>
              <button className="mt-8 bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg transition duration-300">
                <Link to="/login">Comece Agora</Link>
              </button>
            </div>
          </header>

        )}


        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Ações */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h2 className="text-2xl font-semibold text-blue-500 mb-4">10 passos práticos para investir de forma eficiente e com segurança</h2>
              <div className="text-gray-300 space-y-4">
                <h3 className="text-xl font-semibold text-blue-400">1. Defina Objetivos de Investimento</h3>
                <p>Antes de tudo, tenha clareza sobre os objetivos: investir para aposentadoria, comprar um imóvel, estudar ou obter uma renda extra? Definir o tempo e o motivo ajuda a escolher os tipos de investimento mais adequados.</p>

                <h3 className="text-xl font-semibold text-blue-400">2. Monte uma Reserva de Emergência</h3>
                <p>Antes de investir de verdade, monte uma reserva de emergência em um investimento de alta liquidez (que permita resgates rápidos, como o Tesouro Selic ou o CDB com liquidez diária). Isso te protege em imprevistos, sem precisar mexer nos investimentos.</p>

                <h3 className="text-xl font-semibold text-blue-400">3. Entenda Seu Perfil de Investidor</h3>
                <p>Conheça sua tolerância ao risco:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li><span className="font-semibold text-blue-300">Conservador:</span> Prefere segurança, com baixo risco.</li>
                  <li><span className="font-semibold text-blue-300">Moderado:</span> Aceita um pouco de risco por uma rentabilidade maior.</li>
                  <li><span className="font-semibold text-blue-300">Agressivo:</span> Focado em alta rentabilidade, mesmo com maiores riscos.</li>
                </ul>

                <h3 className="text-xl font-semibold text-blue-400">4. Estude os Tipos de Investimento Disponíveis</h3>
                <p>Familiarize-se com as opções de investimento:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li><span className="font-semibold text-blue-300">Renda Fixa:</span> Tesouro Direto, CDB, LCI/LCA e Fundos DI. Indicados para quem busca segurança e retorno previsível.</li>
                  <li><span className="font-semibold text-blue-300">Renda Variável:</span> Ações, fundos imobiliários e ETFs. Com potencial de retorno maior, mas com risco de perda.</li>
                  <li><span className="font-semibold text-blue-300">Fundos de Investimento:</span> Administrados por gestores profissionais, com diferentes perfis de risco e rendimento.</li>
                </ul>

                <h3 className="text-xl font-semibold text-blue-400">5. Comece Pequeno e Pratique</h3>
                <p>Para criar experiência e ganhar confiança, comece com uma quantia pequena. Muitos investimentos têm aplicações mínimas acessíveis, como no Tesouro Direto e algumas corretoras.</p>

                <h3 className="text-xl font-semibold text-blue-400">6. Diversifique os Investimentos</h3>
                <p>Diversificar minimiza riscos, pois você não depende do desempenho de um único ativo ou setor. Considere uma mistura de renda fixa e variável, além de diferentes setores (se for investir em ações, por exemplo).</p>

                <h3 className="text-xl font-semibold text-blue-400">7. Acompanhe e Revise Seu Portfólio</h3>
                <p>Não basta apenas investir; monitore regularmente o desempenho. Se um investimento não estiver rendendo conforme o esperado, avalie se é hora de trocá-lo.</p>

                <h3 className="text-xl font-semibold text-blue-400">8. Evite as Ciladas do Investimento Emocional</h3>
                <p>A volatilidade do mercado causa euforia em altas e pânico em quedas. Evite vender na baixa e comprar na alta apenas com base em emoções. Defina uma estratégia e siga-a.</p>

                <h3 className="text-xl font-semibold text-blue-400">9. Reinvista os Rendimentos</h3>
                <p>Reaplicar os juros e dividendos aumenta o poder dos juros compostos. Em investimentos de longo prazo, isso gera um crescimento exponencial no valor aplicado.</p>

                <h3 className="text-xl font-semibold text-blue-400">10. Busque Conhecimento Contínuo e Aconselhamento Profissional</h3>
                <p>Investir bem exige estudo constante. Acompanhe fontes confiáveis, leia sobre economia, e sempre que possível, consulte profissionais qualificados ou utilize recursos como robo-advisors para uma estratégia mais personalizada.</p>
                <p>Esses passos oferecem uma base sólida para começar a investir com responsabilidade e foco em bons resultados!</p>
                
              </div>
            </div>

            {/* Criptomoedas */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h2 className="text-2xl font-semibold text-blue-500 mb-4">Análise Fundamentalista</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  A análise fundamentalista é um método de avaliação de ativos financeiros, como ações, que busca identificar seu valor intrínseco, analisando fatores econômicos, condições do setor e os fundamentos da própria empresa. Esse método ajuda os investidores a entender se uma ação está negociada a um preço justo, abaixo ou acima de seu valor real.
                </p>

                <h3 className="text-xl font-semibold text-blue-400">1. Análise do Balanço Patrimonial</h3>
                <p>Examina os ativos, passivos e patrimônio líquido, avaliando a saúde financeira da empresa.</p>

                <h3 className="text-xl font-semibold text-blue-400">2. Demonstração de Resultados (DRE)</h3>
                <p>Analisa receitas, custos, despesas e margens de lucro, mostrando a capacidade de gerar lucros.</p>

                <h3 className="text-xl font-semibold text-blue-400">3. Fluxo de Caixa</h3>
                <p>Avalia a entrada e saída de dinheiro. O fluxo de caixa positivo é sinal de estabilidade financeira.</p>

                <h3 className="text-xl font-semibold text-blue-400">4. Índices de Rentabilidade</h3>
                <p>ROE, ROA e margem líquida mostram a eficiência e lucratividade da empresa.</p>

                <h3 className="text-xl font-semibold text-blue-400">5. Índices de Valuation</h3>
                <p>P/L, P/VP e EV/EBITDA ajudam a identificar se uma ação está cara ou barata.</p>

                <h3 className="text-xl font-semibold text-blue-400">6. Crescimento e Perspectiva do Setor</h3>
                <p>Analisa o mercado e o potencial de crescimento da empresa dentro de seu setor.</p>

                <h3 className="text-xl font-semibold text-blue-400">7. Análise do Endividamento</h3>
                <p>Verifica o nível de dívida e a capacidade da empresa de cumprir suas obrigações.</p>

                <h3 className="text-xl font-semibold text-blue-400">8. Gestão e Governança Corporativa</h3>
                <p>Avalia a competência dos gestores e práticas de governança da empresa.</p>

                <h3 className="text-xl font-semibold text-blue-400">9. Impactos Macroeconômicos</h3>
                <p>Considera fatores como inflação, taxa de juros e condições econômicas gerais.</p>

                <h3 className="text-xl font-semibold text-blue-400">10. Valoração</h3>
                <p>Baseado nos dados coletados, determina-se o valor intrínseco da empresa e se vale a pena investir.</p>

                <h3 className="text-xl font-semibold text-green-500">Vantagens e Desvantagens</h3>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li><span className="font-semibold text-blue-300">Vantagens:</span> Ideal para longo prazo, ajuda a identificar ações subvalorizadas e evita ativos sobrevalorizados.</li>
                  <li><span className="font-semibold text-blue-300">Desvantagens:</span> Complexa e demorada, sujeita a imprevistos que alteram o valor de mercado.</li>
                </ul>
              </div>
            </div>


            {/* Aprenda a Investir */}
            {/* <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h2 className="text-2xl font-semibold text-blue-500 mb-4">Aprenda a Investir</h2>
              <p className="text-gray-300">
                Confira nossos materiais educativos sobre investimentos e estratégias para começar sua jornada financeira com o pé direito.
              </p>
              <Link to="/learn" className="mt-4 inline-block text-blue-500 hover:text-blue-700">Saiba mais</Link>
            </div> */}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-blue-500 py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold">Pronto para assumir o controle das suas finanças?</h2>
            <p className="mt-4 text-gray-200">
              Crie sua conta e comece a organizar suas finanças agora mesmo.
            </p>
            <button className="mt-8 bg-white text-blue-500 py-2 px-6 rounded-lg hover:bg-gray-100 transition duration-300">
              <Link to="/cadastro">Cadastre-se Gratuitamente</Link>
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 py-6">
          <div className="container mx-auto text-center">
            <p className="text-gray-400">&copy; 2024 Controle Financeiro. Todos os direitos reservados.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
