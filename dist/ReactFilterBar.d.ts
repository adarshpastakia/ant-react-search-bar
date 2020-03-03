import React from "react";
import { IFilterField, IFilterObject } from "./utils/models";
interface IContainerProps {
    disabled?: boolean;
    fields: IFilterField[];
    filters: IFilterObject[];
    onFilterChange?: (filters: IFilterObject[]) => void;
    primaryColor?: string;
    negativeColor?: string;
}
export declare const ReactFilterBar: React.FC<IContainerProps>;
export {};
