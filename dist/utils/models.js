"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OperatorLabel = exports.OperatorValueType = exports.TypeOperators = exports.Operator = exports.Type = void 0;

var _TypeOperators, _OperatorValueType, _OperatorLabel;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Type;
exports.Type = Type;

(function (Type) {
  Type["string"] = "string";
  Type["number"] = "number";
  Type["boolean"] = "boolean";
  Type["date"] = "date";
  Type["geo"] = "geo";
  Type["other"] = "other";
})(Type || (exports.Type = Type = {}));

var Operator;
exports.Operator = Operator;

(function (Operator) {
  Operator["EXISTS"] = "EXISTS";
  Operator["IS"] = "IS";
  Operator["IN"] = "IN";
  Operator["LT"] = "LT";
  Operator["GT"] = "GT";
  Operator["LTE"] = "LTE";
  Operator["GTE"] = "GTE";
  Operator["CONTAINS"] = "CONTAINS";
  Operator["STARTS"] = "STARTS";
  Operator["ENDS"] = "ENDS";
  Operator["WITHIN"] = "WITHIN";
  Operator["BETWEEN"] = "BETWEEN";
})(Operator || (exports.Operator = Operator = {}));

var TypeOperators = (_TypeOperators = {}, _defineProperty(_TypeOperators, Type.other, [Operator.EXISTS]), _defineProperty(_TypeOperators, Type.string, [Operator.IS, Operator.IN, Operator.CONTAINS, Operator.STARTS, Operator.ENDS]), _defineProperty(_TypeOperators, Type.number, [Operator.IS, Operator.BETWEEN, Operator.LT, Operator.GT, Operator.LTE, Operator.GTE]), _defineProperty(_TypeOperators, Type.boolean, [Operator.IS]), _defineProperty(_TypeOperators, Type.date, [Operator.IS, Operator.BETWEEN, Operator.LT, Operator.GT, Operator.LTE, Operator.GTE]), _defineProperty(_TypeOperators, Type.geo, []), _TypeOperators);
exports.TypeOperators = TypeOperators;
var OperatorValueType = (_OperatorValueType = {}, _defineProperty(_OperatorValueType, Operator.EXISTS, "single"), _defineProperty(_OperatorValueType, Operator.IS, "single"), _defineProperty(_OperatorValueType, Operator.IN, "multiple"), _defineProperty(_OperatorValueType, Operator.BETWEEN, "double"), _defineProperty(_OperatorValueType, Operator.WITHIN, "single"), _defineProperty(_OperatorValueType, Operator.STARTS, "single"), _defineProperty(_OperatorValueType, Operator.ENDS, "single"), _defineProperty(_OperatorValueType, Operator.CONTAINS, "single"), _defineProperty(_OperatorValueType, Operator.LT, "single"), _defineProperty(_OperatorValueType, Operator.GT, "single"), _defineProperty(_OperatorValueType, Operator.LTE, "single"), _defineProperty(_OperatorValueType, Operator.GTE, "single"), _OperatorValueType);
exports.OperatorValueType = OperatorValueType;
var OperatorLabel = (_OperatorLabel = {}, _defineProperty(_OperatorLabel, Operator.IS, "Is"), _defineProperty(_OperatorLabel, Operator.IN, "In"), _defineProperty(_OperatorLabel, Operator.EXISTS, "Exists"), _defineProperty(_OperatorLabel, Operator.BETWEEN, "Between"), _defineProperty(_OperatorLabel, Operator.WITHIN, "Within"), _defineProperty(_OperatorLabel, Operator.GT, ">"), _defineProperty(_OperatorLabel, Operator.LT, "<"), _defineProperty(_OperatorLabel, Operator.GTE, "≥"), _defineProperty(_OperatorLabel, Operator.LTE, "≤"), _defineProperty(_OperatorLabel, Operator.CONTAINS, "Includes"), _defineProperty(_OperatorLabel, Operator.STARTS, "Starts with"), _defineProperty(_OperatorLabel, Operator.ENDS, "Ends with"), _OperatorLabel);
exports.OperatorLabel = OperatorLabel;