async function onCreateCategory(event) {
	event.preventDefault();
	const name = document.querySelector("#name").value;

	const body = {
		nombreCategoria: name,
		activo: true,
		fechaRegistro: new Date()
	};

	const token = localStorage.getItem("authToken");
	const response = await fetch("http://localhost:5005/api/Categoria", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(body),
	});

	if (!response.ok) {
		alert("Error al crear la categoría");
		return;
	}

	window.location.href = `${window.location.origin}/Admin/Categoria/index.html`;
}
