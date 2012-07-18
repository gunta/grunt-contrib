var grunt = require("grunt");

exports.manifest = {
  main: function(test) {
    test.expect(1);

    // TODO: there's a TIME string
    var expectA = "";
    var resultA = grunt.file.read("fixtures/manifest/manifest.appcache");

    test.equal(expectA, resultA, "should generate a cache manifest");

    test.done();
  }
};