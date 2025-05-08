async function onCreateProvider(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const provider = Object.fromEntries(formData.entries());

    // Estructura del cuerpo de la solicitud para el backend
    const body = {
        idProveedor: 0, // Este campo es 0 porque lo gestiona el backend
        nombreEmpresa: provider.nombreEmpresa,
        direccion: provider.direccion,
        telefono: provider.telefono,
        email: provider.email,
    };

    const url = "http://localhost:5005/api/Proveedor"; // URL correcta de tu API
    const token = localStorage.getItem("authToken");
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });

    if (response.status !== 201) {
        alert("Error al crear el proveedor");
        return;
    }

    // Redirige al formulario de creación del proveedor después de éxito
    const redirectUrl = `${window.location.origin}/Admin/Proveedor/create.html`;
    window.location.href = redirectUrl;
}
