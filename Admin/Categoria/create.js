async function onCreateCategory(event) {
	event.preventDefault();
	const form = event.target;
	const formData = new FormData(form);
	const category = Object.fromEntries(formData.entries());

	const body = {
		nombre: category.name
	};

	const url = "http://localhost:5005/api/Categoria";
	const token = localStorage.getItem("authToken");
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(body),
	});

	if (response.status !== 200) {
		alert("Error al crear la categoría");
		return;
	}

	const redirectUrl = `${window.location.origin}/Admin/Categoria/create.html`;
	window.location.href = redirectUrl;
}
