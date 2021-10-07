// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
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
      localRequire.cache = {};

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

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
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
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $('.siteList');
var $lastLi = $siteList.find('li.last'); //console.log($siteList)如果控制台出现了0：ul.siteList说明找对了，这里的0是伪数组

var x = localStorage.getItem('x'); //从本地的储存里面读取储存数值后

var xObject = JSON.parse(x); //把字符串变成对象,对应 

var hashMap = xObject || [{
  logo: 'A',
  url: 'https://www.acfun.cn'
}, {
  logo: 'B',
  url: 'https://www.bilibili.com'
}]; //因为用了Prompt，所以不能定义hashMap，不用担心会被污染;logoType:'text'

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www', '').replace(/\/.*/, '');
}; //simplifyUrl = removeX;/.*是/连接后面那些东西变空,删除 /开头的内容


var render = function render() {
  $siteList.find('li:not(.last)').remove(); //除了最后一项，全部清空，不然新增网址，会附带前面的网址，重复
  //渲染之前把之前删掉，再渲染新的

  hashMap.forEach(function (node, index) {
    //forEach会给你两个参数，一个是当前参数，一个是下标
    //console.log(index);
    var $li = $("<li>\n        <div class=\"site\">    \n            <div class=\"logo\">".concat(node.logo[0], "</div>\n            <div class=\"link\">").concat(simplifyUrl(node.url), "</div>\n            <div class='close'> \n              <svg class=\"icon\">\n                <use xlink:href=\"#icon-close\"></use>\n              </svg>\n            </div>\n        </div> \n    </li>")).insertBefore($lastLi);
    $li.on('click', function () {
      window.open(node.url);
    });
    $li.on('click', '.close', function (e) {
      console.log('这里执行了'); //调查哪里出问题，这里执行正常

      e.stopPropagation(); //监听close的工具组，阻止冒泡:event.stopPropagation()

      console.log(hashMap);
      hashMap.splice(index, 1); //数组里面删除是用splice

      render();
    });
  });
};

render();
$('.addButton').on('click', function () {
  var url = window.prompt('请问你要添加的网址是啥？'); //const赋值是唯一的，所有改成用let
  //console.log(1)调试大法，看是否有正常运行
  //console.log(url) //测试url是否等于用户输入的网址

  if (url.indexOf('http') !== 0) {
    url = 'https://' + url; //alert('请输入http开头的网址')
  }

  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    //logoType:'text',
    url: url
  }); //toUpperCase()是把首字母改成大写字母

  render(); //const $li = $(`<li>
  //<a href="${url}">   
  //<div class="site">    
  //<div class="logo">${url[8]}</div> 
  //<div class="link">${url}</div>
  // </div>
  //</a> 
  // </li>`).insertBefore($lastLi)
  //这里的``是反引号，再tap上面那个键,新增空白卡片;${url}插值法；${url[0]网址的第一个字符}
});

window.onbeforeunload = function () {
  //console.log('页面要关闭了')控制台设置选择preserve log，就可以看的这句话了
  var string = JSON.stringify(hashMap); //JSON.stringify可以把对象变成字符串
  //console.log(typeof hashMap)
  //console.log(hashMap)
  //console.log(typeof string) //查看类型
  //console.log(string)//变成字符串就可以储存

  localStorage.setItem('x', string); //这里省略了window，是全局变量，括号里面（key,value）
  //在本地的储存里面设置一个x，它的值就是这个string
}; //document.addEventListener等同于下面那句话


$(document).on('keypress', function (e) {
  //const key = e.key 当key与e.key是一样的，就可以简写成以下代码：
  var key = e.key;

  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      //当hashmap的第i个的logo的小写后 等于 key这个值，
      window.open(hashMap[i].url); //说明用户找的就是这个，然后打开这个网址
    }
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.f7b1ec5b.js.map