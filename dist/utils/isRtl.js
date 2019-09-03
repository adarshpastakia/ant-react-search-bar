"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useIsLtr = void 0;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useIsLtr = function useIsLtr() {
  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      isLtr = _useState2[0],
      setIsLtr = _useState2[1];

  var ref = (0, _react.useCallback)(function (node) {
    if (node !== null) {
      setIsLtr((node ? getComputedStyle(node).direction : "ltr") !== "rtl");
    }
  }, []);
  return [isLtr, ref];
};

exports.useIsLtr = useIsLtr;