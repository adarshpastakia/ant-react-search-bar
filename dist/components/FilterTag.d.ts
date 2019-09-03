import React from "react";
import { IFilterField, IFilterObject } from "../utils/models";
interface ITagProps {
    dir: "ltr" | "rtl";
    filter: IFilterObject;
    fields: IFilterField[];
    placement: "bottomLeft" | "bottomRight";
    onRemove: () => void;
    onChange: (filter: IFilterObject) => void;
    primaryColor?: string;
    negativeColor?: string;
}
export declare const RsbFilterTag: React.FC<ITagProps>;
export {};
