const SpaceRepository = require('../repositories/SpaceRepository');

module.exports = {
    getAll: () => {
        return SpaceRepository.getAll();
    },

    get: (id) => {
        return SpaceRepository.get(id);
    },

    create: (data) => {
        return SpaceRepository.create(data);
    },

    update: (id, data) => {
        return SpaceRepository.update(id, data);
    },

    delete: (id) => {
        return SpaceRepository.delete(id);
    }
};
