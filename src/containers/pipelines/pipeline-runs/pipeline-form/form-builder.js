import React from 'react';
import PropTypes from 'prop-types';
import QmarkOutlined from 'icons/QmarkOutlined';

const FormBuilder = ({ field, fieldName }) => {
// assign required values to each element for click handler
  console.log(field, fieldName);
  if (field.input_type === 'str') {
    return (
      <>
        <label>
          {fieldName}
          <QmarkOutlined />
        </label>
        <input type="text" id={fieldName} name={fieldName} defaultValue={field.default} />
        <br />
      </>
    );
  } if (field.input_type === 'int') {
    return (
      <>
        <label>
          {fieldName}
          <QmarkOutlined />
        </label>
        <input type="number" id={fieldName} name={fieldName} defaultValue={field.default} />
        <br />
      </>
    );
  } if (field.input_type === 'title') {
    return (
      <>
        <h4 style={{ textDecoration: 'underline' }}>
          {fieldName}
        </h4>
        <br />
      </>
    );
  } if (field.input_type === 'boolean') {
    return (
      <>
        <label>
          {fieldName}
          <QmarkOutlined />
        </label>
        <input type="text" id={fieldName} name={fieldName} defaultValue={field.default} />
        <br />
      </>
    );
  } if (field.input_type === 'str optional') {
    return (
      <>
        <label>
          {fieldName}
          (optional)
          <QmarkOutlined />
        </label>
        <input type="text" id={fieldName} name={fieldName} defaultValue={field.default} />
        <br />
      </>
    );
  } if (field.input_type === 'str required') {
    return (
      <>
        <label>
          {fieldName}
          (required)
          <QmarkOutlined />
        </label>
        <input type="text" id={fieldName} name={fieldName} defaultValue={field.default} />
        <br />
      </>
    );
  }
  return (
    <>
      <div>
        Invalid configuration for the
        {' '}
        {fieldName}
        {' '}
        field.
      </div>
    </>
  );
};

FormBuilder.propTypes = {
  field: PropTypes.shape({
    root: PropTypes.string.isRequired,
    input_type: PropTypes.string.isRequired,
    default: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  fieldName: PropTypes.string.isRequired,
};

export default FormBuilder;
