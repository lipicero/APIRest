import { pool } from "./database.js";

class libroController {
    async getAll(req, res) {
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
    }
    async add(req, res) {
        const { libros } = req.body;
        const [result] = await pool.query('INSERT INTO libros (nombre, autor, categoria, año_publicacion, ISBN) VALUES (?, ?, ?, ?, ?)', [libros.nombre, libros.autor, libros.categoria, libros.año_publicacion, libros.ISBN]);
        res.json({ "Libro agregado correctamente": result.insertId });
    }
    async delete(req, res) {
        const {libros} = req.body;
        const [result] = await pool.query('DELETE FROM libros WHERE id = (?)', [libros.id]);
        res.json({ "Libro eliminado correctamente": result.affectedRows });
    }
    async update(req, res) {
        const {libros} = req.body;
        const [result] = await pool.query('UPDATE libros SET nombre = (?), autor = (?), categoria = (?), año_publicacion = (?), ISBN = (?) WHERE id = (?)', [libros.nombre, libros.autor, libros.categoria, libros.año_publicacion, libros.ISBN, libros.id]);
        res.json({ "Libro actualizado correctamente": result.changedRows });
    }
}

export const libro = new libroController();