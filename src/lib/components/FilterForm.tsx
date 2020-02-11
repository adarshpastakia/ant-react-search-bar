import React, { useState } from "react";
import { Button, Checkbox, Col, Form, Input, Row, Select, Switch } from "antd";
import { FormComponentProps } from "antd/es/form";
import { IFilterField, IFilterObject, Operator, Type } from "../utils/models";
import { RsbFilterOperator } from "./FilterOperator";
import { RsbFilterValue } from "./FilterValue";

interface IFormProps {
  filter?: IFilterObject;
  fields: IFilterField[];
  onCancel?: () => void;
  onRemove?: () => void;
  onChange: (filter: IFilterObject) => void;
}

const FilterForm: React.FC<IFormProps & FormComponentProps> = ({
  filter,
  fields,
  form,
  onRemove,
  onCancel,
  onChange
}) => {
  const { getFieldDecorator } = form;
  const [hasLabel, setHasLabel] = useState(filter && !!filter.label);

  const [filterObject, setFilterObject] = useState<IFilterObject>(
    filter || ({ field: "", value: "" } as IFilterObject)
  );

  const change = (field: keyof IFilterObject, value: any) => {
    const newFilter = { ...filterObject, [field]: value };

    if (field === "operator") {
      if (value === Operator.EXISTS) {
        newFilter.value = undefined;
      } else if (newFilter.value === undefined) {
        newFilter.value = false;
      }
    }
    setFilterObject(newFilter);
  };

  const apply = () => {
    form.validateFields(e => {
      if (!e) {
        onChange({ ...filterObject, active: true });
      }
    });
  };

  const field = fields.find(f => f.key === filterObject.field);

  return (
    <Form className="arsb-filter__form" onSubmit={apply}>
      <Row gutter={8} style={{ width: 420 }}>
        <Col span={12}>
          <Form.Item label="Field" colon={false} required={false}>
            {getFieldDecorator("field", {
              rules: [{ required: true }],
              initialValue: filterObject.field
            })(
              <Select onChange={f => change("field", f)} showSearch>
                {fields
                  .map(f => (
                    <Select.Option key={f.key} value={f.key}>
                      {f.name}
                    </Select.Option>
                  ))}
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Exclude" colon={false}>
            <Switch
              className="arsb-switch--negative"
              checkedChildren="Not"
              checked={filterObject && filterObject.negative}
              onChange={o => change("negative", o)}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <RsbFilterOperator
            form={form}
            fieldType={field && field.type}
            value={filterObject && filterObject.operator}
            onChange={o => change("operator", o)}
          />
        </Col>
      </Row>
      {filterObject.operator && filterObject.operator !== Operator.EXISTS && (
        <>
          <RsbFilterValue
            form={form}
            operator={filterObject.operator}
            fieldType={field && field.type}
            fieldValues={field && field.values}
            value={filterObject.value}
            onChange={v => change("value", v)}
          />
          <Form.Item label="Label" colon={false} required={false}>
            {getFieldDecorator("label", {
              rules: [{ required: hasLabel }],
              initialValue: filterObject.label
            })(
              <Input
                disabled={!hasLabel}
                onChange={e => change("label", e.target.value)}
                addonBefore={
                  <Checkbox checked={hasLabel} onChange={e => setHasLabel(e.target.checked)} />
                }
              />
            )}
          </Form.Item>
        </>
      )}
      <div
        style={{
          display: "grid",
          gridGap: 4,
          gridTemplateColumns: "auto 1fr auto auto",
          padding: "0 0 8px"
        }}
      >
        <Button
          size="small"
          type="danger"
          ghost
          onClick={onRemove}
          disabled={!filter || filter.required}
        >
          Delete
        </Button>
        <div />
        <Button size="small" onClick={onCancel}>
          Cancel
        </Button>
        <Button size="small" type="primary" onClick={apply}>
          Apply
        </Button>
      </div>
    </Form>
  );
};
export const RsbFilterForm = Form.create<IFormProps & FormComponentProps>()(FilterForm);
