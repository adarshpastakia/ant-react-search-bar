"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RsbFilterValue = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _models = require("../utils/models");

var _FilterInput = require("./FilterInput");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RsbFilterValue = function RsbFilterValue(_ref) {
  var form = _ref.form,
      value = _ref.value,
      fieldType = _ref.fieldType,
      fieldValues = _ref.fieldValues,
      operator = _ref.operator,
      _onChange = _ref.onChange;
  var type = operator ? _models.OperatorValueType[operator] : "single";

  var validateRange = function validateRange(_, v, callback) {
    Array.isArray(value) && callback(v <= value[0] ? "Invalid range" : undefined);
  };

  return fieldType === _models.Type.date || type !== "double" ? _react.default.createElement(_antd.Form.Item, {
    label: "Value",
    colon: false,
    required: false
  }, !fieldValues && type !== "multiple" && form.getFieldDecorator("value", {
    rules: [{
      required: true
    }],
    initialValue: value
  })(_react.default.createElement(_FilterInput.RsbFilterInput, {
    type: fieldType,
    onChange: _onChange,
    isRange: type === "double"
  })), (fieldValues || type === "multiple") && form.getFieldDecorator("value", {
    rules: [{
      required: true
    }],
    initialValue: value || []
  })(_react.default.createElement(_antd.Select, {
    onChange: _onChange,
    mode: type === "multiple" ? "tags" : "default"
  }, fieldValues && fieldValues.map(function (v) {
    return _react.default.createElement(_antd.Select.Option, {
      key: v.key,
      value: v.key
    }, v.label);
  })))) : _react.default.createElement(_antd.Input.Group, {
    style: {
      display: "flex",
      flexFlow: "row nowrap"
    }
  }, _react.default.createElement(_antd.Form.Item, {
    label: "Min",
    colon: false,
    required: false
  }, form.getFieldDecorator("min", {
    rules: [{
      required: true
    }],
    initialValue: Array.isArray(value) && value.length && value[0] || undefined
  })(_react.default.createElement(_FilterInput.RsbFilterInput, {
    type: fieldType,
    onChange: function onChange(v) {
      return _onChange([v, Array.isArray(value) && value.length > 0 && value[1]]);
    }
  }))), _react.default.createElement("span", null, "\xA0"), _react.default.createElement(_antd.Form.Item, {
    label: "Max",
    colon: false,
    required: false
  }, form.getFieldDecorator("max", {
    rules: [{
      required: true,
      validator: validateRange
    }],
    initialValue: Array.isArray(value) && value.length > 1 && value[1] || undefined
  })(_react.default.createElement(_FilterInput.RsbFilterInput, {
    type: fieldType,
    onChange: function onChange(v) {
      return _onChange([Array.isArray(value) && value.length && value[0], v]);
    }
  }))));
};

exports.RsbFilterValue = RsbFilterValue;