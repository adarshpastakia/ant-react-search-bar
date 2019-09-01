export enum Type {
  string = "string",
  number = "number",
  boolean = "boolean",
  date = "date",
  geo = "geo",
  other = "other"
}

export enum Operator {
  EXISTS = "EXISTS",
  NOT_EXISTS = "NOT_EXISTS",
  IS = "IS",
  IS_NOT = "IS_NOT",
  IN = "IN",
  NOT_IN = "NOT_IN",
  LT = "LT",
  GT = "GT",
  LTE = "LTE",
  GTE = "GTE",
  CONTAINS = "CONTAINS",
  STARTS = "STARTS",
  ENDS = "ENDS",
  WITHIN = "WITHIN",
  NOT_WITHIN = "NOT_WITHIN",
  BETWEEN = "BETWEEN",
  NOT_BETWEEN = "NOT_BETWEEN"
}

export const TypeOperators = {
  [Type.other]: [Operator.EXISTS, Operator.NOT_EXISTS],
  [Type.string]: [
    Operator.IS,
    Operator.IS_NOT,
    Operator.IN,
    Operator.NOT_IN,
    Operator.CONTAINS,
    Operator.STARTS,
    Operator.ENDS
  ],
  [Type.number]: [
    Operator.IS,
    Operator.IS_NOT,
    Operator.BETWEEN,
    Operator.NOT_BETWEEN,
    Operator.LT,
    Operator.GT,
    Operator.LTE,
    Operator.GTE
  ],
  [Type.boolean]: [Operator.IS, Operator.IS_NOT],
  [Type.date]: [Operator.BETWEEN, Operator.NOT_BETWEEN],
  [Type.geo]: []
};

export const OperatorValueType = {
  [Operator.EXISTS]: "single",
  [Operator.NOT_EXISTS]: "single",
  [Operator.IS]: "single",
  [Operator.IS_NOT]: "single",
  [Operator.IN]: "multiple",
  [Operator.NOT_IN]: "multiple",
  [Operator.BETWEEN]: "double",
  [Operator.NOT_BETWEEN]: "double",
  [Operator.WITHIN]: "single",
  [Operator.NOT_WITHIN]: "single",
  [Operator.STARTS]: "single",
  [Operator.ENDS]: "single",
  [Operator.CONTAINS]: "single",
  [Operator.LT]: "single",
  [Operator.GT]: "single",
  [Operator.LTE]: "single",
  [Operator.GTE]: "single"
};

export type AnyValue = string | number | { [key: string]: any } | undefined;
export type FilterValue =
  | undefined
  | boolean
  | string
  | string[]
  | number
  | [number, number]
  | AnyValue;

export type FieldValue = { key: string; label: string };

export interface IFilterField {
  key: string;
  name: string;
  type: Type;
  values?: FieldValue[];
}

export interface IAction {
  title: string;
  href?: string;
  onClick?: () => void;
}

export interface IFilterObject {
  field: string;
  operator: Operator;
  value: FilterValue;
  label?: string;
  active?: boolean;
  pinned?: boolean;
  editable?: boolean;
  required?: boolean;
}

export interface IQueryObject {
  query?: string;
  filters: IFilterObject[];
}
