/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;
canvas.style.backgroundColor = '#0D1218';

var mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

var colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];
var PLANET_COLOR = '#ecf0f1';

// Event Listeners
addEventListener('mousemove', function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

// Objects
function Planet(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
}

Object.prototype.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
};

Object.prototype.update = function () {
    this.draw();
};

// Implementation
var planets = void 0;
var asteroids = void 0;
function init() {
    planets = [];
    asteroids = [];

    for (var i = 0; i < 500; i++) {

        var x = Math.floor(Math.random() * Math.floor(window.innerWidth));
        var y = Math.floor(Math.random() * Math.floor(window.innerHeight));
        var radius = Math.floor(Math.random() * Math.floor(3));
        var velocity = Math.floor(Math.random() * Math.floor(10));

        planets.push(new Planet(x, y, radius, PLANET_COLOR, radius * 0.2));
    }

    for (var j = 0; j < 1; j++) {
        var x = Math.floor(Math.random() * Math.floor(window.innerWidth));
        var y = Math.floor(Math.random() * Math.floor(window.innerHeight));
        asteroids.push(new Planet(x, y, 3, '#F9E79F', 5));
    }
}

// Animation Loop
var asteroid_timeout = 255;
var curAsteroidTimeout = 0;
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    // c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
    planets.forEach(function (planet) {
        if (planet.y + planet.radius <= 0) {
            planet.y = window.innerHeight;
        } else if (planet.x + planet.radius <= 0) {
            planet.x = window.innerWidth;
        } else {
            planet.y -= planet.velocity;
            planet.x -= planet.velocity;
        }
        planet.update();
    });

    asteroids.forEach(function (asteroid) {

        if (asteroid.y + asteroid.radius <= 0 || asteroid.x + asteroid.radius <= 0) {

            if (asteroid_timeout != curAsteroidTimeout) {
                curAsteroidTimeout++;
                console.log("curTimeout:" + curAsteroidTimeout + " | Gap: " + (asteroid_timeout - curAsteroidTimeout));
            } else {

                if (asteroid.y + asteroid.radius <= 0) {
                    asteroid.y = window.innerHeight + Math.floor(Math.random() * Math.floor(1200));
                }

                if (asteroid.x + asteroid.radius <= 0) {
                    asteroid.x = window.innerWidth + Math.floor(Math.random() * Math.floor(1200));
                }

                curAsteroidTimeout = 0;
                asteroid_timeout = Math.floor(Math.random() * Math.floor(765));
                asteroid.radius = Math.floor(Math.random() * Math.floor(3));
                console.log("Asteroid X:" + asteroid.x + " Y:" + asteroid.y + " | New Timeout: " + asteroid_timeout + " | New Radius: " + asteroid.radius);
            }
        } else {
            asteroid.y -= asteroid.velocity;
            asteroid.x -= asteroid.velocity;
        }

        asteroid.update();
    });
}

init();
animate();

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
    var xDist = x2 - x1;
    var yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

module.exports = { randomIntFromRange: randomIntFromRange, randomColor: randomColor, distance: distance };

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map