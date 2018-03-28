exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('institutions', function (table) {
      table.increments('id').primary();    
      table.string('county');
      table.string('name');
      table.string('type');
      table.timestamps();
    }),

    knex.schema.createTable('contributions', function (table) {
      table.increments('id').primary(); 
      table.integer('insitution_id')
           .references('id')
           .inTable('institutions');            
      table.integer('year');
      table.integer('value');
      table.string('purpose');
      table.timestamps();
    }) 
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('contributions'),
    knex.schema.dropTable('institutions')      
  ]);
};
