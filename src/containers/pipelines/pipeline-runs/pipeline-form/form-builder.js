import React from 'react';
import PropTypes from 'prop-types';
import QmarkOutlined from 'icons/QmarkOutlined';

const FormBuilder = ({ field, fieldName }) => {
// assign required values to each element for click handler
  console.log(field, fieldName);
  return (
    <>
      <label>
        {fieldName}
        <QmarkOutlined />
      </label>
      <input type="text" id={fieldName} name={fieldName} value={field.default} />
      <br />
    </>
  );
};

FormBuilder.propTypes = {
  field: PropTypes.shape({ root: PropTypes.string.isRequired }).isRequired,
  fieldName: PropTypes.string.isRequired,
};

export default FormBuilder;
