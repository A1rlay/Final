// src/api/players_api.js
const baseUrl = 'http://localhost:3000/api/matches';

export const getMatches = async () => {
	const res = await fetch(baseUrl);
	if (!res.ok) throw new Error('Error al obtener partidos');
	return res.json();
};

export const addMatch = async (matchData) => {
	const res = await fetch(baseUrl, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(matchData),
	});
	if (!res.ok) throw new Error('Error al agregar partido');
	return res.json();
};

export const deleteMatch = async (id) => {
	const res = await fetch(`${baseUrl}/${id}`, {
		method: 'DELETE',
	});
	if (!res.ok) throw new Error('Error al eliminar partido');
	return res.json();
};

export const updateMatch = async (id, updatedData) => {
	const res = await fetch(`${baseUrl}/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(updatedData),
	});
	if (!res.ok) throw new Error('Error al actualizar partido');
	return res.json();
};


