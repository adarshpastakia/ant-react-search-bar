"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RsbFilterContainer = void 0;

var _react = _interopRequireWildcard(require("react"));

var _typestyle = require("typestyle");

var _antd = require("antd");

var _FilterTag = require("./FilterTag");

var _FilterForm = require("./FilterForm");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var css = (0, _typestyle.stylesheet)({
  filters: {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center"
  },
  addButton: {
    borderStyle: "dashed"
  }
});

var RsbFilterContainer = function RsbFilterContainer(_ref) {
  var _ref$filters = _ref.filters,
      filters = _ref$filters === void 0 ? [] : _ref$filters,
      fields = _ref.fields,
      _ref$placement = _ref.placement,
      placement = _ref$placement === void 0 ? "bottomLeft" : _ref$placement,
      disabled = _ref.disabled,
      onChange = _ref.onChange;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      dropdown = _useState2[0],
      setDropdown = _useState2[1];

  var toggleAll = function toggleAll(e) {
    var newList = _toConsumableArray(filters);

    newList.forEach(function (f) {
      return !f.required ? f.active = e : false;
    });
    onChange && onChange(newList);
  };

  var onUpdate = function onUpdate(index, filter) {
    var newList = _toConsumableArray(filters);

    newList[index] = filter;
    onChange && onChange(newList);
  };

  var _onRemove = function onRemove(index) {
    onChange && onChange(filters.filter(function (_, i) {
      return i !== index;
    }));
  };

  var onRemoveAll = function onRemoveAll() {
    onChange && onChange(filters.filter(function (f) {
      return !!f.required;
    }));
  };

  var onAdd = function onAdd(filter) {
    onChange && onChange([].concat(_toConsumableArray(filters), [filter]));
    setDropdown(false);
  };

  var allMenu = _react.default.createElement(_antd.Menu, null, _react.default.createElement("h4", {
    style: {
      padding: "0 16px"
    }
  }, "All Filters"), _react.default.createElement(_antd.Menu.Item, {
    onClick: function onClick() {
      return toggleAll(true);
    },
    disabled: !filters.some(function (f) {
      return !f.required && f.active === false;
    })
  }, _react.default.createElement(_antd.Icon, {
    type: "eye"
  }), " Enable All"), _react.default.createElement(_antd.Menu.Item, {
    onClick: function onClick() {
      return toggleAll(false);
    },
    disabled: !filters.some(function (f) {
      return !f.required && f.active !== false;
    })
  }, _react.default.createElement(_antd.Icon, {
    type: "eye-invisible"
  }), " Disable All"), _react.default.createElement(_antd.Menu.Item, {
    onClick: onRemoveAll,
    disabled: !filters.filter(function (f) {
      return !f.required;
    }).length
  }, _react.default.createElement(_antd.Icon, {
    type: "delete"
  }), " Remove All"));

  return _react.default.createElement("div", {
    className: css.filters
  }, _react.default.createElement(_antd.Dropdown, {
    overlay: allMenu,
    placement: placement,
    trigger: ["click"],
    disabled: disabled
  }, _react.default.createElement(_antd.Button, {
    type: "link"
  }, _react.default.createElement(_antd.Icon, {
    type: "setting",
    theme: "twoTone"
  }))), filters.map(function (f, i) {
    return _react.default.createElement(_FilterTag.RsbFilterTag, {
      key: "tag".concat(i),
      filter: f,
      fields: fields,
      placement: placement,
      onRemove: function onRemove() {
        return _onRemove(i);
      },
      onChange: function onChange(f) {
        return onUpdate(i, f);
      }
    });
  }), fields && !!fields.length && _react.default.createElement(_antd.Dropdown, {
    disabled: disabled,
    overlay: dropdown ? _react.default.createElement(_FilterForm.RsbFilterForm, {
      fields: fields,
      onChange: onAdd,
      onCancel: function onCancel() {
        return setDropdown(false);
      }
    }) : _react.default.createElement("div", null),
    placement: placement,
    trigger: ["click"],
    visible: dropdown,
    onVisibleChange: function onVisibleChange(v) {
      return setDropdown(v);
    }
  }, _react.default.createElement(_antd.Tag, {
    className: css.addButton
  }, "Add Filter")));
};

exports.RsbFilterContainer = RsbFilterContainer;