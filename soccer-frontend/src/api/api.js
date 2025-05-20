import * as teamsApi from './teams_api';
import * as playersApi from './players_api';
import * as matchesApi from './matches_api';

export const createDb = async () => {
	const response = await fetch('http://localhost:3000/api/init');
	if (!response.ok) throw new Error('Error creando la base de datos');
	return response.json();
};


export const registerUser = async (userData) => {
	const res = await fetch('http://localhost:3000/api/auth/register', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(userData),
	});
	if (!res.ok) {
		const err = await res.json();
		throw new Error(err.message || 'Error al registrar');
	}
	return res.json();
};

export const loginUser = async (userData) => {
	const res = await fetch('http://localhost:3000/api/auth/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(userData),
	});
	if (!res.ok) {
		const err = await res.json();
		throw new Error(err.message || 'Error al iniciar sesión');
	}
	return res.json();
};

export {
	teamsApi,
	playersApi,
	matchesApi
}
