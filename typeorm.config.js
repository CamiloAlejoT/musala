module.exports = {
    type: 'sqlite',
    database: 'data.db',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  };
  