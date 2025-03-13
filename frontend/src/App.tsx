import "./App.css";
import Login from "./pages/login/Login";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"; // Importando Navigate para redirecionamento
import Sobre from "./pages/sobre/Sobre";
import CadastrarVacina from "./pages/cadastrarVacina/CadastrarVacina";
import CadastrarMorador from "./pages/cadastrarMorador/CadastrarMorador";
import Documentacao from "./pages/documentacao/Documentacao";
import { useAuth } from "./contexts/AuthContext";
import NavbarLogin from "./components/NavbarLogin";
import NavbarGeral from "./components/NavbarGeral";
import Footer from "./components/Footer";
import RegistroAplicacao from "./pages/registroAplicacao/RegistroAplicacao";

function App() {
	const { user, isAuthenticated } = useAuth();

	return (
		<BrowserRouter>
			{!isAuthenticated ? <NavbarLogin /> : <NavbarGeral />}

			<Routes>
				{!isAuthenticated ? (
					// Rotas públicas
					<>
						<Route path="/" element={<Login />} />
						<Route path="*" element={<Navigate to="/" replace />} />
					</>
				) : (
					// Rotas protegidas
					<>
						<Route path="/sobre" element={<Sobre />} />
						<Route path="/cadastrarVacina" element={<CadastrarVacina />} />
						<Route path="/cadastrarMorador" element={<CadastrarMorador />} />
						<Route path="/docs" element={<Documentacao />} />
						<Route path="/aplicacao" element={<RegistroAplicacao />} />
						{/* Redireciona para home se tentar acessar login quando já autenticado */}
						<Route path="/" element={<Navigate to="/sobre" replace />} />
						{/* Redireciona qualquer rota não encontrada para home */}
						<Route path="*" element={<Navigate to="/sobre" replace />} />
					</>
				)}
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
