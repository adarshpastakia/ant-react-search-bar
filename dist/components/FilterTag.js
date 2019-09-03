"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RsbFilterTag = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _models = require("../utils/models");

var _FilterForm = require("./FilterForm");

var _antReactDateSelector = require("ant-react-date-selector");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var fnTagColor = function fnTagColor(f) {
  var primaryColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "blue";
  var negativeColor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "red";

  if (f.active === false) {
    return "";
  } else if (f.negative) {
    return negativeColor;
  } else {
    return primaryColor;
  }
};

var fnTagButton = function fnTagButton(f) {
  return f.negative ? "danger" : "primary";
};

var fnTagLabel = function fnTagLabel(f, fields) {
  var field = fields.find(function (ff) {
    return ff.key === f.field;
  });
  return field ? field.name : f.field;
};

var fnTagValue = function fnTagValue(f, isDate) {
  if (f.label) {
    return f.label;
  } else if (isDate && f.value) {
    return _antReactDateSelector.DateUtil.label(f.value.toString());
  } else if (Array.isArray(f.value)) {
    return "[".concat(f.value, "]");
  } else if (f.operator === _models.Operator.WITHIN) {
    return "Area";
  } else {
    return f.value !== undefined ? "".concat(f.value) : "";
  }
};

var RsbFilterTag = function RsbFilterTag(_ref) {
  var dir = _ref.dir,
      filter = _ref.filter,
      fields = _ref.fields,
      onChange = _ref.onChange,
      onRemove = _ref.onRemove,
      placement = _ref.placement,
      primaryColor = _ref.primaryColor,
      negativeColor = _ref.negativeColor;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      dropdown = _useState2[0],
      setDropdown = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      editing = _useState4[0],
      setEditing = _useState4[1];

  var field = (0, _react.useMemo)(function () {
    return fields.find(function (f) {
      return f.key === filter.field;
    });
  }, [filter, fields]);
  var tagLabel = (0, _react.useMemo)(function () {
    return fnTagLabel(filter, fields);
  }, [filter, fields]);
  var tagButton = (0, _react.useMemo)(function () {
    return fnTagButton(filter);
  }, [filter]);
  var tagValue = (0, _react.useMemo)(function () {
    return fnTagValue(filter, !!field && field.type === _models.Type.date);
  }, [filter, field]);
  var tagColor = (0, _react.useMemo)(function () {
    return fnTagColor(filter, primaryColor, negativeColor);
  }, [filter, primaryColor, negativeColor]);

  var change = function change(field, value) {
    onChange(_objectSpread({}, filter, _defineProperty({}, field, value)));
  };

  var onUpdate = function onUpdate(filter) {
    onChange(filter);
    setDropdown(false);
  };

  var doRemove = function doRemove() {
    setDropdown(false);
    onRemove();
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

    if (key === "negative") {
      change("negative", filter.negative !== true);
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
    key: "negative"
  }, _react.default.createElement(_antd.Icon, {
    type: filter.negative ? "plus-circle" : "minus-circle"
  }), " ", filter.negative ? "Include" : "Exclude"), _react.default.createElement(_antd.Menu.Item, {
    key: "remove"
  }, _react.default.createElement(_antd.Icon, {
    type: "delete"
  }), " Remove"));

  var form = _react.default.createElement("div", {
    dir: dir
  }, _react.default.createElement(_FilterForm.RsbFilterForm, {
    fields: fields,
    filter: filter,
    onChange: onUpdate,
    onCancel: function onCancel() {
      return setDropdown(false);
    },
    onRemove: doRemove
  }));

  return _react.default.createElement(_antd.Tag, {
    color: tagColor,
    className: "arsb-filter__tag",
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
    className: "arsb-filter__tag--inner"
  }, !filter.required ? _react.default.createElement(_antd.Button, {
    ghost: true,
    type: tagButton,
    size: "small",
    className: "arsb-filter__tag--checkbox",
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
    className: "arsb-filter__tag--label"
  }, _react.default.createElement("bdi", null, _react.default.createElement("b", null, tagLabel)), _react.default.createElement("i", {
    style: {
      textDecoration: filter.negative ? "line-through" : "none"
    }
  }, _models.OperatorLabel[filter.operator]), _react.default.createElement("bdi", null, tagValue)))), _react.default.createElement(_antd.Button, {
    ghost: true,
    type: tagButton,
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