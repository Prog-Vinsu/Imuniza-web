import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { VacinasProvider } from "./contexts/VacinasContext";
import { MoradoresProvider } from "./contexts/MoradoresContext";
import { AplicacoesProvider } from "./contexts/AplicacoesContext";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
	<React.StrictMode>
		<AuthProvider>
			<AplicacoesProvider>
				<VacinasProvider>
					<MoradoresProvider>
						<App />
					</MoradoresProvider>
				</VacinasProvider>
			</AplicacoesProvider>
		</AuthProvider>
	</React.StrictMode>
);
