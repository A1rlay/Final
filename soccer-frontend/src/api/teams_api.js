// api/teams_api.js
export const getTeams = async () => {
	const res = await fetch('http://localhost:3000/api/teams');
	if (!res.ok) throw new Error('Error al obtener equipos');
	return res.json();
};

export const addTeam = async (teamData) => {
	const res = await fetch('http://localhost:3000/api/teams', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(teamData),
	});
	if (!res.ok) throw new Error('Error al agregar equipo');
	return res.json();
};

export const deleteTeam = async (id) => {
	const res = await fetch(`http://localhost:3000/api/teams/${id}`, {
		method: 'DELETE',
	});
	if (!res.ok) throw new Error('Error al eliminar equipo');
	return res.json();
};

export const updateTeam = async (id, updatedData) => {
	const res = await fetch(`http://localhost:3000/api/teams/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(updatedData),
	});
	if (!res.ok) throw new Error('Error al actualizar equipo');
	return res.json();
};

