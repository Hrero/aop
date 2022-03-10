var __webpack_modules__ = [
  ,
  (module, __unused_webpack_exports, __webpack_require__) => {
    const hello = __webpack_require__(2);
    const content = __webpack_require__(3);
    console.log(hello, "hello", content);
    module.exports = "hello sunny!";
  },
  module => {
    module.exports = {
      hello: 1
    };
  },
  (module, __unused_webpack_exports, __webpack_require__) => {
    const hello = __webpack_require__(2);
    module.exports = {
      content: "content"
    };
  }
];
var __webpack_module_cache__ = {};
function __webpack_require__(moduleId) {
  var cachedModule = __webpack_module_cache__[moduleId];
  if (cachedModule !== undefined) {
    return cachedModule.exports;
  }
  var module = (__webpack_module_cache__[moduleId] = {
    exports: {}
  });
  __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
  return module.exports;
}
var __webpack_exports__ = {};
(() => {
  const hello = __webpack_require__(1);
  console.log(hello);
})();
