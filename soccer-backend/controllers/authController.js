import bcrypt from 'bcrypt';
import { createUser, findUserByUsername } from '../models/userModel.js';

export async function register(req, res) {
	const { username, password } = req.body;

	try {
		const existingUser = await findUserByUsername(username);
		if (existingUser) return res.status(400).json({ message: 'Usuario ya existe' });

		const hashedPassword = await bcrypt.hash(password, 10);
		const userId = await createUser(username, hashedPassword);

		res.status(201).json({ message: 'Usuario registrado', userId });
	} catch (error) {
		res.status(500).json({ message: 'Error al registrar usuario', error });
	}
}

export async function login(req, res) {
	const { username, password } = req.body;

	try {
		const user = await findUserByUsername(username);
		if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

		res.status(200).json({ message: 'Inicio de sesión exitoso', user: { id: user.id, username: user.username, role: user.role } });
	} catch (error) {
		res.status(500).json({ message: 'Error al iniciar sesión', error });
	}
}

