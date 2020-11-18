const { Pool } = require('pg');

const PG_URI =
  'postgres://cntsjymq:OQj23OeyDf2pRbp47hpVfekLndD7RU66@drona.db.elephantsql.com:5432/cntsjymq';

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
