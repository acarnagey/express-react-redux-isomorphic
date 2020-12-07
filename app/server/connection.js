import bookshelf from "bookshelf";
import config from "../../knexfile";
import knex from "knex";

export const kx = knex(config);
const orm = bookshelf(kx);
// Pagination plugin was moved into core Bookshelf. You can now use `fetchPage()` without having to call `.plugin('pagination')`
// orm.plugin('pagination');
export default orm;
// export default kx;
