## Compile dust templates to JST file
> Contributed By: [Gunther Brunner](/gunta85) (@gunta85)

### Overview

Inside your `grunt.js` file, add a section named `dust`. This section specifies the files to compile and the options used with [dust.js](http://akdubya.github.com/dustjs/). 

Currently, it uses the [dust.js LinkedIn fork](http://linkedin.github.com/dustjs/), which is the most updated and mantained.

##### files ```object```

This defines what files this task will process and should contain key:value pairs.

The key (destination) should be an unique filepath (supports [grunt.template](https://github.com/cowboy/grunt/blob/master/docs/api_template.md)) and the value (source) should be a filepath or an array of filepaths (supports [minimatch](https://github.com/isaacs/minimatch)).

##### options ```object```

This controls how this task operates and should contain key:value pairs, see options below.

#### Options

##### fullname ```boolean```

Sets the template name as the full relative path. Default is **false**.



If this is set to **true**, the way to render a template will be:

``` javascript
dust.render("path/to/sourcefile.dust", {});
```

Instead of the default *(filename without the extension)*:

``` javascript
dust.render("sourcefile", {}, function(){});
```


#### Config Example

``` javascript
dust: {
  compile: {
    options: {
      fullname: true
    },
    files: {
      "path/to/result.js": "path/to/source.dust",
      "path/to/another.js": ["path/to/sources/*.dust", "path/to/more/*.dust"]
    }
  }
}
```
