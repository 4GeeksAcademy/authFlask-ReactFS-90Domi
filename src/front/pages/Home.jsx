import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Home = () => {



	return (
		<div className="text-center mt-5">
			<h1>Log In - Sign Up</h1>
			<div className="d-flex justify-content-center">

				<div className="d-block">

					<div className="d-flex justify-content-around">
						<div className="me-5">
							<p>Si tienes una cuenta</p>
							<div className="bg-grey text-center border rounded">
								<Link to="/login">
							<p><button className="w-75" >Entrar</button></p>
								</Link>
							</div>
						</div>
						<div className="ms-5">
							<p>Si no estas registrado</p>
							<div className="bg-grey text-center border rounded">
								<Link to="/signup">
							<p><button className="w-75" >Registrarse</button></p>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}; 