import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



export const Signup = () => {


	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [name, setName] = useState("")

	
	const navigate = useNavigate()



	const registrarse = async () => {
		const userData = { name, email, password };
		console.log("Enviando datos:", userData);
		

		const resp = await fetch(`https://humble-telegram-jxjjggj7xvx3pgwj-3001.app.github.dev/api/sign_up`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		});

		if (!resp.ok) {
			console.log(resp);
			throw new Error("Error creating user");


		}

		const data = await resp.json();
		console.log(data.access_token);		
		alert("Registro completado");

		sessionStorage.setItem("token", data.access_token);

		navigate("/private");

		
	}


	return (

		<div className="text-center mt-5">
			<h1>Sign Up</h1>
			<div className="d-flex justify-content-center">

				<div className="d-block">

					<div className="d-flex justify-content-around">

						<div className="ms-5">
							<p>Si no estas registrado</p>
							<div className="bg-grey text-center border rounded">
								<p>Nombre</p>
								<input type="text" onChange={(e) => { setName(e.target.value) }} />
								<p>Introduce tu email</p>
								<input type="email" onChange={(e) => { setEmail(e.target.value) }} required />
								<p>Introduce tu contraseña</p>
								<input type="password" onChange={(e) => { setPassword(e.target.value) }} required />
								<p><button className="w-75" onClick={registrarse}>Registrarse</button></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>



	);


}