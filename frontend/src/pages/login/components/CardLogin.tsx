import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { JSX, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

export default function CardLogin(): JSX.Element {
	const { login } = useAuth();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string>("");

	const navigate = useNavigate();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const success = login(email, password);

		if (!success) {
			setError("Credenciais inválidas! Tente novamente.");
		} else {
			setError("");
			navigate("/home");
		}
	};

	return (
		<Card className="mt-6 sm:w-[330px] w-full">
			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="email" value="Seu email" />
					</div>
					<TextInput
						id="email"
						type="email"
						placeholder="emaildasilva@gmail.com"
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="password" value="Sua senha" />
					</div>
					<TextInput
						id="password"
						type="password"
						required
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="flex items-center gap-2">
					<Checkbox id="remember" />
					<Label htmlFor="remember">Lembre de mim</Label>
				</div>
				<Button type="submit">Entrar</Button>
				{error && (
					<p className="text-sm" style={{ color: "red" }}>
						{error}
					</p>
				)}
			</form>
		</Card>
	);
}
