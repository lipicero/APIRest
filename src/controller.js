import { pool } from "./database.js";

class libroController {
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const [result] = await pool.query("SELECT * FROM libros WHERE id = ?", [
        id,
      ]);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el libro" });
    }
  }
  async getAll(req, res) {
    try {
      const [result] = await pool.query("SELECT * FROM libros");
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los libros" });
    }
  }
  async add(req, res) {
    try {
      const { nombre, autor, categoria, año_publicacion, ISBN } = req.body;
      const [result] = await pool.query(
        "INSERT INTO libros (nombre, autor, categoria, año_publicacion, ISBN) VALUES (?, ?, ?, ?, ?)",
        [nombre, autor, categoria, año_publicacion, ISBN],
      );
      res.json({ "Libro agregado correctamente": result.insertId });
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
          error: "El ISBN ya existe",
        });
      }
      res.status(500).json({ error: "Error al agregar el libro" });
    }
  }
  async update(req, res) {
    try {
      const { nombre, autor, categoria, año_publicacion, ISBN, id } = req.body;
      const [result] = await pool.query(
        "UPDATE libros SET nombre = (?), autor = (?), categoria = (?), año_publicacion = (?), ISBN = (?) WHERE id = (?)",
        [nombre, autor, categoria, año_publicacion, ISBN, id],
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({
          error: "Libro no encontrado",
        });
      }
      res.json({ "Libro actualizado correctamente": result.changedRows });
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el libro" });
    }
  }
  async delete(req, res) {
    try {
      const { isbn } = req.params;

      const [result] = await pool.query("DELETE FROM libros WHERE ISBN = ?", [
        isbn,
      ]);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          error: "Libro no encontrado",
        });
      }

      res.json({
        message: "Libro eliminado correctamente",
      });
    } catch (error) {
      res.status(500).json({
        error: "Error al eliminar el libro",
      });
    }
  }
}

export const libro = new libroController();
