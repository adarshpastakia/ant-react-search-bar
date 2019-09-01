import React from "react";
import { IFilterField, IFilterObject } from "../utils/models";
interface IContainerProps {
    disabled?: boolean;
    placement?: "bottomLeft" | "bottomRight";
    fields: IFilterField[];
    filters: IFilterObject[];
    onChange?: (filters: IFilterObject[]) => void;
}
export declare const RsbFilterContainer: React.FC<IContainerProps>;
export {};
