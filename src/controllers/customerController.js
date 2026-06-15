import model from "../models/customerModel.js";

const getAll = async (req, res) => {
  try {
    const data = await model.getAll();

    return res.status(200).json({
      status: true,
      message: "Data customer berhasil diambil",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Terjadi kesalahan server",
      error: error.message,
    });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await model.getById(id);

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Customer tidak ditemukan",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Data customer ditemukan",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Terjadi kesalahan server",
      error: error.message,
    });
  }
};

const create = async (req, res) => {
  try {
    const { nama, noHp, alamat } = req.body;

    if (!nama) {
      return res.status(400).json({ status: false, message: "Nama wajib diisi" });
    }

    if (!noHp) {
      return res.status(400).json({ status: false, message: "No HP wajib diisi" });
    }

    if (!alamat) {
      return res.status(400).json({ status: false, message: "Alamat wajib diisi" });
    }

    const data = await model.create({ nama, noHp, alamat });

    return res.status(201).json({
      status: true,
      message: "Customer berhasil ditambahkan",
      data,
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({
        status: false,
        message: "No HP sudah digunakan",
      });
    }
    return res.status(500).json({
      status: false,
      message: "Terjadi kesalahan server",
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, noHp, alamat } = req.body;

    const existing = await model.getById(id);

    if (!existing) {
      return res.status(404).json({
        status: false,
        message: "Customer tidak ditemukan",
      });
    }

    const data = await model.update(id, { nama, noHp, alamat });

    return res.status(200).json({
      status: true,
      message: "Customer berhasil diupdate",
      data,
    });

  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({
        status: false,
        message: "No HP sudah digunakan",
      });
    }

    return res.status(500).json({
      status: false,
      message: "Terjadi kesalahan server",
      error: error.message,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;

    await model.delete(id);

    return res.status(200).json({
      status: true,
      message: "Customer berhasil dihapus",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Terjadi kesalahan server",
      error: error.message,
    });
  }
};

export default {
  getAll,
  getById,
  create,
  update,
  delete: destroy,
};