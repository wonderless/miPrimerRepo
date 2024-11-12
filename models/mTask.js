import db from "../config/db.js";

const mTask = {
  getAll: async () => {
    try {
      const [results] = await db.query("SELECT * FROM tasks");
      return results;
    } catch (err) {
      throw { status: 500, message: "Error al cargar las tareas" };
    }
  },
  getOne: async (id) => {
    try {
      const [results] = await db.query("SELECT * FROM tasks WHERE id = ?", [
        id,
      ]);
      return results[0];
    } catch (err) {
      throw {
        status: 500,
        message: `Error al obtener la tarea con el id ${id}`,
      };
    }
  },
  create: async (task, descripcion, imagen) => {
    try {
      await db.query(
        "INSERT INTO tasks (title, descripcion, imagen) VALUES (?, ?, ?)",
        [task.title, task.descripcion, task.imagen]
      );
    } catch (err) {
      throw { status: 500, message: "Error al crear la tarea" };
    }
  },
  update: async (task) => {
    try {
      await db.query("UPDATE tasks SET title = ? WHERE id = ?", [
        task.title,
        task.id,
      ]);
    } catch (err) {
      throw {
        status: 500,
        message: `Error al actualizar la tarea con el id ${task.id}`,
      };
    }
  },
  delete: async (id) => {
    try {
      await db.query("DELETE FROM tasks WHERE id = ?", [id]);
    } catch (err) {
      throw {
        status: 500,
        message: `Error al eliminar la tarea con el id ${id}`,
      };
    }
  },
};

export default mTask;
