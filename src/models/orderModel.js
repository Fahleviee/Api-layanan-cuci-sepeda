import prisma from "../database/dbconfig.js";

const getAll = () => {
  return prisma.order.findMany({
    include: {
      customer: true,
      service: true,
    },
  });
};

const getById = (id) => {
  return prisma.order.findUnique({
    where: { id: Number(id) },
    include: {
      customer: true,
      service: true,
    },
  });
};

const create = (data) => {
  return prisma.order.create({
    data,
  });
};

const update = (id, data) => {
  return prisma.order.update({
    where: { id: Number(id) },
    data,
  });
};

const updateStatus = (id, status) => {
  return prisma.order.update({
    where: { id: Number(id) },
    data: { status },
  });
};

const destroy = (id) => {
  return prisma.order.delete({
    where: { id: Number(id) },
  });
};

export default {
  getAll,
  getById,
  create,
  update,
  updateStatus,
  delete: destroy,
};