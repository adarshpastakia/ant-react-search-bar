"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RsbFilterButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RsbFilterButton = function RsbFilterButton(_ref) {
  var collapsed = _ref.collapsed,
      onCollapsed = _ref.onCollapsed,
      filterCount = _ref.filterCount;
  return _react.default.createElement(_antd.Tag, {
    className: "arsb-filter__button",
    onClick: onCollapsed
  }, _react.default.createElement("label", {
    style: {
      fontWeight: collapsed ? "normal" : "bold"
    }
  }, "Filters"), _react.default.createElement(_antd.Badge, {
    showZero: true,
    className: collapsed ? "collapsed" : "expanded",
    count: filterCount
  }));
};

exports.RsbFilterButton = RsbFilterButton;