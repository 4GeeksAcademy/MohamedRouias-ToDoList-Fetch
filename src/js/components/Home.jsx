import React, { useState } from "react";


//create your first component


const Home = () => {
	const [newTask, setNewTask] = useState(""); //string for the new task 
	const [tasks, setTasks] = useState([""]); // setting an array for the list

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
					onChange={handleInputChange} //IT SHOWS the input text that the user is typing
					value={newTask}
					onKeyDown={handleKeyDown}
				/>
				<ul>
					{tasks.map((task, index) =>
						<li key={index}>
							<span className="text">{task}</span>
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