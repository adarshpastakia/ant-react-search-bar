import React, { useEffect, useState } from "react";
import { Badge, Tag } from "antd";
import { stylesheet } from "typestyle";

const css = stylesheet({
  filterButton: {
    userSelect: "none",
    cursor: "pointer",
    $nest: {
      "&&": {
        display: "flex",
        flexFlow: "row nowrap",
        alignItems: "center"
      },
      "&:hover label": {
        cursor: "pointer",
        textDecoration: "underline"
      },
      "& sup": {
        borderRadius: 4,
        height: 16,
        lineHeight: "1.5em",
        minWidth: "1em",
        fontWeight: "bold",
        fontSize: ".8em",
        margin: "0 4px"
      }
    }
  }
});

export const RsbFilterButton: React.FC<{
  collapsed?: boolean;
  filterCount?: number;
  onCollapsed?: () => void;
}> = ({ collapsed, onCollapsed, filterCount }) => {
  return (
    <Tag className={css.filterButton} onClick={onCollapsed}>
      <label style={{ fontWeight: collapsed ? "normal" : "bold" }}>Filters</label>
      <Badge
        showZero
        count={filterCount}
        style={{
          backgroundColor: collapsed ? "rgba(0,0,0,.1)" : "#1890ff",
          color: collapsed ? "rgba(0,0,0,.6)" : "white"
        }}
      />
    </Tag>
  );
};
