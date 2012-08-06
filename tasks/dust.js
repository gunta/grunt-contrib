/**
 * Task: dust
 * Description: Compile dust templates to JST file
 * Dependencies: dustjs-linkedin
 * Contributor: @gunta85
 */

module.exports = function (grunt) {
  "use strict";

  grunt.registerMultiTask("dust", "Compile dust templates to JST file", function () {
    var options = grunt.helper("options", this, {fullname: false});

    grunt.verbose.writeflags(options, "Options");

    // TODO: ditch this when grunt v0.4 is released
    this.files = this.files || grunt.helper("normalizeMultiTaskFiles", this.data, this.target);

    this.files.forEach(function (file) {
      var srcFiles = grunt.file.expandFiles(file.src);
      var taskOutput = [];

      srcFiles.forEach(function (srcFile) {
        var sourceCode = grunt.file.read(srcFile);
        var sourceCompiled = grunt.helper("dust", sourceCode, srcFile, options.fullname);

        taskOutput.push(sourceCompiled);
      });

      if (taskOutput.length > 0) {
        grunt.file.write(file.dest, taskOutput.join("\n"));
        grunt.log.writeln("File '" + file.dest + "' created.");
      }
    });
  });

  grunt.registerHelper("dust", function (source, filepath, fullFilename) {
    var path = require("path");
    var dust = require("dustjs-linkedin");

    try {
      var name;
      if (fullFilename) {
        name = filepath;
      } else {
        // Sets the name of the template as the filename without the extension
        // Example: "fixtures/dust/one.dust" > "one"
        name = path.basename(filepath, path.extname(filepath));
      }

      var output = dust.compile(source, name);
      return output;
    } catch (e) {
      grunt.log.error(e);
      grunt.fail.warn("Dust failed to compile.");
    }
  });
};
