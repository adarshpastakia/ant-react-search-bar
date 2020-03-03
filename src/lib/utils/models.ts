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
  IS = "IS",
  IN = "IN",
  LT = "LT",
  GT = "GT",
  LTE = "LTE",
  GTE = "GTE",
  CONTAINS = "CONTAINS",
  STARTS = "STARTS",
  ENDS = "ENDS",
  WITHIN = "WITHIN",
  BETWEEN = "BETWEEN"
}

export const TypeOperators = {
  [Type.other]: [Operator.EXISTS],
  [Type.string]: [Operator.IS, Operator.IN, Operator.CONTAINS, Operator.STARTS, Operator.ENDS],
  [Type.number]: [
    Operator.IS,
    Operator.BETWEEN,
    Operator.LT,
    Operator.GT,
    Operator.LTE,
    Operator.GTE
  ],
  [Type.boolean]: [Operator.IS],
  [Type.date]: [
    Operator.IS,
    Operator.BETWEEN,
    Operator.LT,
    Operator.GT,
    Operator.LTE,
    Operator.GTE
  ],
  [Type.geo]: []
};

export const OperatorValueType = {
  [Operator.EXISTS]: "single",
  [Operator.IS]: "single",
  [Operator.IN]: "multiple",
  [Operator.BETWEEN]: "double",
  [Operator.WITHIN]: "single",
  [Operator.STARTS]: "single",
  [Operator.ENDS]: "single",
  [Operator.CONTAINS]: "single",
  [Operator.LT]: "single",
  [Operator.GT]: "single",
  [Operator.LTE]: "single",
  [Operator.GTE]: "single"
};

export const OperatorLabel = {
  [Operator.IS]: "Is",
  [Operator.IN]: "In",
  [Operator.EXISTS]: "Exists",
  [Operator.BETWEEN]: "Between",
  [Operator.WITHIN]: "Within",
  [Operator.GT]: ">",
  [Operator.LT]: "<",
  [Operator.GTE]: "≥",
  [Operator.LTE]: "≤",
  [Operator.CONTAINS]: "Includes",
  [Operator.STARTS]: "Starts with",
  [Operator.ENDS]: "Ends with"
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
  defaultOperator?: Operator;
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
  negative?: boolean;
  editable?: boolean;
  required?: boolean;
}

export interface IQueryObject {
  query?: string;
  filters: IFilterObject[];
}
