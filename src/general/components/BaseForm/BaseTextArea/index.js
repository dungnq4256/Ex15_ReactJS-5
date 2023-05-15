import React, { useState } from "react";
import PropTypes from "prop-types";

BaseTextArea.propTypes = {
    name: PropTypes.string.isRequired,
    resizable: PropTypes.bool,
    error: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    rows: PropTypes.number,
    autoHeight: PropTypes.bool,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    text: PropTypes.string,
    className: PropTypes.string,
};

BaseTextArea.defaultProps = {
    resizable: true,
    rows: 3,
    error: "",
    value: "",
    onChange: null,
    autoHeight: false,
    label: "",
    placeholder: "",
    disabled: false,
    text: "",

    className: "form-group",
};

function BaseTextArea(props) {
    // MARK: --- Params ---
    const {
        name,
        label,
        value,
        onChange,
        error,
        placeholder,
        disabled,
        text,
        rows,
        autoHeight,
        resizable,
        className,
    } = props;

    const [isError, setError] = useState(false);

    const handleOnBlur = () => {
        if (value.trim() === "") {
            setError(true);
        } else {
            setError(false);
        }
    };
    return (
        <div className="BaseTextArea w-100">
            <div className={className}>
                {label && (
                    <label className="text-remaining" htmlFor={name}>
                        {label}
                    </label>
                )}
                <textarea
                    id={name}
                    className={`form-control form-control-sm ${
                        isError ? "is-invalid" : ""
                    } ${resizable ? "" : "resize-none"}`}
                    rows={rows}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    placeholder={placeholder}
                    onBlur={handleOnBlur}
                ></textarea>

                {isError && (
                    <div className="mt-1 ms-2">
                        <div className="err-text-field">{error}</div>
                    </div>
                )}

                <span className="form-text text-muted">{text}</span>
            </div>
        </div>
    );
}

export default BaseTextArea;
