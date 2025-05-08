function redirectToCreateCategory(e) {
	const url = new URL(window.location);
	url.pathname = "/Admin/Categoria/create.html";
	window.location.href = url.toString();
}

function editCategory(row) {
	console.log("Editando la Categoría", row);
}

async function deleteCategory(row) {
	const categoryId = row.idCategoria;
	const url = `http://localhost:5005/api/Categoria/${categoryId}`;
	const token = localStorage.getItem("authToken");
	const response = await fetch(url, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		}
	});
	const isSuccess = response.ok;
	if (!isSuccess) {
		alert("No se pudo eliminar la categoría");
	}

	generateCategoryTable();
}

async function generateCategoryTable() {
	const columns = [
		{
			title: "Nombre",
			field: "nombre",
			type: "text",
			cellTemplate: null,
		},
		{
			title: "Acciones",
			field: "",
			type: "",
			cellTemplate: (row) => {
				const editButton = document.createElement("button");
				editButton.innerText = "Editar";
				editButton.onclick = () => editCategory(row);

				const deleteButton = document.createElement("button");
				deleteButton.innerText = "Eliminar";
				deleteButton.onclick = () => deleteCategory(row);

				const div = document.createElement("div");
				div.appendChild(editButton);
				div.appendChild(deleteButton);
				return div;
			},
			prefix: "",
		},
	];

	const url = "http://localhost:5005/api/Categoria";
	const token = localStorage.getItem("authToken");
	const response = await fetch(url, {
		method: "GET",
		headers: { 
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
	});
	const rows = await response.json();

	createDataTable("tbl-container-Categories", columns, rows);
};

generateCategoryTable();
