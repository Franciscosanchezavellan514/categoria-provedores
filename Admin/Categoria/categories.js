function redirectToCreateCategory(e) {
	const url = new URL(window.location);
	url.pathname = "/Admin/Categoria/create.html";
	window.location.href = url.toString();
}

async function deleteCategory(row) {
	if (!confirm("¿Estás seguro de eliminar esta categoría?")) {
		return;
	}

	const categoryId = row.idCategoria;
	const token = localStorage.getItem("authToken");
	const url = `http://localhost:5005/api/Categoria/${categoryId}`;

	const response = await fetch(url, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		}
	});

	if (!response.ok) {
		alert("No se pudo eliminar la categoría");
		return;
	}

	generateCategoryTable();
}

async function generateCategoryTable() {
	const url = "http://localhost:5005/api/Categoria";
	const token = localStorage.getItem("authToken");

	const response = await fetch(url, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		}
	});
	const rows = await response.json();

	const columns = [
		{ title: "Nombre", field: "nombreCategoria" },
		{ title: "Fecha de Registro", field: "fechaRegistro" },
		{
			title: "Acciones",
			field: "",
			cellTemplate: (row) => {
				const deleteBtn = document.createElement("button");
				deleteBtn.innerText = "Eliminar";
				deleteBtn.onclick = () => deleteCategory(row);

				const div = document.createElement("div");
				div.appendChild(deleteBtn);
				return div;
			}
		}
	];

	createDataTable("tbl-container-categories", columns, rows);
}

generateCategoryTable();
