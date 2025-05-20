// scripts/initDb.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

console.log(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

export const createDatabaseAndTables = async () => {
	const connection = await mysql.createConnection({
		host: DB_HOST,
		user: DB_USER,
		password: DB_PASSWORD,
	});

	// Crear base de datos si no existe
	await connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
	await connection.query(`USE ${DB_NAME}`);

	// Crear tablas
	await connection.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role ENUM('admin', 'user') DEFAULT 'user'
    )
  `);

	await connection.query(`
    CREATE TABLE IF NOT EXISTS teams (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      city VARCHAR(100),
      founded_year INT,
      stadium VARCHAR(100),
      coach VARCHAR(100),
      logo VARCHAR(255)
    )
  `);

	await connection.query(`
    CREATE TABLE IF NOT EXISTS players (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      team_id INT,
      nationality VARCHAR(70),
      position VARCHAR(50),
      number INT,
      age INT,
      goals INT DEFAULT 0,
      assists INT DEFAULT 0,
      yellow_cards INT DEFAULT 0,
      red_cards INT DEFAULT 0,
      FOREIGN KEY (team_id) REFERENCES teams(id)
    )
  `);

	await connection.query(`
    CREATE TABLE IF NOT EXISTS matches (
      id INT AUTO_INCREMENT PRIMARY KEY,
      home_team_id INT,
      away_team_id INT,
      match_date DATE,
      location VARCHAR(100),
      home_goals INT DEFAULT 0,
      away_goals INT DEFAULT 0,
      status varchar(100),
      FOREIGN KEY (home_team_id) REFERENCES teams(id),
      FOREIGN KEY (away_team_id) REFERENCES teams(id)
    )
  `);

	await connection.end();
};

if (import.meta.url === `file://${process.argv[1]}`) {
	createDatabaseAndTables()
		.then(() => {
			console.log('✅ Base de datos y tablas creadas con éxito');
		})
		.catch((err) => {
			console.error('❌ Error al crear la base de datos:', err);
		});
}
