import React, { ReactElement } from "react";
import { IFilterField, IFilterObject, IQueryObject } from "./utils/models";
import { Menu, Select } from "antd";
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
export declare const ReactSearchBar: React.FC<ISearchBarProps>;
export {};
