import { pool } from "../db.js";

export const createProduct = async (req, res) => {
  try {
    const { title, description, price, code, stock, category, status } =
      req.body;

    const [rows] = await pool.query(
      "INSERT INTO ecommerce.products (title, description, price, code, stock, category, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [title, description, price, code, stock, category, status]
    );

    const newProduct = {
      id: rows.insertId,
      title,
      description,
      price,
      code,
      stock,
      category,
      status,
    };

    res.status(201).json(newProduct);
  } catch (err) {
    return res.status(500).json("Something goes wrong");
  }
};

export const getProducts = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM ecommerce.products");
    res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json("Something goes wrong");
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      "SELECT * FROM ecommerce.products WHERE products.id = ?",
      [id]
    );

    if (rows.length < 1) {
      res.status(404).json("Not found");
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (err) {
    return res.status(500).json("Something goes wrong");
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { title, description, price, code, stock, category, status } =
      req.body;
    const { id } = req.params;

    const [result] = await pool.query(
      "UPDATE ecommerce.products SET title = IFNULL(?, title), description = IFNULL(?, description), price = IFNULL(?, price), code = IFNULL(?, code), stock = IFNULL(?, stock), category = IFNULL(?, category), status = IFNULL(?, status) WHERE id = ?",
      [title, description, price, code, stock, category, status, id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json("Not found");
    } else {
      const [rows] = await pool.query(
        "SELECT * FROM ecommerce.products WHERE id = ?",
        [id]
      );

      res.status(200).json(rows[0]);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something goes wrong");
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      "DELETE FROM ecommerce.products WHERE products.id = ?",
      [id]
    );

    if (rows.affectedRows < 1) {
      res.status(404).json("Not found");
    } else {
      res.status(200).json(`Successfully removed product id: ${id}`);
    }
  } catch (err) {
    return res.status(500).json("Something goes wrong");
  }
};
