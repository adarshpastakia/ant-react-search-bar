import React from "react";
import { IFilterField, IFilterObject } from "../utils/models";
interface ITagProps {
    filter: IFilterObject;
    fields: IFilterField[];
    placement: "bottomLeft" | "bottomRight";
    onRemove: () => void;
    onChange: (filter: IFilterObject) => void;
}
export declare const RsbFilterTag: React.FC<ITagProps>;
export {};
