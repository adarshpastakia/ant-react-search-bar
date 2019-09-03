import React, { useEffect, useMemo, useState } from "react";
import { Button, Dropdown, Icon, Menu, Tag } from "antd";
import { IFilterField, IFilterObject, Operator, OperatorLabel, Type } from "../utils/models";
import { RsbFilterForm } from "./FilterForm";
import { ClickParam } from "antd/es/menu";
import { DateUtil } from "ant-react-date-selector";

const fnTagColor = (f: IFilterObject, primaryColor = "blue", negativeColor = "red") => {
  if (f.active === false) {
    return "";
  } else if (f.negative) {
    return negativeColor;
  } else {
    return primaryColor;
  }
};

const fnTagButton = (f: IFilterObject) => {
  return f.negative ? "danger" : "primary";
};

const fnTagLabel = (f: IFilterObject, fields: IFilterField[]) => {
  const field = fields.find(ff => ff.key === f.field);
  return field ? field.name : f.field;
};

const fnTagValue = (f: IFilterObject, isDate?: boolean) => {
  if (f.label) {
    return f.label;
  } else if (isDate && f.value) {
    return DateUtil.label(f.value.toString());
  } else if (Array.isArray(f.value)) {
    return `[${f.value}]`;
  } else if (f.operator === Operator.WITHIN) {
    return "Area";
  } else {
    return f.value !== undefined ? `${f.value}` : "";
  }
};

interface ITagProps {
  dir: "ltr" | "rtl";
  filter: IFilterObject;
  fields: IFilterField[];
  placement: "bottomLeft" | "bottomRight";
  onRemove: () => void;
  onChange: (filter: IFilterObject) => void;

  primaryColor?: string;
  negativeColor?: string;
}
export const RsbFilterTag: React.FC<ITagProps> = ({
  dir,
  filter,
  fields,
  onChange,
  onRemove,
  placement,
  primaryColor,
  negativeColor
}) => {
  const [dropdown, setDropdown] = useState(false);
  const [editing, setEditing] = useState(false);

  const field = useMemo(() => fields.find(f => f.key === filter.field), [filter, fields]);
  const tagLabel = useMemo(() => fnTagLabel(filter, fields), [filter, fields]);
  const tagButton = useMemo(() => fnTagButton(filter), [filter]);
  const tagValue = useMemo(() => fnTagValue(filter, !!field && field.type === Type.date), [
    filter,
    field
  ]);
  const tagColor = useMemo(() => fnTagColor(filter, primaryColor, negativeColor), [
    filter,
    primaryColor,
    negativeColor
  ]);

  const change = (field: keyof IFilterObject, value: any) => {
    onChange({ ...filter, [field]: value });
  };

  const onUpdate = (filter: IFilterObject) => {
    onChange(filter);
    setDropdown(false);
  };

  const doRemove = () => {
    setDropdown(false);
    onRemove();
  };

  const menuClicked = ({ key, domEvent }: ClickParam) => {
    if (key === "edit") {
      setEditing(true);
      domEvent.stopPropagation();
    }
    if (key === "active") {
      change("active", !filter.active);
    }
    if (key === "negative") {
      change("negative", filter.negative !== true);
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
      <Menu.Item key="negative">
        <Icon type={filter.negative ? "plus-circle" : "minus-circle"} />{" "}
        {filter.negative ? "Include" : "Exclude"}
      </Menu.Item>
      <Menu.Item key="remove">
        <Icon type="delete" /> Remove
      </Menu.Item>
    </Menu>
  );

  const form = (
    <div dir={dir}>
      <RsbFilterForm
        fields={fields}
        filter={filter}
        onChange={onUpdate}
        onCancel={() => setDropdown(false)}
        onRemove={doRemove}
      />
    </div>
  );

  return (
    <Tag
      color={tagColor}
      className="arsb-filter__tag"
      style={{ opacity: filter.active !== false ? 1 : 0.5 }}
    >
      <Dropdown
        trigger={["click"]}
        visible={dropdown}
        placement={placement}
        overlayClassName={`arsb-color--${negativeColor}`}
        overlay={editing || filter.required ? form : menu}
        onVisibleChange={setDropdown}
      >
        <div className="arsb-filter__tag--inner">
          {!filter.required ? (
            <Button
              ghost
              type={tagButton}
              size="small"
              className={["arsb-filter__tag--checkbox", `arsb-${tagColor}`].join(" ")}
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
          <div className="arsb-filter__tag--label">
            <bdi>
              <b>{tagLabel}</b>
            </bdi>
            <i style={{ textDecoration: filter.negative ? "line-through" : "none" }}>
              {OperatorLabel[filter.operator]}
            </i>
            <bdi>{tagValue}</bdi>
          </div>
        </div>
      </Dropdown>
      <Button
        ghost
        type={tagButton}
        size="small"
        onClick={onRemove}
        className={`arsb-${tagColor}`}
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
