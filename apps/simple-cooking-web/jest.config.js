module.exports = {
  name: 'simple-cooking-web',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/simple-cooking-web',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
