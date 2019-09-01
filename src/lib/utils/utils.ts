import { Operator } from "./models";

export const isNot = (o: Operator) => {
  return o.toString().includes("NOT");
};

export const operatorLabel = (o: Operator) => {
  switch (o) {
    case Operator.IS:
      return "Is";
    case Operator.IS_NOT:
      return "Is Not";
    case Operator.IN:
      return "In";
    case Operator.NOT_IN:
      return "Not In";
    case Operator.EXISTS:
      return "Exists";
    case Operator.NOT_EXISTS:
      return "Not Exists";
    case Operator.BETWEEN:
      return "Between";
    case Operator.NOT_BETWEEN:
      return "Not Between";
    case Operator.WITHIN:
      return "Within";
    case Operator.NOT_WITHIN:
      return "Not Within";
    case Operator.GT:
      return ">";
    case Operator.LT:
      return "<";
    case Operator.GTE:
      return "≥";
    case Operator.LTE:
      return "≤";
    case Operator.CONTAINS:
      return "Includes";
    case Operator.STARTS:
      return "Starts with";
    case Operator.ENDS:
      return "Ends with";
  }
};
export const tagOperator = (o: Operator) => {
  switch (o) {
    case Operator.IS:
    case Operator.IS_NOT:
      return "IS";
    case Operator.IN:
    case Operator.NOT_IN:
      return "IN";
    case Operator.EXISTS:
    case Operator.NOT_EXISTS:
      return "EXISTS";
    case Operator.BETWEEN:
    case Operator.NOT_BETWEEN:
      return "BETWEEN";
    case Operator.WITHIN:
    case Operator.NOT_WITHIN:
      return "WITHIN";
    case Operator.GT:
      return ">";
    case Operator.LT:
      return "<";
    case Operator.GTE:
      return "≥";
    case Operator.LTE:
      return "≤";
  }
};

export const toggleOperator = (op: Operator) => {
  let newOp = Operator.EXISTS;
  switch (op) {
    case Operator.BETWEEN:
      newOp = Operator.NOT_BETWEEN;
      break;
    case Operator.NOT_BETWEEN:
      newOp = Operator.BETWEEN;
      break;
    case Operator.WITHIN:
      newOp = Operator.NOT_WITHIN;
      break;
    case Operator.NOT_WITHIN:
      newOp = Operator.WITHIN;
      break;
    case Operator.IS:
      newOp = Operator.IS_NOT;
      break;
    case Operator.IS_NOT:
      newOp = Operator.IS;
      break;
    case Operator.IN:
      newOp = Operator.NOT_IN;
      break;
    case Operator.NOT_IN:
      newOp = Operator.IN;
      break;
    case Operator.EXISTS:
      newOp = Operator.NOT_EXISTS;
      break;
    case Operator.NOT_EXISTS:
      newOp = Operator.EXISTS;
      break;
    case Operator.GTE:
      newOp = Operator.LT;
      break;
    case Operator.LTE:
      newOp = Operator.GT;
      break;
    case Operator.GT:
      newOp = Operator.LTE;
      break;
    case Operator.LT:
      newOp = Operator.GTE;
      break;
  }
  return newOp;
};
