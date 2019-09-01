"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReactSearchBar = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _typestyle = require("typestyle");

var _FilterButton = require("./components/FilterButton");

var _FilterContainer = require("./components/FilterContainer");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

(0, _typestyle.cssRule)("[dir='rtl']", {
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
var css = (0, _typestyle.stylesheet)({
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

var useIsLtr = function useIsLtr() {
  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      isLtr = _useState2[0],
      setIsLtr = _useState2[1];

  var ref = (0, _react.useCallback)(function (node) {
    if (node !== null) {
      setIsLtr((node ? getComputedStyle(node).direction : "ltr") !== "rtl");
    }
  }, []);
  return [isLtr, ref];
};

var ReactSearchBar = function ReactSearchBar(_ref) {
  var _ref$collapsed = _ref.collapsed,
      collapsed = _ref$collapsed === void 0 ? true : _ref$collapsed,
      onCollapsed = _ref.onCollapsed,
      placeholder = _ref.placeholder,
      hasFilters = _ref.hasFilters,
      _ref$filters = _ref.filters,
      filters = _ref$filters === void 0 ? [] : _ref$filters,
      onFilterChange = _ref.onFilterChange,
      onSearch = _ref.onSearch,
      query = _ref.query,
      onQueryChange = _ref.onQueryChange,
      _ref$fields = _ref.fields,
      fields = _ref$fields === void 0 ? [] : _ref$fields,
      options = _ref.options,
      actions = _ref.actions,
      disabled = _ref.disabled,
      children = _ref.children;

  var _useState3 = (0, _react.useState)(collapsed),
      _useState4 = _slicedToArray(_useState3, 2),
      isCollapsed = _useState4[0],
      setIsCollapsed = _useState4[1];

  var toggleCollapsed = function toggleCollapsed() {
    setIsCollapsed(!isCollapsed);

    if (onCollapsed) {
      onCollapsed(!isCollapsed);
    }
  };

  var onSubmit = function onSubmit() {
    if (onSearch) {
      onSearch({
        query: query,
        filters: filters
      });
    }
  };

  var _useIsLtr = useIsLtr(),
      _useIsLtr2 = _slicedToArray(_useIsLtr, 2),
      isLtr = _useIsLtr2[0],
      ref = _useIsLtr2[1];

  return _react.default.createElement("div", {
    ref: ref
  }, _react.default.createElement("div", {
    className: css.filterBar
  }, _react.default.createElement(_antd.Input.Group, {
    compact: true,
    className: css.searchBar
  }, hasFilters && _react.default.createElement(_FilterButton.RsbFilterButton, {
    collapsed: isCollapsed,
    onCollapsed: toggleCollapsed,
    filterCount: filters.length
  }), options, _react.default.createElement(_antd.Input.Search, {
    allowClear: true,
    disabled: disabled,
    prefix: _react.default.createElement(_antd.Icon, {
      type: "right"
    }),
    placeholder: placeholder,
    onSearch: onSubmit,
    onChange: function onChange(e) {
      return onQueryChange && onQueryChange(e.target.value);
    }
  })), children, actions && _react.default.createElement(_antd.Dropdown, {
    placement: isLtr ? "bottomRight" : "bottomLeft",
    overlay: actions,
    trigger: ["click"]
  }, _react.default.createElement(_antd.Button, {
    icon: "menu"
  }))), hasFilters && !isCollapsed && _react.default.createElement(_FilterContainer.RsbFilterContainer, {
    placement: isLtr ? "bottomLeft" : "bottomRight",
    filters: filters,
    fields: fields,
    disabled: disabled,
    onChange: onFilterChange
  }));
};

exports.ReactSearchBar = ReactSearchBar;