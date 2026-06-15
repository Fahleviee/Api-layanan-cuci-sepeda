import model from "../models/orderModel.js";
import validator from "../validators/validator.js";
import { orderValidationSchema } from "../validators/orderValidator.js";
import serviceModel from "../models/serviceModel.js";
import customerModel from "../models/customerModel.js";

const getAll = async (req, res) => {
  try {
    const data = await model.getAll();

    return res.status(200).json({
      status: true,
      message: "Data order berhasil diambil",
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
        message: "Order tidak ditemukan",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Data order ditemukan",
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
    const { error, value } = validator(orderValidationSchema, req.body);

    if (error) {
      return res.status(400).json({
        status: false,
        message: "Validasi gagal",
        error,
      });
    }

    // ambil data service
    const service = await serviceModel.getById(value.serviceId);

    if (!service) {
      return res.status(404).json({
        status: false,
        message: "Service tidak ditemukan",
      });
    }

    const data = await model.create({
      customerId: Number(value.customerId),
      serviceId: Number(value.serviceId),
      status: "proses",
      totalHarga: service.harga,
    });

    return res.status(201).json({
      status: true,
      message: "Order berhasil dibuat",
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
    const { customerId, serviceId, status, totalHarga } = req.body;

    const existingOrder = await model.getById(id);

    if (!existingOrder) {
      return res.status(404).json({
        status: false,
        message: "Order tidak ditemukan",
      });
    }

    const existingCustomer = await customerModel.getById(customerId);
    if (!existingCustomer) {
      return res.status(404).json({
        status: false,
        message: "ID Customer tidak ditemukan",
      });
    }

    const existingService = await serviceModel.getById(serviceId);
    if (!existingService) {
      return res.status(404).json({
        status: false,
        message: "ID Service tidak ditemukan",
      });
    }

    const data = await model.update(id, {
      customerId: Number(customerId),
      serviceId: Number(serviceId),
      status,
      totalHarga: Number(totalHarga),
    });

    return res.status(200).json({
      status: true,
      message: "Order berhasil diupdate",
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

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowed = ["proses", "selesai", "diambil"];

    if (!status) {
      return res.status(400).json({
        status: false,
        message: "Status wajib diisi",
      });
    }

    if (!allowed.includes(status)) {
      return res.status(400).json({
        status: false,
        message: "Status tidak valid",
        allowed,
      });
    }

    const data = await model.updateStatus(id, status);

    return res.status(200).json({
      status: true,
      message: "Status berhasil diupdate",
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

const destroy = async (req, res) => {
  try {
    const { id } = req.params;

    await model.delete(id);

    return res.status(200).json({
      status: true,
      message: "Order berhasil dihapus",
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
  updateStatus,
  delete: destroy,
};