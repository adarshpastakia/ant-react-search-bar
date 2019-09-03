import React, { useMemo, useState } from "react";
import { Button, Dropdown, Icon, Menu, Tag } from "antd";
import { RsbFilterTag } from "./components/FilterTag";
import { IFilterField, IFilterObject } from "./utils/models";
import { RsbFilterForm } from "./components/FilterForm";
import { useIsLtr } from "./utils/isRtl";

interface IContainerProps {
  disabled?: boolean;
  fields: IFilterField[];
  filters: IFilterObject[];
  onFilterChange?: (filters: IFilterObject[]) => void;

  primaryColor?: string;
  negativeColor?: string;
}

export const ReactFilterBar: React.FC<IContainerProps> = ({
  filters = [],
  fields,
  disabled,
  onFilterChange,
  primaryColor,
  negativeColor
}) => {
  const [dropdown, setDropdown] = useState(false);

  const [isLtr, ref] = useIsLtr();
  const placement = useMemo(() => (isLtr ? "bottomLeft" : "bottomRight"), [isLtr]);

  const isDisabled = useMemo(() => disabled || filters.filter(f => !f.required).length === 0, [
    filters,
    disabled
  ]);

  const toggleAll = (e: boolean) => {
    const newList = filters.map(f => ({ ...f, active: !!f.required || e }));
    onFilterChange && onFilterChange(newList);
  };

  const onUpdate = (index: number, filter: IFilterObject) => {
    const newList = [...filters];
    newList[index] = filter;
    onFilterChange && onFilterChange(newList);
  };

  const onRemove = (index: number) => {
    onFilterChange && onFilterChange(filters.filter((_, i) => i !== index));
  };

  const onRemoveAll = () => {
    onFilterChange && onFilterChange(filters.filter(f => !!f.required));
  };

  const onAdd = (filter: IFilterObject) => {
    onFilterChange && onFilterChange([...filters, filter]);
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
      <Menu.Item onClick={onRemoveAll} disabled={isDisabled}>
        <Icon type="delete" /> Remove All
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="arsb-filter__bar" ref={ref}>
      <Dropdown overlay={allMenu} placement={placement} trigger={["click"]} disabled={isDisabled}>
        <Button type="link" className="arsb-filter__options">
          <Icon type="setting" theme={isDisabled ? "outlined" : "twoTone"} />
        </Button>
      </Dropdown>
      {filters.map((f, i) => (
        <RsbFilterTag
          key={`tag${i}`}
          filter={f}
          fields={fields}
          dir={isLtr ? "ltr" : "rtl"}
          placement={placement}
          primaryColor={primaryColor}
          negativeColor={negativeColor}
          onRemove={() => onRemove(i)}
          onChange={f => onUpdate(i, f)}
        />
      ))}
      <Dropdown
        disabled={isDisabled}
        overlay={
          dropdown ? (
            <div dir={isLtr ? "ltr" : "rtl"}>
              <RsbFilterForm fields={fields} onChange={onAdd} onCancel={() => setDropdown(false)} />
            </div>
          ) : (
            <div />
          )
        }
        placement={placement}
        trigger={["click"]}
        visible={dropdown}
        overlayClassName={`arsb-color--${negativeColor}`}
        onVisibleChange={v => setDropdown(v)}
      >
        <Tag className="arsb-button--add">Add Filter</Tag>
      </Dropdown>
    </div>
  );
};
