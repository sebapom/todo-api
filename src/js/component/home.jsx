import React, { useState, useEffect } from "react";
//include images into your bundle

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [entradas, setEntradas] = useState([]);

	useEffect(() => {
		console.log(
			"mi arreglo tiene",
			entradas.length,
			"elementos hasta el momento"
		);
		console.log(entradas);
	}, [entradas]);

	const validateInput = () => {
		// === STRICT COMPARISON
		if (inputValue === "") {
			console.log("The input cannot be empty");
		} else {
			console.log("All perfect!");
			setEntradas([...entradas, inputValue]);
		}
	};

	// === API code

	function mandarTodos() {
		let data = [
			{
				label: "tarea1",
				done: false
			},
			{
				label: "tarea2",
				done: false
			},
			{
				label: "tarea3",
				done: false
			},
			{
				label: "tarea4",
				done: false
			},
			{
				label: "tarea5",
				done: false
			}
		];
		let infoNecesaria = {
			method: "PUT",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			}
		};
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/todo_leon",
			infoNecesaria
		)
			.then(res => res.json())
			.then(respuesta => console.log(respuesta))
			.catch(error => console.log("alog paso", error));
	}
	//mandarTodos();
	function getTodos() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/todo_leon")
			.then(res => res.json())
			.then(respuesta => console.log(respuesta))
			.catch(error => console.log("alog paso", error));
	}
	getTodos();

	// === FUNCTION TO HANDLE LIST REMOVAL

	function handleremove(index) {
		console.log(index);
		const newList = entradas.filter(key => key !== index);
		setEntradas(newList);
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

							<button
								className="tn btn-info text-white input-group-text"
								id="basic-addon2"
								onClick={() => {
									validateInput();
									setInputValue("");
								}}>
								<i className="fas fa-plus"></i>
							</button>
						</div>

						<ul className="list-group">
							{entradas.map((index, key) => (
								<li className="list-group-item" key={key}>
									{index}{" "}
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
