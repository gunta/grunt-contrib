/**
 * Task: Manifest
 * Description: Generates HTML5 Cache Manifest files
 * Contributor: @gunta85
 */

module.exports = function (grunt) {
  "use strict";

  var path = require("path"),
    fs = require("fs");

  grunt.registerMultiTask("manifest", "Generate HTML5 cache manifest", function () {

    // If we have a basePath, specify it
    if (this.data.options.basePath) {
      grunt.file.setBase(this.data.options.basePath);
    }

    // TODO: ditch this when grunt v0.4 is released
    this.files = this.files || grunt.helper("normalizeMultiTaskFiles", this.data, this.target);

    var options = grunt.helper("options", this, {timestamp: true});
    var verbose = true,
      done = this.async(),
      files = grunt.file.expandFiles(this.file.src),
      destFile = this.file.dest,
      contents = "CACHE MANIFEST\n",
      excludeFiles = options.exclude;

    grunt.verbose.writeflags(options, "Options");


    // "src" is required
    if (!this.file.src) {
      grunt.fatal("Need to specify source directory for the files.", 2);
    }

    // Set default destination file
    if (!destFile) {
      destFile = "manifest.appcache";
    }

    if (verbose) {
      contents += "# This manifest was generated by grunt-contrib HTML5 Cache Manifest Generator\n";
    }
    if (options.timestamp) {
      contents += "# Time: " + new Date() + "\n";
    }

    // Cache section
    contents += "\nCACHE:\n";

    // Exclude files
    if (excludeFiles) {
      files = files.filter(function (item) {
        return excludeFiles.indexOf(item) === -1;
      });
    }

    // Add files to explicit cache
    files.forEach(function (item) {
      contents += item + "\n";
    });

    // Network section
    if (options.network) {
      contents += "\nNETWORK:\n";
      options.network.forEach(function (item) {
        contents += item + "\n";
      });
    } else {
      // If there's no network section, add a default "*" wildcard
      contents += "\nNETWORK:\n";
      contents += "*\n";
    }

    // Fallback section
    if (options.fallback) {
      contents += "\nFALLBACK:\n";
      options.fallback.forEach(function (item) {
        contents += item + "\n";
      });
    }

    // Settings section
    if (options.preferOnline) {
      contents += "\nSETTINGS:\n";
      contents += "prefer-online\n";
    }

    // Write file to disk
    fs.writeFile(destFile, contents, function (err) {
      grunt.log.write("Creating cache manifest file '" + destFile + "'...");

      if (err) {
        grunt.fatal("Error generating Cache Manifest file", 3);
        throw err;
      } else {
        grunt.log.ok();
      }

      grunt.verbose.writeln("\n" + (contents).yellow);

      done();
    });
  });
};
