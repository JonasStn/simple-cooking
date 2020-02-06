module.exports = {
  name: 'feature-dashboard',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/feature-dashboard',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
