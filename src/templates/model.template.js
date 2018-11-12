module.exports = `module.exports = (sequelize, DataTypes) => {
  const {{model}} = sequelize.define(
    "{{modelLowercase}}",
    {
      {{#fields}}
      {{name}}: { type: DataTypes.{{type}} },
      {{/fields}}
    },
    {}
  );
  {{model}}.associate = function(models) {
    {{#relationships}}
    {{model}}.{{type}}(models.{{target}});
    {{/relationships}}
  }
  return {{model}};
}`;
