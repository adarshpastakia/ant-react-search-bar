"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RsbFilterOperator = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _models = require("../utils/models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var RsbFilterOperator = function RsbFilterOperator(_ref) {
  var form = _ref.form,
      value = _ref.value,
      fieldType = _ref.fieldType,
      _ref$defaultValue = _ref.defaultValue,
      defaultValue = _ref$defaultValue === void 0 ? _models.Operator.EXISTS : _ref$defaultValue,
      onChange = _ref.onChange;

  var operators = _toConsumableArray(_models.TypeOperators[_models.Type.other]);

  if (fieldType && fieldType !== _models.Type.other) {
    operators.push.apply(operators, _toConsumableArray(_models.TypeOperators[fieldType]));
  }

  return _react.default.createElement(_antd.Form.Item, {
    label: "Operator",
    colon: false,
    required: false
  }, form.getFieldDecorator("operator", {
    rules: [{
      required: true
    }],
    initialValue: operators.includes(value) ? value : defaultValue
  })(_react.default.createElement(_antd.Select, {
    onChange: onChange,
    disabled: !fieldType
  }, operators.map(function (o) {
    return _react.default.createElement(_antd.Select.Option, {
      key: o,
      value: o
    }, _models.OperatorLabel[o]);
  }))));
};

exports.RsbFilterOperator = RsbFilterOperator;