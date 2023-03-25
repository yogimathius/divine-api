import * as pgtools from 'pgtools';

const config = {
  user: 'yogimathius',
  password: 'password',
  port: 5432,
  host: 'localhost',
};

async function createDatabase() {
  try {
    await pgtools.createdb(config, 'graphql_freeflow');
    console.log('Database created successfully');
  } catch (err) {
    console.error('Error creating database', err);
  }
}

createDatabase();
