"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleOperator = exports.tagOperator = exports.operatorLabel = exports.isNot = void 0;

var _models = require("./models");

var isNot = function isNot(o) {
  return o.toString().includes("NOT");
};

exports.isNot = isNot;

var operatorLabel = function operatorLabel(o) {
  switch (o) {
    case _models.Operator.IS:
      return "Is";

    case _models.Operator.IS_NOT:
      return "Is Not";

    case _models.Operator.IN:
      return "In";

    case _models.Operator.NOT_IN:
      return "Not In";

    case _models.Operator.EXISTS:
      return "Exists";

    case _models.Operator.NOT_EXISTS:
      return "Not Exists";

    case _models.Operator.BETWEEN:
      return "Between";

    case _models.Operator.NOT_BETWEEN:
      return "Not Between";

    case _models.Operator.WITHIN:
      return "Within";

    case _models.Operator.NOT_WITHIN:
      return "Not Within";

    case _models.Operator.GT:
      return ">";

    case _models.Operator.LT:
      return "<";

    case _models.Operator.GTE:
      return "≥";

    case _models.Operator.LTE:
      return "≤";

    case _models.Operator.CONTAINS:
      return "Includes";

    case _models.Operator.STARTS:
      return "Starts with";

    case _models.Operator.ENDS:
      return "Ends with";
  }
};

exports.operatorLabel = operatorLabel;

var tagOperator = function tagOperator(o) {
  switch (o) {
    case _models.Operator.IS:
    case _models.Operator.IS_NOT:
      return "IS";

    case _models.Operator.IN:
    case _models.Operator.NOT_IN:
      return "IN";

    case _models.Operator.EXISTS:
    case _models.Operator.NOT_EXISTS:
      return "EXISTS";

    case _models.Operator.BETWEEN:
    case _models.Operator.NOT_BETWEEN:
      return "BETWEEN";

    case _models.Operator.WITHIN:
    case _models.Operator.NOT_WITHIN:
      return "WITHIN";

    case _models.Operator.GT:
      return ">";

    case _models.Operator.LT:
      return "<";

    case _models.Operator.GTE:
      return "≥";

    case _models.Operator.LTE:
      return "≤";
  }
};

exports.tagOperator = tagOperator;

var toggleOperator = function toggleOperator(op) {
  var newOp = _models.Operator.EXISTS;

  switch (op) {
    case _models.Operator.BETWEEN:
      newOp = _models.Operator.NOT_BETWEEN;
      break;

    case _models.Operator.NOT_BETWEEN:
      newOp = _models.Operator.BETWEEN;
      break;

    case _models.Operator.WITHIN:
      newOp = _models.Operator.NOT_WITHIN;
      break;

    case _models.Operator.NOT_WITHIN:
      newOp = _models.Operator.WITHIN;
      break;

    case _models.Operator.IS:
      newOp = _models.Operator.IS_NOT;
      break;

    case _models.Operator.IS_NOT:
      newOp = _models.Operator.IS;
      break;

    case _models.Operator.IN:
      newOp = _models.Operator.NOT_IN;
      break;

    case _models.Operator.NOT_IN:
      newOp = _models.Operator.IN;
      break;

    case _models.Operator.EXISTS:
      newOp = _models.Operator.NOT_EXISTS;
      break;

    case _models.Operator.NOT_EXISTS:
      newOp = _models.Operator.EXISTS;
      break;

    case _models.Operator.GTE:
      newOp = _models.Operator.LT;
      break;

    case _models.Operator.LTE:
      newOp = _models.Operator.GT;
      break;

    case _models.Operator.GT:
      newOp = _models.Operator.LTE;
      break;

    case _models.Operator.LT:
      newOp = _models.Operator.GTE;
      break;
  }

  return newOp;
};

exports.toggleOperator = toggleOperator;