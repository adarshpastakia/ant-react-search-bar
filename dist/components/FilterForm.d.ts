import React from "react";
import { FormComponentProps } from "antd/es/form";
import { IFilterField, IFilterObject } from "../utils/models";
interface IFormProps {
    filter?: IFilterObject;
    fields: IFilterField[];
    onCancel?: () => void;
    onRemove?: () => void;
    onChange: (filter: IFilterObject) => void;
}
export declare const RsbFilterForm: import("antd/lib/form/interface").ConnectedComponentClass<React.FunctionComponent<IFormProps & FormComponentProps<any>>, Pick<IFormProps & FormComponentProps<any>, "filter" | "onChange" | "fields" | "onRemove" | "onCancel" | "wrappedComponentRef">>;
export {};
