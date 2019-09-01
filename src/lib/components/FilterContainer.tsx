import React, { useState } from "react";
import { stylesheet } from "typestyle";
import { Button, Dropdown, Icon, Menu, Tag } from "antd";
import { RsbFilterTag } from "./FilterTag";
import { IFilterField, IFilterObject } from "../utils/models";
import { RsbFilterForm } from "./FilterForm";

const css = stylesheet({
  filters: {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center"
  },
  addButton: {
    borderStyle: "dashed"
  }
});

interface IContainerProps {
  disabled?: boolean;
  placement?: "bottomLeft" | "bottomRight";
  fields: IFilterField[];
  filters: IFilterObject[];
  onChange?: (filters: IFilterObject[]) => void;
}

export const RsbFilterContainer: React.FC<IContainerProps> = ({
  filters = [],
  fields,
  placement = "bottomLeft",
  disabled,
  onChange
}) => {
  const [dropdown, setDropdown] = useState(false);

  const toggleAll = (e: boolean) => {
    const newList = [...filters];
    newList.forEach(f => (!f.required ? (f.active = e) : false));
    onChange && onChange(newList);
  };

  const onUpdate = (index: number, filter: IFilterObject) => {
    const newList = [...filters];
    newList[index] = filter;
    onChange && onChange(newList);
  };

  const onRemove = (index: number) => {
    onChange && onChange(filters.filter((_, i) => i !== index));
  };

  const onRemoveAll = () => {
    onChange && onChange(filters.filter(f => !!f.required));
  };

  const onAdd = (filter: IFilterObject) => {
    onChange && onChange([...filters, filter]);
    setDropdown(false);
  };

  const allMenu = (
    <Menu>
      <h4 style={{ padding: "0 16px" }}>All Filters</h4>
      <Menu.Item
        onClick={() => toggleAll(true)}
        disabled={!filters.some(f => !f.required && f.active === false)}
      >
        <Icon type="eye" /> Enable All
      </Menu.Item>
      <Menu.Item
        onClick={() => toggleAll(false)}
        disabled={!filters.some(f => !f.required && f.active !== false)}
      >
        <Icon type="eye-invisible" /> Disable All
      </Menu.Item>
      <Menu.Item onClick={onRemoveAll} disabled={!filters.filter(f => !f.required).length}>
        <Icon type="delete" /> Remove All
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={css.filters}>
      <Dropdown overlay={allMenu} placement={placement} trigger={["click"]} disabled={disabled}>
        <Button type="link">
          <Icon type="setting" theme="twoTone" />
        </Button>
      </Dropdown>
      {filters.map((f, i) => (
        <RsbFilterTag
          key={`tag${i}`}
          filter={f}
          fields={fields}
          placement={placement}
          onRemove={() => onRemove(i)}
          onChange={f => onUpdate(i, f)}
        />
      ))}
      {fields && !!fields.length && (
        <Dropdown
          disabled={disabled}
          overlay={
            dropdown ? (
              <RsbFilterForm fields={fields} onChange={onAdd} onCancel={() => setDropdown(false)} />
            ) : (
              <div />
            )
          }
          placement={placement}
          trigger={["click"]}
          visible={dropdown}
          onVisibleChange={v => setDropdown(v)}
        >
          <Tag className={css.addButton}>Add Filter</Tag>
        </Dropdown>
      )}
    </div>
  );
};
