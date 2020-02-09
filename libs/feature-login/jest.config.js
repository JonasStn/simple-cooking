module.exports = {
  name: 'feature-login',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/feature-login',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
