import React from "react";
import { Form, Input, Select } from "antd";
import { FieldValue, FilterValue, Operator, OperatorValueType, Type } from "../utils/models";
import { WrappedFormUtils } from "antd/es/form/Form";
import { RsbFilterInput } from "./FilterInput";

export const RsbFilterValue: React.FC<{
  form: WrappedFormUtils;
  value: FilterValue;
  fieldType?: Type;
  operator?: Operator;
  fieldValues?: FieldValue[];
  onChange: (o: FilterValue) => void;
}> = ({ form, value, fieldType, fieldValues, operator, onChange }) => {
  const type: string = fieldType !== Type.date && operator ? OperatorValueType[operator] : "single";

  const validateRange = (_: any, v: any, callback: any) => {
    Array.isArray(value) && callback(v <= value[0] ? "Invalid range" : undefined);
  };

  return type !== "double" ? (
    <Form.Item label="Value" colon={false} required={false}>
      {!fieldValues &&
        type === "single" &&
        form.getFieldDecorator("value", {
          rules: [{ required: true }],
          initialValue: value
        })(<RsbFilterInput type={fieldType} onChange={onChange} />)}
      {(fieldValues || type === "multiple") &&
        form.getFieldDecorator("value", {
          rules: [{ required: true }],
          initialValue: value || []
        })(
          <Select onChange={onChange} mode={type === "multiple" ? "tags" : "default"}>
            {fieldValues &&
              fieldValues.map(v => (
                <Select.Option key={v.key} value={v.key}>
                  {v.label}
                </Select.Option>
              ))}
          </Select>
        )}
    </Form.Item>
  ) : (
    <Input.Group style={{ display: "flex", flexFlow: "row nowrap" }}>
      <Form.Item label="Min" colon={false} required={false}>
        {form.getFieldDecorator("min", {
          rules: [{ required: true }],
          initialValue: (Array.isArray(value) && value.length && value[0]) || undefined
        })(
          <RsbFilterInput
            type={fieldType}
            onChange={v => onChange([v, Array.isArray(value) && value.length > 0 && value[1]])}
          />
        )}
      </Form.Item>
      <span>&nbsp;</span>
      <Form.Item label="Max" colon={false} required={false}>
        {form.getFieldDecorator("max", {
          rules: [{ required: true, validator: validateRange }],
          initialValue: (Array.isArray(value) && value.length > 1 && value[1]) || undefined
        })(
          <RsbFilterInput
            type={fieldType}
            onChange={v => onChange([Array.isArray(value) && value.length && value[0], v])}
          />
        )}
      </Form.Item>
    </Input.Group>
  );
};
