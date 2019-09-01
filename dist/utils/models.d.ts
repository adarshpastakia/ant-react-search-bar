export declare enum Type {
    string = "string",
    number = "number",
    boolean = "boolean",
    date = "date",
    geo = "geo",
    other = "other"
}
export declare enum Operator {
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
export declare const TypeOperators: {
    [Type.other]: Operator[];
    [Type.string]: Operator[];
    [Type.number]: Operator[];
    [Type.boolean]: Operator[];
    [Type.date]: Operator[];
    [Type.geo]: never[];
};
export declare const OperatorValueType: {
    [Operator.EXISTS]: string;
    [Operator.NOT_EXISTS]: string;
    [Operator.IS]: string;
    [Operator.IS_NOT]: string;
    [Operator.IN]: string;
    [Operator.NOT_IN]: string;
    [Operator.BETWEEN]: string;
    [Operator.NOT_BETWEEN]: string;
    [Operator.WITHIN]: string;
    [Operator.NOT_WITHIN]: string;
    [Operator.STARTS]: string;
    [Operator.ENDS]: string;
    [Operator.CONTAINS]: string;
    [Operator.LT]: string;
    [Operator.GT]: string;
    [Operator.LTE]: string;
    [Operator.GTE]: string;
};
export declare type AnyValue = string | number | {
    [key: string]: any;
} | undefined;
export declare type FilterValue = undefined | boolean | string | string[] | number | [number, number] | AnyValue;
export declare type FieldValue = {
    key: string;
    label: string;
};
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
