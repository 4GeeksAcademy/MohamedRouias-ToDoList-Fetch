import React, { useState, useEffect } from "react";



//create your first component


const Home = () => {

	useEffect(() => {
		getTasks();
	}, []
	)

	const [newTask, setNewTask] = useState(""); //string for the new task 
	const [tasks, setTasks] = useState([]); // setting an array for the list

	////////////////////////////////////////////////
	//  GET tareas del backend
	const getTasks = () => {
		fetch("https://playground.4geeks.com/todo/users/MohamedRouias")
			.then((res) => {
				if (!res.ok) throw new Error("Error al obtener tareas");
				return res.json();
			})
			.then((data) => {
				setTasks(data.todos); 
			})
			.catch((err) => console.error("Fetch error:", err));
	};


	//  POST nueva tarea
	const addTask = () => {

		const taskData = {
			label: newTask,
			is_done: false,
		};

		fetch("https://playground.4geeks.com/todo/todos/MohamedRouias", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(taskData)
		})
			.then((res) => {
				if (!res.ok) throw new Error("Error al agregar tarea");
				return res.json();
			})
			.then(() => {
				setNewTask("");
				getTasks();
			})
			.catch((err) => console.error("Error:", err));
	};



	// DELETE una tarea
	const deleteTask = (id) => {
		fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE"
		})
			.then(res => {
				if (!res.ok) throw new Error("Error al eliminar tarea");
				getTasks(); // Actualizar lista después de eliminar
			})
			.catch(err => console.error("DELETE error:", err));
	};



	function handleInputChange(event) {
		setNewTask(event.target.value);
	}

	const handleKeyDown = (event) => {
		if ((event.key === "Enter" || event.keyCode === 13) && newTask.trim() !== "") {
			addTask(); // lo sube al servidor
			setNewTask(""); // limpia el input
		}
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
					{tasks.map((task, index) =>
						<li key={task.id || index}>
							<span className="text">{task.label}</span>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
								onClick={() => deleteTask(task.id)}>
							</button>
						</li>
					)}
				</ul>
				<div className="task-counter">
					{tasks.length} {tasks.length === 1 ? "item" : "items"} left
				</div>
			</div>

		</>
	)
};

export default Home;