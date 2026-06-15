import prisma from "../database/dbconfig.js";

const getAll = () => {
  return prisma.service.findMany();
};

const getByNama = async (namaLayanan) => {
  return await prisma.service.findFirst({
    where: { namaLayanan },
  });
};

const getById = (id) => {
  return prisma.service.findUnique({
    where: {
      id: Number(id),
    },
  });
};

const create = (data) => {
  return prisma.service.create({
    data,
  });
};

const update = (id, data) => {
  return prisma.service.update({
    where: {
      id: Number(id),
    },
    data,
  });
};

const remove = (id) => {
  return prisma.service.delete({
    where: {
      id: Number(id),
    },
  });
};

export default {
  getAll,
  getById,
  getByNama,
  create,
  update,
  delete: remove
};