export * from "./ReactSearchBar";
export * from "./components/FilterContainer";
import { IFilterField, IFilterObject, Operator, Type } from "./utils/models";

export const RsbType = Type;
export const RsbOperator = Operator;
export type RsbFilter = IFilterObject;
export type RsbField = IFilterField;
