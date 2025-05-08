function redirectToCreateProvider(e) {
	const url = new URL(window.location);
	url.pathname = "/Admin/Proveedor/create.html";
	window.location.href = url.toString();
}

function editProvider(row) {
	console.log("Editando proveedor", row);
}

async function deleteProvider(row) {
	const providerId = row.idProveedor;
	const url = `http://localhost:5005/api/Proveedor/${providerId}`;
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
		alert("No se pudo eliminar el proveedor");
	}

	generateProviderTable();
}

async function generateProviderTable() {
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
				editButton.onclick = () => editProvider(row);

				const deleteButton = document.createElement("button");
				deleteButton.innerText = "Eliminar";
				deleteButton.onclick = () => deleteProvider(row);

				const div = document.createElement("div");
				div.appendChild(editButton);
				div.appendChild(deleteButton);
				return div;
			},
			prefix: "",
		},
	];

	const url = "http://localhost:5005/api/Proveedor";
	const token = localStorage.getItem("authToken");
	const response = await fetch(url, {
		method: "GET",
		headers: { 
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
	});
	const rows = await response.json();

	createDataTable("tbl-container-Providers", columns, rows);
};

generateProviderTable();
