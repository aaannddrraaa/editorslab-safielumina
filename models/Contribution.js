const Model = require('objection').Model;

class Contribution extends Model {
  static tableName = 'contributions';

  static relationMappings = {
    institution: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/Institution`,
      join: {
        from: 'contributions.institution_id',
        to: 'institutions.id'
      }
    }
  }
}

module.exports = Contribution;