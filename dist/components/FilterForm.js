"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RsbFilterForm = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _typestyle = require("typestyle");

var _models = require("../utils/models");

var _FilterOperator = require("./FilterOperator");

var _FilterValue = require("./FilterValue");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var css = (0, _typestyle.stylesheet)({
  form: {
    backgroundColor: "#fff",
    padding: "0 16px",
    border: "1px solid rgba(0,0,0,.1)",
    $nest: {
      "& .ant-form-item-label": {
        lineHeight: 1,
        fontWeight: "bold"
      },
      "& .ant-form-item-label label": {
        fontSize: ".8em"
      }
    }
  }
});

var FilterForm = function FilterForm(_ref) {
  var filter = _ref.filter,
      fields = _ref.fields,
      form = _ref.form,
      onRemove = _ref.onRemove,
      onCancel = _ref.onCancel,
      onChange = _ref.onChange;
  var getFieldDecorator = form.getFieldDecorator;

  var _useState = (0, _react.useState)(filter && !!filter.label),
      _useState2 = _slicedToArray(_useState, 2),
      hasLabel = _useState2[0],
      setHasLabel = _useState2[1];

  var _useState3 = (0, _react.useState)(filter || {
    field: "",
    value: ""
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      filterObject = _useState4[0],
      setFilterObject = _useState4[1];

  var change = function change(field, value) {
    var newFilter = _objectSpread({}, filterObject, _defineProperty({}, field, value));

    if (field === "operator") {
      if ([_models.Operator.EXISTS, _models.Operator.NOT_EXISTS].includes(value)) {
        newFilter.value = undefined;
      } else if (newFilter.value === undefined) {
        newFilter.value = false;
      }
    }

    setFilterObject(newFilter);
  };

  var apply = function apply() {
    form.validateFields(function (e) {
      if (!e) {
        onChange(filterObject);
      }
    });
  };

  var field = fields.find(function (f) {
    return f.key === filterObject.field;
  });
  return _react.default.createElement(_antd.Form, {
    className: css.form,
    onSubmit: apply
  }, _react.default.createElement(_antd.Row, {
    gutter: 8,
    style: {
      width: 420
    }
  }, _react.default.createElement(_antd.Col, {
    span: 12
  }, _react.default.createElement(_antd.Form.Item, {
    label: "Field",
    colon: false,
    required: false
  }, getFieldDecorator("field", {
    rules: [{
      required: true
    }],
    initialValue: filterObject.field
  })(_react.default.createElement(_antd.Select, {
    onChange: function onChange(f) {
      return change("field", f);
    }
  }, fields.filter(function (f) {
    return f.type !== _models.Type.geo;
  }).map(function (f) {
    return _react.default.createElement(_antd.Select.Option, {
      key: f.key,
      value: f.key
    }, f.name);
  }))))), _react.default.createElement(_antd.Col, {
    span: 12
  }, _react.default.createElement(_FilterOperator.RsbFilterOperator, {
    form: form,
    fieldType: field && field.type,
    value: filterObject && filterObject.operator,
    onChange: function onChange(o) {
      return change("operator", o);
    }
  }))), ![_models.Operator.EXISTS, _models.Operator.NOT_EXISTS].includes(filterObject.operator) && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_FilterValue.RsbFilterValue, {
    form: form,
    operator: filterObject.operator,
    fieldType: field && field.type,
    fieldValues: field && field.values,
    value: filterObject.value,
    onChange: function onChange(v) {
      return change("value", v);
    }
  }), _react.default.createElement(_antd.Form.Item, {
    label: "Label",
    colon: false,
    required: false
  }, getFieldDecorator("label", {
    rules: [{
      required: hasLabel
    }],
    initialValue: filterObject.label
  })(_react.default.createElement(_antd.Input, {
    disabled: !hasLabel,
    onChange: function onChange(e) {
      return change("label", e.target.value);
    },
    addonBefore: _react.default.createElement(_antd.Checkbox, {
      checked: hasLabel,
      onChange: function onChange(e) {
        return setHasLabel(e.target.checked);
      }
    })
  })))), _react.default.createElement("div", {
    style: {
      display: "grid",
      gridGap: 4,
      gridTemplateColumns: "auto 1fr auto auto",
      padding: "0 0 8px"
    }
  }, _react.default.createElement(_antd.Button, {
    size: "small",
    type: "danger",
    ghost: true,
    onClick: onRemove,
    disabled: !filter || filter.required
  }, "Delete"), _react.default.createElement("div", null), _react.default.createElement(_antd.Button, {
    size: "small",
    onClick: onCancel
  }, "Cancel"), _react.default.createElement(_antd.Button, {
    size: "small",
    type: "primary",
    onClick: apply
  }, "Apply")));
};

var RsbFilterForm = _antd.Form.create()(FilterForm);

exports.RsbFilterForm = RsbFilterForm;