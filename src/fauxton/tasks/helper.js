// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.

var fs = require('fs'),
    path = require('path');

exports.init = function(grunt) {
  var _ = grunt.util._;

  return { 
    readSettingsFile: function () {
      if (fs.existsSync("settings.json")) {
        return grunt.file.readJSON("settings.json");
      } else if (fs.existsSync("settings.json.default")) {
        return grunt.file.readJSON("settings.json.default");
      } else {
        return {deps: []};
      }
    },

    processAddons: function (callback) {
      this.readSettingsFile().deps.forEach(callback);
    },

    watchFiles: function (fileExtensions, defaults) {
      return _.reduce(this.readSettingsFile().deps, function (files, dep) { 
        if (dep.path) { 
          _.each(fileExtensions, function (fileExtension) {
            files.push(path.join(dep.path, '**/*' + fileExtension ));
          });
        }
        return files
      }, defaults);

    }
  };
};
