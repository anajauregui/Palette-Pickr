// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/palette_picker',
    migrations: {
     directory: './db/migrations'
   },
    useNullAsDefault: true
},

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + `?ssl=true`,
    migrations: {
     directory: './db/migrations'
   },
    useNullAsDefault: true
  },

};
