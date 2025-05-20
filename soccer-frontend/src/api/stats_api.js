// src/api/stats_api.js
export const getStats = async () => {
	const res = await fetch('http://localhost:3000/api/stats');
	if (!res.ok) throw new Error('Error al obtener estadísticas');
	return res.json();
};

