import React, { ReactElement, useState } from "react";
import { IFilterField, IFilterObject, IQueryObject } from "./utils/models";
import { Button, Dropdown, Icon, Input, Menu, Select } from "antd";
import { RsbFilterButton } from "./components/FilterButton";
import { ReactFilterBar } from "./ReactFilterBar";
import { useIsLtr } from "./utils/isRtl";

interface ISearchBarProps {
  query?: string;
  disabled?: boolean;
  filters?: IFilterObject[];
  fields?: IFilterField[];
  placeholder?: string;
  options?: ReactElement<Select>;
  actions?: ReactElement<Menu>;
  collapsed?: boolean;
  onCollapsed?: (c: boolean) => void;
  onSearch?: (o: IQueryObject) => void;
  onQueryChange?: (query: string) => void;
  onFilterChange?: (filters: IFilterObject[]) => void;

  primaryColor?: string;
  negativeColor?: string;
}

export const ReactSearchBar: React.FC<ISearchBarProps> = ({
  collapsed = true,
  onCollapsed,
  placeholder,
  filters,
  onFilterChange,
  onSearch,
  query,
  onQueryChange,
  fields = [],
  options,
  actions,
  disabled,
  primaryColor,
  negativeColor,
  children
}) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
    if (onCollapsed) {
      onCollapsed(!isCollapsed);
    }
  };

  const onSubmit = () => {
    if (onSearch) {
      onSearch({
        query,
        filters: filters || []
      });
    }
  };

  const [isLtr, ref] = useIsLtr();

  return (
    <div ref={ref} className={`arsb-${primaryColor}`}>
      <div className="arsb-search__bar">
        <Input.Group compact className="arsb-search__input">
          {!!filters && (
            <RsbFilterButton
              collapsed={isCollapsed}
              onCollapsed={toggleCollapsed}
              filterCount={filters.length}
            />
          )}
          {options}
          <Input.Search
            allowClear
            disabled={disabled}
            prefix={<Icon type="right" />}
            placeholder={placeholder}
            onSearch={onSubmit}
            onChange={e => onQueryChange && onQueryChange(e.target.value)}
          />
        </Input.Group>
        {children}
        {actions && (
          <Dropdown
            placement={isLtr ? "bottomRight" : "bottomLeft"}
            overlay={actions}
            trigger={["click"]}
          >
            <Button icon="menu" />
          </Dropdown>
        )}
      </div>
      {!!filters && !isCollapsed && (
        <ReactFilterBar
          primaryColor={primaryColor}
          negativeColor={negativeColor}
          filters={filters}
          fields={fields}
          disabled={disabled}
          onFilterChange={onFilterChange}
        />
      )}
    </div>
  );
};
