import model from "../models/serviceModel.js";

const getAll = async (req, res) => {
  try {
    const data = await model.getAll();
    return res.status(200).json({
      status: true,
      message: "Data service berhasil diambil",
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

    if (!id || isNaN(id)) {
      return res.status(400).json({
        status: false,
        message: "ID service tidak valid",
      });
    }

    const data = await model.getById(id);

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Service tidak ditemukan",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Data service ditemukan",
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
    const { namaLayanan, harga, estimasiWaktu } = req.body;
    const existing = await model.getByNama(namaLayanan);

    if (existing) {
      return res.status(400).json({
        status: false,
        message: "Nama layanan sudah digunakan",
      });
    }

    if (!namaLayanan) {
      return res.status(400).json({
        status: false,
        message: "Nama layanan wajib diisi",
      });
    }

    if (!harga) {
      return res.status(400).json({
        status: false,
        message: "Harga wajib diisi",
      });
    }

    if (!estimasiWaktu) {
      return res.status(400).json({
        status: false,
        message: "Estimasi waktu wajib diisi",
      });
    }

    const data = await model.create({
      namaLayanan,
      harga: Number(harga),
      estimasiWaktu,
    });

    return res.status(201).json({
      status: true,
      message: "Service berhasil ditambahkan",
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

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { namaLayanan, harga, estimasiWaktu } = req.body;
    const existing = await model.getByNama(namaLayanan);
    const exisitingid = await model.getById(id)
    
    if (!exisitingid){
      return res.status(404).json({
        status: false,
        message: "Service tidak ditemukan",
      });
    }

    if (existing && existing.id != id) {
      return res.status(400).json({
        status: false,
        message: "Nama layanan sudah digunakan",
      });
    }

    const data = await model.update(id, {
      namaLayanan,
      harga: Number(harga),
      estimasiWaktu,
    });

    return res.status(200).json({
      status: true,
      message: "Service berhasil diupdate",
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

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const exisitingid = await model.getById(id)
    
    if (!exisitingid){
      return res.status(404).json({
        status: false,
        message: "ID Service tidak ditemukan",
      });
    }

    if (!id || isNaN(id)) {
      return res.status(400).json({
        status: false,
        message: "ID service tidak valid",
      });
    }

    await model.delete(id);

    return res.status(200).json({
      status: true,
      message: "Service berhasil dihapus",
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
  delete: remove
};