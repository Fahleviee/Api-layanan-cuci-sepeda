import prisma from "../database/dbconfig.js";

const getAll = () => prisma.customer.findMany();

const getById = (id) =>
  prisma.customer.findUnique({
    where: { id: Number(id) },
  });

const create = (data) =>
  prisma.customer.create({
    data,
  });

const update = (id, data) =>
  prisma.customer.update({
    where: { id: Number(id) },
    data,
  });

const remove = (id) =>
  prisma.customer.delete({
    where: { id: Number(id) },
  });

export default { 
  getAll, 
  getById, 
  create, 
  update, 
  delete: remove };