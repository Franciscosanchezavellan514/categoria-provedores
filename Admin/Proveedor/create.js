async function onCreateProvider(event) {
	event.preventDefault();
	const form = event.target;
	const formData = new FormData(form);
	const provider = Object.fromEntries(formData.entries());

	const body = {
		nombre: provider.name
	};

	const url = "http://localhost:5005/api/Proveedor";
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
		alert("Error al crear el proveedor");
		return;
	}

	const redirectUrl = `${window.location.origin}/Admin/Proveedor/create.html`;
	window.location.href = redirectUrl;
}
