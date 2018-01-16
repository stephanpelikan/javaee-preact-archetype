/*
 * see https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31
 */
"use strict";

class IdentifierNormalModulesPlugin {
   apply(compiler) { 
      compiler.plugin("compilation", (compilation) => { 
         compilation.plugin("before-module-ids", (modules) => { 
            modules.forEach((module) => { 
               if (module.id !== null) { 
                  return; 
               } 
               module.id = module.identifier(); 
            }); 
         }); 
      }); 
   }
}

module.exports = IdentifierNormalModulesPlugin;

