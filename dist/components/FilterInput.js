"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RsbFilterInput = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _models = require("../utils/models");

var _antReactDateSelector = require("ant-react-date-selector");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RsbFilterInput = _react.default.forwardRef(function (_ref, ref) {
  var type = _ref.type,
      value = _ref.value,
      _ref$isRange = _ref.isRange,
      isRange = _ref$isRange === void 0 ? false : _ref$isRange,
      _onChange = _ref.onChange;

  switch (type) {
    case _models.Type.date:
      return _react.default.createElement(_antReactDateSelector.ReactDateSelector, {
        single: !isRange,
        value: value,
        onDateChange: _onChange
      });

    case _models.Type.number:
      return _react.default.createElement(_antd.InputNumber, {
        ref: ref,
        value: value,
        onChange: _onChange
      });

    case _models.Type.boolean:
      return _react.default.createElement(_antd.Switch, {
        ref: ref,
        checked: value || false,
        onChange: _onChange
      });

    default:
      return _react.default.createElement(_antd.Input, {
        ref: ref,
        disabled: !type,
        value: value,
        onChange: function onChange(e) {
          return _onChange(e.target.value);
        }
      });
  }
});

exports.RsbFilterInput = RsbFilterInput;