import { pool } from "../db.js";

export const createProduct = async (req, res) => {
  const { name, price } = req.body;
  const [rows] = await pool.query(
    "INSERT INTO test.products (name, price) VALUES (?, ?)",
    [name, price]
  );
  console.log({ id: rows.insertId, name, price });
  res.json("Successfully created product");
};

export const getProducts = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM test.products");
  res.json(rows);
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  const [rows] = await pool.query(
    "SELECT * FROM test.products WHERE products.id = ?",
    [id]
  );

  if (rows.length < 1) {
    res.status(404).json("Not found");
  } else {
    res.json(rows[0]);
  }
};

export const updateProduct = async (req, res) => {
  const { name, price } = req.body;
  const { id } = req.params;

  const [result] = await pool.query(
    "UPDATE test.products SET name = IFNULL(?, name), price = IFNULL(?, price) WHERE id = ?",
    [name, price, id]
  );

  if (result.affectedRows === 0) {
    res.status(404).json("Not found");
  } else {
    const [rows] = await pool.query("SELECT * FROM test.products WHERE id = ?", [id]);

    res.json(rows[0]);
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const [rows] = await pool.query(
    "DELETE FROM test.products WHERE products.id = ?",
    [id]
  );

  if (rows.affectedRows < 1) {
    res.status(404).json("Not found");
  } else {
    res.json(`Successfully modified product id: ${id}`);
  }
};
