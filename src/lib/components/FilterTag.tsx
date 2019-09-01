import React, { useEffect, useState } from "react";
import { Button, Dropdown, Icon, Menu, Tag } from "antd";
import { IFilterField, IFilterObject, Operator, Type } from "../utils/models";
import { stylesheet } from "typestyle";
import { RsbFilterForm } from "./FilterForm";
import { ClickParam } from "antd/es/menu";
import { isNot, tagOperator, toggleOperator } from "../utils/utils";
import { DateUtil } from "ant-react-date-selector";

const css = stylesheet({
  tagCheckbox: {
    $nest: {
      "& svg": {
        margin: "-1px 0 0 -1px"
      }
    }
  },
  tag: {
    display: "flex",
    marginTop: 2,
    marginBottom: 2,
    padding: 0,
    flexFlow: "row nowrap"
  },
  tagInner: {
    maxWidth: "20em",
    display: "grid",
    gridGap: 4,
    gridAutoFlow: "column",
    alignItems: "center"
  },
  tagLabel: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    $nest: {
      "& > i": {
        margin: "0 4px"
      }
    }
  }
});

const tagColor = (f: IFilterObject) => {
  if (f.active === false) {
    return "";
  } else if (f.operator.toString().includes("NOT")) {
    return "red";
  } else {
    return "blue";
  }
};

const tagButton = (f: IFilterObject) => {
  if (f.operator.toString().includes("NOT")) {
    return "danger";
  } else {
    return "primary";
  }
};

const tagLabel = (f: IFilterObject, fields: IFilterField[]) => {
  const field = fields.find(ff => ff.key === f.field);
  return field ? field.name : f.field;
};

const tagValue = (f: IFilterObject, isDate?: boolean) => {
  if (f.label) {
    return f.label;
  } else if (isDate && f.value) {
    return DateUtil.label(f.value.toString());
  } else if (Array.isArray(f.value)) {
    return `[${f.value}]`;
  } else if ([Operator.WITHIN, Operator.NOT_WITHIN].includes(f.operator)) {
    return "Area";
  } else {
    return f.value !== undefined ? `${f.value}` : "";
  }
};

interface ITagProps {
  filter: IFilterObject;
  fields: IFilterField[];
  placement: "bottomLeft" | "bottomRight";
  onRemove: () => void;
  onChange: (filter: IFilterObject) => void;
}
export const RsbFilterTag: React.FC<ITagProps> = ({
  filter,
  fields,
  onChange,
  onRemove,
  placement
}) => {
  const [dropdown, setDropdown] = useState(false);
  const [editing, setEditing] = useState(false);

  const field = fields.find(f => f.key === filter.field);

  const change = (field: keyof IFilterObject, value: any) => {
    onChange({ ...filter, [field]: value });
  };

  const onUpdate = (filter: IFilterObject) => {
    onChange(filter);
    setDropdown(false);
  };

  const menuClicked = ({ key, domEvent }: ClickParam) => {
    if (key === "edit") {
      setEditing(true);
      domEvent.stopPropagation();
    }
    if (key === "active") {
      change("active", !filter.active);
    }
    if (key === "operator") {
      change("operator", toggleOperator(filter.operator));
    }
    if (key === "remove") {
      setDropdown(false);
      onRemove();
    }
  };

  useEffect(() => setEditing(false), [dropdown]);

  const menu = (
    <Menu onClick={menuClicked}>
      {filter.editable !== false && (
        <Menu.Item key="edit">
          <Icon type="edit" /> Edit{" "}
          <Icon type="right" style={{ float: "right", opacity: 0.5, marginTop: 4 }} />
        </Menu.Item>
      )}
      <Menu.Item key="active">
        <Icon type={filter.active ? "eye-invisible" : "eye"} />{" "}
        {filter.active ? "Disable" : "Enable"}
      </Menu.Item>
      <Menu.Item key="operator">
        <Icon type={isNot(filter.operator) ? "plus-circle" : "minus-circle"} />{" "}
        {isNot(filter.operator) ? "Include" : "Exclude"}
      </Menu.Item>
      <Menu.Item key="remove">
        <Icon type="delete" /> Remove
      </Menu.Item>
    </Menu>
  );

  const form = (
    <RsbFilterForm
      fields={fields}
      filter={filter}
      onChange={onUpdate}
      onCancel={() => setDropdown(false)}
      onRemove={onRemove}
    />
  );

  return (
    <Tag
      color={tagColor(filter)}
      className={css.tag}
      style={{ opacity: filter.active !== false ? 1 : 0.5 }}
    >
      <Dropdown
        trigger={["click"]}
        visible={dropdown}
        placement={placement}
        overlay={editing || filter.required ? form : menu}
        onVisibleChange={setDropdown}
      >
        <div className={css.tagInner}>
          {!filter.required ? (
            <Button
              ghost
              type={tagButton(filter)}
              size="small"
              className={css.tagCheckbox}
              style={{ border: 0 }}
              onClick={e => [change("active", !(filter.active !== false)), e.stopPropagation()]}
            >
              <Icon
                theme="filled"
                type={filter.active !== false ? "check-square" : "blank"}
                style={{
                  width: "1em",
                  height: "1em",
                  border: "solid #000",
                  borderWidth: filter.active !== false ? 0 : 1
                }}
              />
            </Button>
          ) : (
            <span>&nbsp;</span>
          )}
          <div className={css.tagLabel}>
            <bdi>
              <b>{tagLabel(filter, fields)}</b>
            </bdi>
            <i style={{ textDecoration: isNot(filter.operator) ? "line-through" : "none" }}>
              {tagOperator(filter.operator)}
            </i>
            <bdi>{tagValue(filter, field && field.type === Type.date)}</bdi>
          </div>
        </div>
      </Dropdown>
      <Button
        ghost
        type={tagButton(filter)}
        size="small"
        onClick={onRemove}
        disabled={filter.required}
        style={{
          border: 0,
          width: filter.required ? 0 : "unset",
          opacity: filter.required ? 0 : 1
        }}
      >
        <Icon type="close-circle" />
      </Button>
    </Tag>
  );
};
