import React, { ReactElement, useCallback, useState } from "react";
import { IFilterField, IFilterObject, IQueryObject } from "./utils/models";
import { Button, Dropdown, Icon, Input, Menu, Select } from "antd";
import { cssRule, stylesheet } from "typestyle";
import { RsbFilterButton } from "./components/FilterButton";
import { RsbFilterContainer } from "./components/FilterContainer";

interface ISearchBarProps {
  query?: string;
  disabled?: boolean;
  filters?: IFilterObject[];
  fields?: IFilterField[];
  placeholder?: string;
  options?: ReactElement<Select>;
  actions?: ReactElement<Menu>;
  collapsed?: boolean;
  hasFilters?: boolean;
  onCollapsed?: (c: boolean) => void;
  onSearch?: (o: IQueryObject) => void;
  onQueryChange?: (query: string) => void;
  onFilterChange?: (filters: IFilterObject[]) => void;
}

cssRule("[dir='rtl']", {
  $nest: {
    "&& .ant-input-group-compact": {
      $nest: {
        "& .ant-input-prefix": {
          left: "unset",
          right: 12
        },
        "& .ant-input-suffix": {
          left: 12,
          right: "unset"
        },
        "& .anticon-right, & .anticon-search": {
          transform: "scaleX(-1)"
        },
        "& .ant-select-arrow": {
          left: 11,
          right: "unset"
        },
        "& .ant-select-selection-selected-value": {
          paddingRight: 0,
          paddingLeft: 20,
          float: "right"
        },
        "& .ant-select-selection__placeholder": {
          right: 0,
          left: 9,
          textAlign: "right"
        },
        "& > *:first-child": {
          $nest: {
            "&, & > .ant-select-selection, & > .ant-input": {
              borderRadius: "0 4px 4px 0"
            }
          }
        },
        "& > *:last-child": {
          $nest: {
            "&, & > .ant-select-selection, & > .ant-input": {
              borderRadius: "4px 0 0 4px"
            }
          }
        }
      }
    }
  }
});

const css = stylesheet({
  filterBar: {
    display: "flex",
    flexFlow: "row nowrap",
    height: 32,
    $nest: {
      "& > div, & > span, & > button": {
        margin: "0 4px"
      },
      ".ant-input-group": {
        display: "flex",
        flexFlow: "row nowrap"
      },
      ".ant-input-group:not(:first-child)": {
        width: "unset"
      },
      ".ant-form-item-control, .ant-form-item-label": {
        lineHeight: "32px"
      }
    }
  },
  searchBar: {
    $nest: {
      "& .ant-select": {
        minWidth: 80
      }
    }
  },
  filterButton: {
    userSelect: "none",
    $nest: {
      "&:hover": {
        textDecoration: "underline"
      },
      "& sup": {
        borderRadius: 4,
        height: "unset",
        lineHeight: "1.5em",
        minWidth: "1em",
        fontWeight: "bold",
        fontSize: ".8em",
        margin: "0 4px"
      }
    }
  }
});

const useIsLtr = () => {
  const [isLtr, setIsLtr] = useState(true);
  const ref: any = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      setIsLtr((node ? getComputedStyle(node).direction : "ltr") !== "rtl");
    }
  }, []);
  return [isLtr, ref];
};

export const ReactSearchBar: React.FC<ISearchBarProps> = ({
  collapsed = true,
  onCollapsed,
  placeholder,
  hasFilters,
  filters = [],
  onFilterChange,
  onSearch,
  query,
  onQueryChange,
  fields = [],
  options,
  actions,
  disabled,
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
        filters
      });
    }
  };

  const [isLtr, ref] = useIsLtr();

  return (
    <div ref={ref}>
      <div className={css.filterBar}>
        <Input.Group compact className={css.searchBar}>
          {hasFilters && (
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
      {hasFilters && !isCollapsed && (
        <RsbFilterContainer
          placement={isLtr ? "bottomLeft" : "bottomRight"}
          filters={filters}
          fields={fields}
          disabled={disabled}
          onChange={onFilterChange}
        />
      )}
    </div>
  );
};
