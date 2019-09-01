import { Operator } from "./models";
export declare const isNot: (o: Operator) => boolean;
export declare const operatorLabel: (o: Operator) => "Is" | "Is Not" | "In" | "Not In" | "Exists" | "Not Exists" | "Between" | "Not Between" | "Within" | "Not Within" | ">" | "<" | "≥" | "≤" | "Includes" | "Starts with" | "Ends with";
export declare const tagOperator: (o: Operator) => ">" | "<" | "≥" | "≤" | "IS" | "IN" | "EXISTS" | "BETWEEN" | "WITHIN" | undefined;
export declare const toggleOperator: (op: Operator) => Operator.EXISTS | Operator.NOT_EXISTS | Operator.IS | Operator.IS_NOT | Operator.IN | Operator.NOT_IN | Operator.LT | Operator.GT | Operator.LTE | Operator.GTE | Operator.WITHIN | Operator.NOT_WITHIN | Operator.BETWEEN | Operator.NOT_BETWEEN;
