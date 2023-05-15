import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";
import "./style.scss";

BaseDropdown.propTypes = {
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
  text: PropTypes.string,

  options: PropTypes.array,

  containerClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  selectClassName: PropTypes.string,
  value: PropTypes.string,
  onValueChanged: PropTypes.func,
  dropdownInitialValue: PropTypes.string,
  require: PropTypes.bool,
  additionalElement: PropTypes.element,
};

BaseDropdown.defaultProps = {
  label: "",
  disabled: false,
  text: "",
  options: [],
  containerClassName: "",
  labelClassName: "text-remaining",
  selectClassName: "",
  value: "",
  onValueChanged: null,
  dropdownInitialValue: "",
  require: false,
  additionalElement: null,
};

function BaseDropdown(props) {
  // MARK: --- Params ---
  const {
    name,
    label,
    disabled,
    text,
    options,
    containerClassName,
    labelClassName,
    selectClassName,
    value,
    onValueChanged,
    dropdownInitialValue,
    require,
    additionalElement,
  } = props;
  const showError = false;
  const [dropdownValue, setDropdownValue] = useState(dropdownInitialValue);

  // MARK: --- Functions ---
  function handleOptionChanged(e) {
    if (onValueChanged) {
      onValueChanged(e);
    }
  }

  useEffect(() => {
    if (value && options.length > 0) {
      setDropdownValue(options.filter((item) => item.value === value)[0]?.text);
    } else {
      setDropdownValue(dropdownInitialValue);
    }
  }, [value, options]);

  return (
    <div className={`BaseDropdown ${containerClassName}`}>
      {label && (
        <label
          className={`col-form-label text-remaining text-left text-xl-right ${labelClassName}`}
        >
          {label}
          {require && (
            <span
              className="text-danger ms-1"
            >{`*`}</span>
          )}
        </label>
      )}
      <div className={` ${selectClassName}`}>
        <Dropdown>
          <Dropdown.Toggle
            id={name}
            disabled={disabled}
            className={`w-100 cursor-pointer bg-white border d-flex flex-row align-items-center justify-content-between shadow-none ${
              showError ? "is-invalid" : ""
            }`}
            value={value}
            variant=""
          >
            <p className="m-0 q-max-line-1">{dropdownValue}</p>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {options.length > 0 ? (
              options.map((item, index) => {
                return (
                  <Dropdown.Item
                    key={index}
                    value={item.value}
                    onClick={() => {
                      setDropdownValue(item.text);
                      handleOptionChanged(item.value);
                    }}
                    className="d-flex flex-row align-items-center justify-content-between"
                  >
                    <span>{item.text}</span>
                    {item.value === value && (
                      <i className="fas fa-check text-primary"></i>
                    )}
                  </Dropdown.Item>
                );
              })
            ) : (
              <div className="d-flex align-items-center justify-content-center flex-column">
                {additionalElement && <div>
                  {additionalElement}
                </div>}
              </div>
            )}
          </Dropdown.Menu>
        </Dropdown>
        {text.length > 0 && (
          <span className="form-text text-muted">{text}</span>
        )}
      </div>
    </div>
  );
}

export default BaseDropdown;
