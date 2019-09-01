"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RsbFilterButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _typestyle = require("typestyle");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var css = (0, _typestyle.stylesheet)({
  filterButton: {
    userSelect: "none",
    cursor: "pointer",
    $nest: {
      "&&": {
        display: "flex",
        flexFlow: "row nowrap",
        alignItems: "center"
      },
      "&:hover label": {
        cursor: "pointer",
        textDecoration: "underline"
      },
      "& sup": {
        borderRadius: 4,
        height: 16,
        lineHeight: "1.5em",
        minWidth: "1em",
        fontWeight: "bold",
        fontSize: ".8em",
        margin: "0 4px"
      }
    }
  }
});

var RsbFilterButton = function RsbFilterButton(_ref) {
  var collapsed = _ref.collapsed,
      onCollapsed = _ref.onCollapsed,
      filterCount = _ref.filterCount;
  return _react.default.createElement(_antd.Tag, {
    className: css.filterButton,
    onClick: onCollapsed
  }, _react.default.createElement("label", {
    style: {
      fontWeight: collapsed ? "normal" : "bold"
    }
  }, "Filters"), _react.default.createElement(_antd.Badge, {
    showZero: true,
    count: filterCount,
    style: {
      backgroundColor: collapsed ? "rgba(0,0,0,.1)" : "#1890ff",
      color: collapsed ? "rgba(0,0,0,.6)" : "white"
    }
  }));
};

exports.RsbFilterButton = RsbFilterButton;