/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('users', {
    id: 'id',
    name: { type: 'varchar(256)', notNull: true },
    email: { type: 'varchar(256)', notNull: true },
    password: { type: 'varchar(256)', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
};

exports.down = pgm => {
  pgm.dropTable('users');
};
