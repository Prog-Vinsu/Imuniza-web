import React from "react";
import zeGotinha from "../assets/imagens/zeGotinha.jpg";

const NavbarLogin: React.FC = () => {
	return (
		<header className="h-[80px] flex items-center justify-center shadow-md">
			<img src={zeGotinha} alt="Ze Gotinha" className="h-full rounded-md" />
		</header>
	);
};

export default NavbarLogin;
