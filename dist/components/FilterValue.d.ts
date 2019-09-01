import React from "react";
import { FieldValue, FilterValue, Operator, Type } from "../utils/models";
import { WrappedFormUtils } from "antd/es/form/Form";
export declare const RsbFilterValue: React.FC<{
    form: WrappedFormUtils;
    value: FilterValue;
    fieldType?: Type;
    operator?: Operator;
    fieldValues?: FieldValue[];
    onChange: (o: FilterValue) => void;
}>;
