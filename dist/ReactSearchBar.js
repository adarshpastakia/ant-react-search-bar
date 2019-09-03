"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReactSearchBar = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _FilterButton = require("./components/FilterButton");

var _ReactFilterBar = require("./ReactFilterBar");

var _isRtl = require("./utils/isRtl");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ReactSearchBar = function ReactSearchBar(_ref) {
  var _ref$collapsed = _ref.collapsed,
      collapsed = _ref$collapsed === void 0 ? true : _ref$collapsed,
      onCollapsed = _ref.onCollapsed,
      placeholder = _ref.placeholder,
      filters = _ref.filters,
      onFilterChange = _ref.onFilterChange,
      onSearch = _ref.onSearch,
      query = _ref.query,
      onQueryChange = _ref.onQueryChange,
      _ref$fields = _ref.fields,
      fields = _ref$fields === void 0 ? [] : _ref$fields,
      options = _ref.options,
      actions = _ref.actions,
      disabled = _ref.disabled,
      primaryColor = _ref.primaryColor,
      negativeColor = _ref.negativeColor,
      children = _ref.children;

  var _useState = (0, _react.useState)(collapsed),
      _useState2 = _slicedToArray(_useState, 2),
      isCollapsed = _useState2[0],
      setIsCollapsed = _useState2[1];

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
        filters: filters || []
      });
    }
  };

  var _useIsLtr = (0, _isRtl.useIsLtr)(),
      _useIsLtr2 = _slicedToArray(_useIsLtr, 2),
      isLtr = _useIsLtr2[0],
      ref = _useIsLtr2[1];

  return _react.default.createElement("div", {
    ref: ref,
    className: "arsb-".concat(primaryColor)
  }, _react.default.createElement("div", {
    className: "arsb-filter__bar"
  }, _react.default.createElement(_antd.Input.Group, {
    compact: true,
    className: "arsb-search__bar"
  }, !!filters && _react.default.createElement(_FilterButton.RsbFilterButton, {
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
  }))), !!filters && !isCollapsed && _react.default.createElement(_ReactFilterBar.ReactFilterBar, {
    primaryColor: primaryColor,
    negativeColor: negativeColor,
    filters: filters,
    fields: fields,
    disabled: disabled,
    onFilterChange: onFilterChange
  }));
};

exports.ReactSearchBar = ReactSearchBar;