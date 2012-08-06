var grunt = require("grunt");

exports.dust = {
  main: function(test) {
    test.expect(1);

    var expectA = '(function(){dust.register("one",body_0);function body_0(chk,ctx){return chk.write("<p>Hello, my name is ").reference(ctx.get("name"),ctx,"h").write(".</p>");}return body_0;})();';
    var resultA = grunt.file.read("fixtures/output/dust.js");

    test.equal(expectA, resultA, "should compile dust template into JST");

    test.done();
  }
};