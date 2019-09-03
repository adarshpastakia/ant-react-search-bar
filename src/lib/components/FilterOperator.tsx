import React from "react";
import { Form, Select } from "antd";
import { Operator, OperatorLabel, Type, TypeOperators } from "../utils/models";
import { WrappedFormUtils } from "antd/es/form/Form";

export const RsbFilterOperator: React.FC<{
  form: WrappedFormUtils;
  value: Operator;
  fieldType?: Type;
  onChange: (o: Operator) => void;
}> = ({ form, value, fieldType, onChange }) => {
  const operators = [...TypeOperators[Type.other]];
  if (fieldType && fieldType !== Type.other) {
    operators.push(...TypeOperators[fieldType]);
  }
  return (
    <Form.Item label="Operator" colon={false} required={false}>
      {form.getFieldDecorator("operator", {
        rules: [{ required: true }],
        initialValue: value
      })(
        <Select onChange={onChange} disabled={!fieldType}>
          {operators.map(o => (
            <Select.Option key={o} value={o}>
              {OperatorLabel[o]}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
};
