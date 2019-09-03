import React from "react";
import { Badge, Tag } from "antd";

export const RsbFilterButton: React.FC<{
  collapsed?: boolean;
  filterCount?: number;
  onCollapsed?: () => void;
}> = ({ collapsed, onCollapsed, filterCount }) => {
  return (
    <Tag className="arsb-filter__button" onClick={onCollapsed}>
      <label style={{ fontWeight: collapsed ? "normal" : "bold" }}>Filters</label>
      <Badge showZero className={collapsed ? "collapsed" : "expanded"} count={filterCount} />
    </Tag>
  );
};
