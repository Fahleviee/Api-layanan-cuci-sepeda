import Joi from "joi";

export const orderValidationSchema = Joi.object({
  customerId: Joi.number().required().messages({
    "any.required": "Customer ID wajib diisi",
    "number.base": "Customer ID harus angka",
  }),

  serviceId: Joi.number().required().messages({
    "any.required": "Service ID wajib diisi",
    "number.base": "Service ID harus angka",
  }),

  status: Joi.string()
    .valid("proses", "selesai", "diambil")
    .default("proses"),

  totalHarga: Joi.number().min(0).messages({
    "number.base": "Total harga harus angka",
    "number.min": "Total harga tidak boleh negatif",
  }),
});