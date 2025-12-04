import db from './db.js';
const TABLE_NAME = 'categories';
export default {
    all: async () => {
        return await db(TABLE_NAME).select("*");
    },
    create: async (category) => {
        return await db(TABLE_NAME).insert(category);
    },
    update: async (id, category) => {
        return await db(TABLE_NAME).where({id}).update(category);
    }
};