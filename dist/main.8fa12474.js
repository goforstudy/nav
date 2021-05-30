// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"epB2":[function(require,module,exports) {
var links = JSON.parse(localStorage.getItem("links"));
var hasMap = links ? links : [{ logo: 'A', logoType: 'text', url: "https://www.acfun.cn" }, { logo: 'B', logoType: 'text', url: "https://bilibili.com" }];

var $siteList = $(".siteList");
var $last = $siteList.find("li.last");
function simplifyUrl(url) {
    return url.replace("http://", "").replace("https://", "").replace("www.", "").replace(/\/.*/, '');
}
// function removeLink (event,index) {
//     hasMap.splice(index, 1);
//     event.stopPropagation();
//     console.log(event, index,)
// }
var render = function render() {

    $siteList.find("li:not(.last)").remove();
    hasMap.forEach(function (node, index) {
        // const $li = $(
        // `
        // <li>
        //     <a href="${node.url}">
        //         <div class="site">
        //             <div class="remove">
        //                 <svg class="icon" aria-hidden="true">
        //                     <use xlink:href="#icon-delete"></use>
        //                 </svg>
        //             </div>
        //             <div class="logo">
        //                 ${node.logo}
        //             </div>
        //             <div class="link">
        //                 ${simplifyUrl(node.url)}
        //             </div>
        //         </div>
        //     </a>

        // </li>
        // `
        // ).insertBefore($last);
        var $li = $('\n        <li>\n                <div class="site">\n                    <div class="remove">\n                        <svg class="icon" aria-hidden="true">\n                            <use xlink:href="#icon-delete"></use>\n                        </svg>\n                    </div>\n                    <div class="logo">\n                        ' + node.logo + '\n                    </div>\n                    <div class="link">\n                        ' + simplifyUrl(node.url) + '\n                    </div>\n                </div>\n    \n        </li>\n        ').insertBefore($last);
        $li.on('click', function () {
            window.open(node.url);
        });
        $li.on('click', '.remove', function (e) {
            hasMap.splice(index, 1);
            render();
            e.stopPropagation();
        });
    });
};

render();
$(".addButton").on("click", function () {
    var url = window.prompt("请输入新增网址：");
    if (url.indexOf('http') !== 0 || url.indexOf('https') !== 0) {
        url = "https://" + url;
    }
    hasMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        logoType: 'text',
        url: url
    });
    render();
    // const $site = $(
    //     `
    //     <li>
    //         <a href="${url}">
    //             <div class="site">
    //                 <div class="logo">
    //                     ${url.split("//")[1][0].toLocaleUpperCase()}
    //                 </div>
    //                 <div class="link">${url}</div>
    //             </div>
    //         </a>

    //     </li>
    //     `
    // ).insertBefore($last)
});

window.onbeforeunload = function () {
    var str = JSON.stringify(hasMap);
    window.localStorage.setItem("links", str);
};

$(document).on("keypress", function (e) {
    var key = e.key;

    for (var i = 0; i < hasMap.length; i++) {
        if (hasMap[i].logo.toLowerCase() === key.toLowerCase()) {
            window.open(hasMap[i].url);
            break;
        }
    }
});
$(".search").on("keypress", function (e) {
    e.stopPropagation();
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.8fa12474.map