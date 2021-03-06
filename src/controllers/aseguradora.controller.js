const { NotFoundError } = require('../utils/errors');
const mongoose = require('mongoose');

const Aseguradora = require('../models/schemas/Aseguradora');

const aseguradoraController = {
  get: async function () {
    const aseguradora = await Aseguradora.find();
    return aseguradora;
  },
  getByNombre: async function (nombre) {
    const aseguradora = await Aseguradora.findOne({
      nombre: nombre
    });
    if (aseguradora === {}) throw new NotFoundError(`${nombre
      } not found.`);
    return aseguradora;
  },
  create: async function (nombre, RFC, telefono) {
    const aseguradora = await Aseguradora.create({
      nombre: nombre,
      RFC: RFC,
      telefono: telefono
    });
    return aseguradora;
  },
  update: async function (nombre, RFC, telefono) {
    const aseguradora = await Aseguradora.findOne({ nombre: nombre })
    if (aseguradora !== {}) {
      await Aseguradora.findOneAndUpdate({ nombre: nombre },
        {
          nombre: nombre,
          RFC: RFC,
          telefono: telefono
        });
    }
    throw new NotFoundError(`RFC ${RFC} not associated to any account`);
  },
  delete: async function (RFC) {
    const aseguradora = await Aseguradora.findOneAndRemove({ RFC: RFC });
    if (aseguradora === {}) {
      throw new NotFoundError(`RFC ${RFC} not associated to any account`);
    }
    return aseguradora;
  }
};

module.exports = aseguradoraController;