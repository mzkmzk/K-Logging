/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _ImageViewer = __webpack_require__(1);

	var _ImageViewer2 = _interopRequireDefault(_ImageViewer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	if (typeof module != 'undefined' && module.exports) {
	    module.exports = _ImageViewer2.default;
	} else if (true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	        return _ImageViewer2.default;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
	    window.ImageViewer = _ImageViewer2.default;
	}
	window.ImageViewer = _ImageViewer2.default;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	//import defaultOptions from './DefaultOptions'
	var defaultOptions = [];

	var ImageViewer = function () {
	    function ImageViewer(element) {
	        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOptions;

	        _classCallCheck(this, ImageViewer);

	        this.element = element;
	        this.options = options;
	        this.fullArticle = this.createFullArticle();

	        this.init();
	    }

	    _createClass(ImageViewer, [{
	        key: 'init',
	        value: function init() {
	            var element = this.element,
	                elementLength = element.length,
	                fullArticle = this.fullArticle,
	                fullArticleUl = this.fullArticle.firstElementChild;

	            for (var i = 0; i < elementLength; i++) {
	                element[i].onClick = function (event) {
	                    fullArticle.style.display = '';
	                };
	                fullArticleUl.innerHTML += '<li><img src="' + element[i].src + '"/></li>';
	            }
	        }
	    }, {
	        key: 'createFullArticle',
	        value: function createFullArticle() {
	            var fullArticle = document.createElement('article'),
	                fullUl = document.createElement('ul'),
	                fullArticleHeight = window.innerHeight;

	            fullArticle.style.cssText = 'position: fixed; width: 100%; height: ' + fullArticleHeight + '; display: none;';

	            fullArticle.appendChild(fullUl);
	            document.body.appendChild(fullArticle);

	            fullArticle.onClick = function (event) {
	                var target = event.target;
	                target.style.display = 'none';
	            };
	            return fullArticle;
	        }
	    }]);

	    return ImageViewer;
	}();

		exports.default = ImageViewer;

/***/ }
/******/ ]);
//# sourceMappingURL=index.bundle.js.map