import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
	const navigate = useNavigate();

	const logout = ()=>{

		sessionStorage.removeItem("token");
		navigate("/");
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h5">Ir al inicio</span>
				</Link>
				<div className="ml-auto">
					<div className="dropdown">
						<button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
							Opciones
						</button>
						<ul className="dropdown-menu">
							
							<li><a className="dropdown-item" onClick={logout}>Cerrar sesion</a></li>
							
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};