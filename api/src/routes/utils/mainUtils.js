const {Post, User, Like, Comment, Follower} = require("../../db");

const getModels = async (model, name) => {
  let results;

  if (model) {
    if (model === Post) {
      if (name) {
        results = await model.findAll({
          where: { name },
          include: [
            {
              model: User,
              attributes: ["id", "username"],
              through: {attributes: []},
            },
            {
              model: Like,
              attributes: ["id", "user_id"],
              through: {attributes: []},
            },
            {
              model: Comment,
              attributes: ["id", "content", "media"],
              through: {attributes: []},
            },
          ],
        });
      } else {
        results = await model.findAll({
          include: [
            {
              model: User,
              attributes: ["id", "username"],
              through: {attributes: []},
            },
            {
              model: Like,
              attributes: ["id", "user_id"],
              through: {attributes: []},
            },
            {
              model: Comment,
              attributes: ["id", "content", "media"],
              through: {attributes: []},
            },
          ],
        });
      }
    } else {
      if (name) {
        results = await model.findAll({
          where: { name: name },
        });
      } else {
        results = await model.findAll();
      }
    }
    if (model === Post) {
      if (name) {
        results = await model.findAll({
          where: { name: name },
          include: [
            {
              model: User,
              attributes: ["id", "username"],
              through: {attributes: []},
            },
            {
              model: Like,
              attributes: ["id", "user_id"],
              through: {attributes: []},
            },
            {
              model: Comment,
              attributes: ["id", "content", "media"],
              through: {attributes: []},
            },
          ],
        });
      } else {
        results = await model.findAll({
          include: [
            {
              model: User,
              attributes: ["id", "username"],
              through: {attributes: []},
            },
            {
              model: Like,
              attributes: ["id", "user_id"],
              through: {attributes: []},
            },
            {
              model: Comment,
              attributes: ["id", "content", "media"],
              through: {attributes: []},
            },
          ],
        });
      }
    } else {
      if (name) {
        results = await model.findAll({
          where: { name: name },
        });
      } else {
        results = await model.findAll();
      }
    }
  } else {
    return null;
  }

  return results;
};

const getModelsById = async (model, id) => {
  let results;

  if (model) {
    if (id) {
      results = await model.findAll({
        where: { id },
      });
    } else {
      return null;
    }
  } else {
    return null;
  }

  return results;
};

const getModelsByEmail = async (model, mail) => {
  let results;

  if (model) {
    if (mail) {
      results = await model.findAll({
        where: { mail },
      });
    } else {
      return null;
    }
  } else {
    return null;
  }

  return results;
};

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
  getModels,
  getModelsById,
  postModels,
  putModels,
  deleteModels,
  restoreModels,
  getModelsByEmail
};
