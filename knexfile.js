module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'church_contributions'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'postgres://jsanbsxqwjftir:0fa2fd0608dd3e9756de5b0234d2caf900d2abc837611ee9a2d9d04aee1c90fa@ec2-54-243-63-13.compute-1.amazonaws.com:5432/dfcuikgfage4kd'
    }
  } 
};