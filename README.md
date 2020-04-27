# Ant.Design React Search Bar


> # DEPRECATED
> ## This repository is moved to [https://github.com/adarshpastakia/ant-extensions](https://github.com/adarshpastakia/ant-extensions)


### Kibana style search+filter bar

---

### Install

```shell
npm install ant-react-search-bar
```

---

### Basic Usage

- Component

```tsx
import React, { useState } from "react";
import { ReactSearchBar, RsbFilter, RsbField, RsbOperator, RsbType } from "../lib";

export const Tester = () => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState([
    {
      field: "string",
      operator: RsbOperator.IS,
      value: "test",
      required: true
    },
    {
      field: "string",
      operator: RsbOperator.IS,
      value: "hello",
      negative: true
    }
  ]);
  const fields: RsbField[] = [
    { key: "string", name: "String", type: RsbType.string },
    { key: "number", name: "Number", type: RsbType.number },
    { key: "bool", name: "Boolean", type: RsbType.boolean },
    { key: "date", name: "Date", type: RsbType.date },
    { key: "loc", name: "Location", type: RsbType.geo }
  ];

  const doSearch = () => api(query, filters);

  return (
    <ReactSearchBar
      collapsed={false}
      fields={fields}
      query={query}
      onQueryChange={setQuery}
      filters={filters}
      onFilterChange={setFilters}
      onSearch={doSearch}
    />
  );
};
```

- PROPS

```ts
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
```
