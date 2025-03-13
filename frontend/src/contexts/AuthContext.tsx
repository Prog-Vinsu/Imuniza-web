import React, { createContext, useContext, useState, ReactNode } from "react";

// Define os tipos para o contexto
interface User {
	email: string;
	name: string;
	role: "admin" | "user";
}

interface AuthContextData {
	user: User | null;
	login: (email: string, password: string) => boolean;
	logout: () => void;
	isAuthenticated: boolean;
}

// Lista de usuários pré-definidos
const USERS = [
	{
		email: "silvia@prof.com",
		password: "silvia123",
		name: "Silvia",
		role: "user" as const,
	},
	{
		email: "teste@teste.com",
		password: "teste123",
		name: "Usuário Teste",
		role: "admin" as const,
	},
];

// Cria o contexto
const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(() => {
		// Verifica se há um usuário salvo no localStorage
		const savedUser = localStorage.getItem("@Auth:user");
		return savedUser ? JSON.parse(savedUser) : null;
	});

	const isAuthenticated = !!user;

	const login = (email: string, password: string): boolean => {
		// Procura o usuário na lista de usuários pré-definidos
		const foundUser = USERS.find(
			(u) => u.email === email && u.password === password
		);

		if (foundUser) {
			// Remove a senha antes de salvar o usuário
			const { password: _, ...userWithoutPassword } = foundUser;
			setUser(userWithoutPassword);
			// Salva o usuário no localStorage
			localStorage.setItem("@Auth:user", JSON.stringify(userWithoutPassword));
			return true;
		}

		return false;
	};

	const logout = (): void => {
		setUser(null);
		localStorage.removeItem("@Auth:user");
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextData => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth deve ser usado dentro de um AuthProvider");
	}
	return context;
};
