const Model = require('objection').Model;

class Institution extends Model {
  static tableName = 'institutions';

  static relationMappings = {
    contributions: {
      relation: Model.HasManyRelation,
      modelClass: `${__dirname}/Contribution`,
      join: {
        from: 'institutions.id',
        to: 'contributions.institution_id'        
      }
    }
  }
}

module.exports = Institution;