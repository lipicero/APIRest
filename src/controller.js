import { pool } from "./database.js";

class libroController {
    async getAll(req, res) {
        try{
            const [result] = await pool.query('SELECT * FROM libros');
            res.json(result);

        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los libros' });
        }
    }
    async add(req, res) {
        try{
            const { libros } = req.body;
            const [result] = await pool.query('INSERT INTO libros (nombre, autor, categoria, año_publicacion, ISBN) VALUES (?, ?, ?, ?, ?)', [libros.nombre, libros.autor, libros.categoria, libros.año_publicacion, libros.ISBN]);
            res.json({ "Libro agregado correctamente": result.insertId });
        } catch (error) {
            res.status(500).json({ error: 'Error al agregar el libro' });
        }
    }
    async delete(req, res) {
        try {
            const {libros} = req.body;
            const [result] = await pool.query('DELETE FROM libros WHERE id = (?)', [libros.id]);
            res.json({ "Libro eliminado correctamente": result.affectedRows });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el libro' });
        }
    }
    async update(req, res) {
        try {
            const {libros} = req.body;
            const [result] = await pool.query('UPDATE libros SET nombre = (?), autor = (?), categoria = (?), año_publicacion = (?), ISBN = (?) WHERE id = (?)', [libros.nombre, libros.autor, libros.categoria, libros.año_publicacion, libros.ISBN, libros.id]);
            res.json({ "Libro actualizado correctamente": result.changedRows });
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el libro' });
        }
    }
}

export const libro = new libroController();