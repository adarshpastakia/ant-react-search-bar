import React, { useState } from "react";
import "./app.less";
import { Input, Menu, Select } from "antd";
import { ReactFilterBar, ReactSearchBar, RsbField, RsbFilter, RsbOperator, RsbType } from "../lib";

export const App = () => {
  const filters: RsbFilter[] = [
    {
      field: "string",
      operator: RsbOperator.IS,
      value: "test",
      active: true,
      required: true
    },
    {
      field: "string",
      operator: RsbOperator.IN,
      value: ["test4", "test5"]
    },
    {
      field: "number",
      operator: RsbOperator.BETWEEN,
      value: [9, 18],
      negative: true,
      active: true
    },
    {
      field: "number",
      operator: RsbOperator.GTE,
      value: 36,
      active: true
    },
    {
      field: "bool",
      operator: RsbOperator.EXISTS,
      value: undefined,
      active: true
    },
    {
      field: "loc",
      operator: RsbOperator.WITHIN,
      value: { coordinates: [[1, 1]] },
      label: "Selected Area",
      active: true,
      editable: false
    }
  ];

  const fields: RsbField[] = [
    { key: "string", name: "String", type: RsbType.string },
    { key: "number", name: "Number", type: RsbType.number },
    { key: "bool", name: "Boolean", type: RsbType.boolean },
    { key: "date", name: "Date", type: RsbType.date },
    { key: "loc", name: "Location", type: RsbType.geo }
  ];

  const actions = (
    <Menu>
      <Menu.Item>Action</Menu.Item>
      <Menu.Item>Move to...</Menu.Item>
    </Menu>
  );

  const options = (
    <Select>
      <Select.Option key="1">Field</Select.Option>
      <Select.Option key="2">Field</Select.Option>
    </Select>
  );

  const [f, setF] = useState(filters);

  return (
    <div className="x-body">
      <h1 className="x-header">
        <img src="/ant-logo.svg" height={48} /> Kibana style search+filter bar
      </h1>
      <h4 className="x-section">Basic</h4>
      <ReactSearchBar />
      <br />

      <h4 className="x-section">With Filters</h4>
      <ReactSearchBar collapsed={false} filters={f} onFilterChange={setF} fields={fields} primaryColor="geekblue" />
      <br />

      <h4 className="x-section">Filters Only</h4>
      <ReactFilterBar filters={f} onFilterChange={setF} fields={fields} />
      <br />

      <h4 className="x-section">With Options</h4>
      <ReactSearchBar placeholder="Search query..." options={options} filters={[]} />
      <br />

      <h4 className="x-section">With Actions</h4>
      <ReactSearchBar actions={actions} filters={[]} />
      <br />

      <h4 className="x-section">With Extra</h4>
      <ReactSearchBar actions={actions} filters={[]}>
        <Input.Group compact>
          <Select placeholder="Sort By" style={{ width: 120 }}>
            <Select.Option value="">Field</Select.Option>
          </Select>
          <Select placeholder="Order By" style={{ width: 80 }}>
            <Select.Option value="asc">Asc</Select.Option>
          </Select>
        </Input.Group>
      </ReactSearchBar>
      <br />

      <h4 className="x-section">RTL Support</h4>
      <div dir="rtl">
        <ReactSearchBar
          collapsed={false}
          filters={filters}
          fields={fields}
          options={options}
          actions={actions}
        >
          <Input.Group compact>
            <Select placeholder="Sort By" style={{ width: 120 }}>
              <Select.Option value="">Field</Select.Option>
            </Select>
            <Select placeholder="Order By" style={{ width: 80 }}>
              <Select.Option value="asc">Asc</Select.Option>
            </Select>
          </Input.Group>
        </ReactSearchBar>
      </div>
      <br />
    </div>
  );
};
