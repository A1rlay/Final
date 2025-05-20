// src/api/players_api.js
const baseUrl = 'http://localhost:3000/api/players';

export const getPlayers = async () => {
	const res = await fetch(baseUrl);
	if (!res.ok) throw new Error('Error al obtener jugadores');
	return res.json();
};

export const addPlayer = async (playerData) => {
	const res = await fetch(baseUrl, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(playerData),
	});
	if (!res.ok) throw new Error('Error al agregar jugador');
	return res.json();
};

export const deletePlayer = async (id) => {
	const res = await fetch(`${baseUrl}/${id}`, {
		method: 'DELETE',
	});
	if (!res.ok) throw new Error('Error al eliminar jugador');
	return res.json();
};

export const updatePlayer = async (id, updatedData) => {
	const res = await fetch(`${baseUrl}/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(updatedData),
	});
	if (!res.ok) throw new Error('Error al actualizar jugador');
	return res.json();
};

