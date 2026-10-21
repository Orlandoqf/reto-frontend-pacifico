module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: ['src/support/**/*.ts', 'src/steps/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'progress-bar',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json'
    ]
  }
};
