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
    [Operator.IS]: string;
    [Operator.IN]: string;
    [Operator.BETWEEN]: string;
    [Operator.WITHIN]: string;
    [Operator.STARTS]: string;
    [Operator.ENDS]: string;
    [Operator.CONTAINS]: string;
    [Operator.LT]: string;
    [Operator.GT]: string;
    [Operator.LTE]: string;
    [Operator.GTE]: string;
};
export declare const OperatorLabel: {
    [Operator.IS]: string;
    [Operator.IN]: string;
    [Operator.EXISTS]: string;
    [Operator.BETWEEN]: string;
    [Operator.WITHIN]: string;
    [Operator.GT]: string;
    [Operator.LT]: string;
    [Operator.GTE]: string;
    [Operator.LTE]: string;
    [Operator.CONTAINS]: string;
    [Operator.STARTS]: string;
    [Operator.ENDS]: string;
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
    negative?: boolean;
    editable?: boolean;
    required?: boolean;
}
export interface IQueryObject {
    query?: string;
    filters: IFilterObject[];
}
