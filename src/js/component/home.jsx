import React, { useState, useEffect } from "react";
//include images into your bundle

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [entradas, setEntradas] = useState([]);

	// =============== API code ===============/

	//::::: remember to add the .label from the api object to index {index.label}, to add the list items from the api to the UI ::://
	//________ getTodos will consume the Api__________//
	function getTodos() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/sebapom")
			.then(respuesta => respuesta.json())
			.then(respuesta => {
				console.log(respuesta);
				setEntradas(respuesta);
			})
			.catch(error => console.log("algo paso", error));
	}
	/*____________ PUT _______________*/

	//function putTodos() {
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify(entradas);

	var requestOptions = {
		method: "PUT",
		headers: myHeaders,
		body: raw,
		redirect: "follow"
	};

	fetch(
		"https://assets.breatheco.de/apis/fake/todos/user/sebapom",
		requestOptions
	)
		.then(response => response.text())
		.then(result => console.log(result))
		.catch(error => console.log("error", error));
	//}

	/*____________ Agregar tarea _____________*/

	function agregarTarea() {
		setEntradas([{ label: inputValue, done: false }, ...entradas]);
	}

	/*____________ useEffect  _______________*/

	useEffect(() => {
		getTodos();
	}, []);

	/*___________________________*/

	const validateInput = () => {
		// === STRICT COMPARISON
		if (inputValue === "") {
			console.log("The input cannot be empty");
		} else {
			console.log("All perfect!");
			setEntradas([...entradas, inputValue]);
		}
	};

	//////////////////////////////////////////////////////

	// === FUNCTION TO HANDLE LIST REMOVAL

	function handleremove(index) {
		//console.log(index);
		const newList = entradas.filter(key => key !== index);
		setEntradas(newList);
		//putTodos();
	}

	return (
		<div>
			<div className="container-fluid mt-5">
				<div className="row justify-content-center">
					<div className="col-8">
						<h1 className="text-center text-secondary mb-4">
							To-do List
						</h1>
						<div className="input-group mb-3">
							<input
								className="form-control"
								placeholder="Add something to your list..."
								type="text"
								onChange={e => setInputValue(e.target.value)}
								value={inputValue}
							/>
							<div className="input-group-append">
								<button
									className="btn btn-info text-sm input-group-text"
									id="basic-addon2"
									onClick={() => {
										validateInput();
										setInputValue("");
										agregarTarea();
									}}>
									<i className="fas fa-plus"></i>
								</button>
							</div>
						</div>

						<ul className="list-group">
							{entradas.map((index, key) => (
								<li className="list-group-item" key={key}>
									{index.label}
									<span className="float-right">
										<button
											className="btn btn-warning btn-sm"
											onClick={() => handleremove(index)}>
											<i className="fas fa-trash-alt text-white m-0"></i>
										</button>
									</span>
								</li>
							))}
						</ul>
						<h6 className="mt-3 text-secondary text-center">
							List items{" "}
							<span className="badge bg-info text-white">
								{entradas.length}
							</span>
						</h6>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
