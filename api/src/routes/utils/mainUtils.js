// const {Post, User, Like, Comment, Follower} = require("../../db");

const postModels = async (model, properties) => {
  if (properties && model) {
    let newInstance = await model.create(properties);
    return newInstance;
  } else {
    return null;
  }
};

const putModels = async (model, id, properties) => {
  if (properties) {
    const updated = await model.update(properties, { where: { id } });
    return updated;
  } else return null;
};

const deleteModels = async (model, id) => {
  if (id) {
    const updatedInstance = await model.destroy({ where: { id } });
    return updatedInstance;
  } else return null;
};

const restoreModels = async (model, id) => {
  if (id) {
    const recoveredInstance = await model.restore({ where: { id } });
    return recoveredInstance;
  } else {
    return null;
  }
};

// const filterModelByRelation = async (firstModel, secondModel, param, id) => {
//   const instace = firstModel.findAll({
//     where: {
//       param,
//     },
//     include: [{ model: secondModel, where: { param: id } }],
//   })
// }

module.exports = {
  postModels,
  putModels,
  deleteModels,
  restoreModels,
};
