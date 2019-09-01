"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RsbFilterTag = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _models = require("../utils/models");

var _typestyle = require("typestyle");

var _FilterForm = require("./FilterForm");

var _utils = require("../utils/utils");

var _antReactDateSelector = require("ant-react-date-selector");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var css = (0, _typestyle.stylesheet)({
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

var tagColor = function tagColor(f) {
  if (f.active === false) {
    return "";
  } else if (f.operator.toString().includes("NOT")) {
    return "red";
  } else {
    return "blue";
  }
};

var tagButton = function tagButton(f) {
  if (f.operator.toString().includes("NOT")) {
    return "danger";
  } else {
    return "primary";
  }
};

var tagLabel = function tagLabel(f, fields) {
  var field = fields.find(function (ff) {
    return ff.key === f.field;
  });
  return field ? field.name : f.field;
};

var tagValue = function tagValue(f, isDate) {
  if (f.label) {
    return f.label;
  } else if (isDate && f.value) {
    return _antReactDateSelector.DateUtil.label(f.value.toString());
  } else if (Array.isArray(f.value)) {
    return "[".concat(f.value, "]");
  } else if ([_models.Operator.WITHIN, _models.Operator.NOT_WITHIN].includes(f.operator)) {
    return "Area";
  } else {
    return f.value !== undefined ? "".concat(f.value) : "";
  }
};

var RsbFilterTag = function RsbFilterTag(_ref) {
  var filter = _ref.filter,
      fields = _ref.fields,
      onChange = _ref.onChange,
      onRemove = _ref.onRemove,
      placement = _ref.placement;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      dropdown = _useState2[0],
      setDropdown = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      editing = _useState4[0],
      setEditing = _useState4[1];

  var field = fields.find(function (f) {
    return f.key === filter.field;
  });

  var change = function change(field, value) {
    onChange(_objectSpread({}, filter, _defineProperty({}, field, value)));
  };

  var onUpdate = function onUpdate(filter) {
    onChange(filter);
    setDropdown(false);
  };

  var menuClicked = function menuClicked(_ref2) {
    var key = _ref2.key,
        domEvent = _ref2.domEvent;

    if (key === "edit") {
      setEditing(true);
      domEvent.stopPropagation();
    }

    if (key === "active") {
      change("active", !filter.active);
    }

    if (key === "operator") {
      change("operator", (0, _utils.toggleOperator)(filter.operator));
    }

    if (key === "remove") {
      setDropdown(false);
      onRemove();
    }
  };

  (0, _react.useEffect)(function () {
    return setEditing(false);
  }, [dropdown]);

  var menu = _react.default.createElement(_antd.Menu, {
    onClick: menuClicked
  }, filter.editable !== false && _react.default.createElement(_antd.Menu.Item, {
    key: "edit"
  }, _react.default.createElement(_antd.Icon, {
    type: "edit"
  }), " Edit", " ", _react.default.createElement(_antd.Icon, {
    type: "right",
    style: {
      float: "right",
      opacity: 0.5,
      marginTop: 4
    }
  })), _react.default.createElement(_antd.Menu.Item, {
    key: "active"
  }, _react.default.createElement(_antd.Icon, {
    type: filter.active ? "eye-invisible" : "eye"
  }), " ", filter.active ? "Disable" : "Enable"), _react.default.createElement(_antd.Menu.Item, {
    key: "operator"
  }, _react.default.createElement(_antd.Icon, {
    type: (0, _utils.isNot)(filter.operator) ? "plus-circle" : "minus-circle"
  }), " ", (0, _utils.isNot)(filter.operator) ? "Include" : "Exclude"), _react.default.createElement(_antd.Menu.Item, {
    key: "remove"
  }, _react.default.createElement(_antd.Icon, {
    type: "delete"
  }), " Remove"));

  var form = _react.default.createElement(_FilterForm.RsbFilterForm, {
    fields: fields,
    filter: filter,
    onChange: onUpdate,
    onCancel: function onCancel() {
      return setDropdown(false);
    },
    onRemove: onRemove
  });

  return _react.default.createElement(_antd.Tag, {
    color: tagColor(filter),
    className: css.tag,
    style: {
      opacity: filter.active !== false ? 1 : 0.5
    }
  }, _react.default.createElement(_antd.Dropdown, {
    trigger: ["click"],
    visible: dropdown,
    placement: placement,
    overlay: editing || filter.required ? form : menu,
    onVisibleChange: setDropdown
  }, _react.default.createElement("div", {
    className: css.tagInner
  }, !filter.required ? _react.default.createElement(_antd.Button, {
    ghost: true,
    type: tagButton(filter),
    size: "small",
    className: css.tagCheckbox,
    style: {
      border: 0
    },
    onClick: function onClick(e) {
      return [change("active", !(filter.active !== false)), e.stopPropagation()];
    }
  }, _react.default.createElement(_antd.Icon, {
    theme: "filled",
    type: filter.active !== false ? "check-square" : "blank",
    style: {
      width: "1em",
      height: "1em",
      border: "solid #000",
      borderWidth: filter.active !== false ? 0 : 1
    }
  })) : _react.default.createElement("span", null, "\xA0"), _react.default.createElement("div", {
    className: css.tagLabel
  }, _react.default.createElement("bdi", null, _react.default.createElement("b", null, tagLabel(filter, fields))), _react.default.createElement("i", {
    style: {
      textDecoration: (0, _utils.isNot)(filter.operator) ? "line-through" : "none"
    }
  }, (0, _utils.tagOperator)(filter.operator)), _react.default.createElement("bdi", null, tagValue(filter, field && field.type === _models.Type.date))))), _react.default.createElement(_antd.Button, {
    ghost: true,
    type: tagButton(filter),
    size: "small",
    onClick: onRemove,
    disabled: filter.required,
    style: {
      border: 0,
      width: filter.required ? 0 : "unset",
      opacity: filter.required ? 0 : 1
    }
  }, _react.default.createElement(_antd.Icon, {
    type: "close-circle"
  })));
};

exports.RsbFilterTag = RsbFilterTag;