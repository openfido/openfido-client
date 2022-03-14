import React from 'react';

const FormBuilder = (props) => {
// assign required values to each element for click handler
  const { field, fieldName } = props;
  console.log(props);
  return (
    <>
      <label>
        {fieldName}
      </label>
      <input type="text" id={fieldName} name={fieldName} />
      <br />
    </>
  );
};

export default FormBuilder;
