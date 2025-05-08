import React, { useState, useEffect } from "react";



//create your first component


const Home = () => {

	useEffect(() => {
		getTasks();
	}, []
	)

	const [newTask, setNewTask] = useState(""); //string for the new task 
	const [tasks, setTasks] = useState([""]); // setting an array for the list
	////////////////////////////////////////////////
	function getTasks() {
		fetch("https://playground.4geeks.com/todo/users/MohamedRouias",)//Aqui pondremos la URI, el metodo y si es necesario el body
			.then((response) => {
				console.log(response);
				if (!response.ok) {
					throw new Error(`Error ${response.status}: ${response.statusText}`)
				}
				return response.json()//response.json() convierte JSON a JS 
			})// codigo de status y la información en formato JSON, ENVIO DE ERRORES A CATCH
			.then((data) => {
				console.log(data);
				setTasks(data.todos)
			})// informacion en formato JS
			.catch((error) => {
				console.error(error.message)
			})// manejo de errores

		/////////////////////////////////////////



	}






	function handleInputChange(event) {
		setNewTask(event.target.value);
	}

	const handleKeyDown = (event) => {
		if (event.keyCode === 13 || event.key === "Enter") {
			// Ejecutar la acción deseada aquí
			console.log("Enviando formulario...");
			setTasks(t => [...t, newTask]);
			setNewTask("");
		}
	};


	function deleteTask(index) {
		const updatedTasks = tasks.filter((_, i) => i !== index);
		setTasks(updatedTasks);
	}



	return (
		<>
			<div className="text-center container">
				<h1 className="text-center mt-5">To-Do-List</h1>
				<input className="form-control"
					type="text"
					placeholder="Add new task"
					onChange={handleInputChange}
					value={newTask}
					onKeyDown={handleKeyDown}

				/>
				<ul>
					{tasks.map((todos, index) =>
						<li key={index}>
							<span className="text">{todos.label}</span>
							<button
								type="button"
								class="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
								onClick={() => deleteTask(index)}>
							</button>
						</li>
					)}
				</ul>
				<div className="task-counter">
					{tasks.length} {tasks.length === 1 ? "item" : "items"} left
				</div>
			</div>

		</>
	);
};

export default Home;