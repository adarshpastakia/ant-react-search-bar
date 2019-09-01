import React from "react";
import { Input, InputNumber, Switch } from "antd";
import { Type } from "../utils/models";
import { ReactDateSelector } from "ant-react-date-selector";

interface IInputProps {
  type?: Type;
  value?: any;
  onChange?: (o: any) => void;
}
export const RsbFilterInput: React.FC<IInputProps> = React.forwardRef<any, IInputProps>(
  ({ type, value, onChange }, ref) => {
    switch (type) {
      case Type.date:
        return <ReactDateSelector value={value} onDateChange={onChange} />;
      case Type.number:
        return <InputNumber ref={ref} value={value} onChange={onChange} />;
      case Type.boolean:
        return <Switch ref={ref} checked={value || false} onChange={onChange} />;
      default:
        return (
          <Input
            ref={ref}
            disabled={!type}
            value={value}
            onChange={e => onChange!(e.target.value)}
          />
        );
    }
  }
);
