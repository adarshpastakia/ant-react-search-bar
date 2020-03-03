import React from "react";
import { Operator, Type } from "../utils/models";
import { WrappedFormUtils } from "antd/es/form/Form";
export declare const RsbFilterOperator: React.FC<{
    form: WrappedFormUtils;
    value: Operator;
    defaultValue?: Operator;
    fieldType?: Type;
    onChange: (o: Operator) => void;
}>;
