import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Dropdown, Menu } from 'antd';
import colors from 'styles/colors';
import QmarkOutlined from 'icons/QmarkOutlined';

const AppDropdown = styled(Dropdown)`
  user-select: none;
  z-index: 3;
  .anticon {
    border-radius: 50%;
    height: 14px;
    width: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      width: 10px;
      height: 6px;
    }
  }
  &:hover .anticon {
    background-color: ${colors.lightGrey};
  }
`;

const AppDropdownMenu = styled(Menu)`
  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.05));
  box-shadow: none;
  border-radius: 3px;
  padding: 0;
  min-width: 87px;
  right: 16px;
  right: 1rem;
`;

const AppDropdownMenuItem = styled(Menu.Item)`
  padding: 10px;
  padding: 0.625rem;
  text-align: center;
  a {
    color: ${colors.lightBlue};
    font-weight: 500;
    &:hover {
      color: ${colors.blue};
    }
  }
  &:hover {
    background-color: transparent;
  }
`;

const FormBuilder = ({
  field, fieldName, handleChange, value, type,
}) => {
  // simple dropdown tooltip
  const menu = (
    <AppDropdownMenu>
      <AppDropdownMenuItem>
        {field.description}
      </AppDropdownMenuItem>
    </AppDropdownMenu>
  );

  // same text fields, however gets converted to json array elsewhere
  if ((type === 'json') && (field.input_type === 'arr')) {
    return (
      <>
        <label>
          {fieldName}
        </label>
        <input
          type="text"
          id={fieldName}
          name={fieldName}
          value={value.value}
          onChange={(e) => handleChange(e)}
        />
        <AppDropdown overlay={menu} trigger="click">
          <QmarkOutlined />
        </AppDropdown>
        <br />
      </>
    );
  }

  // Generates fields based on valid input_type, along with associated functionality
  if (field.input_type === 'str') {
    return (
      <>
        <label>
          {fieldName}
        </label>
        <input
          type="text"
          id={fieldName}
          name={fieldName}
          value={value.value}
          onChange={(e) => handleChange(e)}
        />
        <AppDropdown overlay={menu} trigger="click">
          <QmarkOutlined />
        </AppDropdown>
        <br />
      </>
    );
  } if (field.input_type === 'str optional') {
    return (
      <>
        <label>
          {fieldName}
          (optional)
        </label>
        <input
          type="text"
          id={fieldName}
          name={fieldName}
          value={value.value}
          onChange={(e) => handleChange(e)}
        />
        <AppDropdown overlay={menu} trigger="click">
          <QmarkOutlined />
        </AppDropdown>
        <br />
      </>
    );
  } if (field.input_type === 'str required') {
    return (
      <>
        <label>
          {fieldName}
          (required)
        </label>
        <input
          type="text"
          id={fieldName}
          name={fieldName}
          value={value.value}
          onChange={(e) => handleChange(e)}
        />
        <AppDropdown overlay={menu} trigger="click">
          <QmarkOutlined />
        </AppDropdown>
        <br />
      </>
    );
  } if (field.input_type === 'int') {
    return (
      <>
        <label>
          {fieldName}
        </label>
        <input
          type="number"
          id={fieldName}
          name={fieldName}
          value={value.value}
          onChange={(e) => handleChange(e)}
        />
        <AppDropdown overlay={menu} trigger="click">
          <QmarkOutlined />
        </AppDropdown>
        <br />
      </>
    );
  } if (field.input_type === 'int required') {
    return (
      <>
        <label>
          {fieldName}
          (required)
        </label>
        <input
          type="number"
          id={fieldName}
          name={fieldName}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <AppDropdown overlay={menu} trigger="click">
          <QmarkOutlined />
        </AppDropdown>
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
          (true/false)
        </label>
        <input
          type="text"
          id={fieldName}
          name={fieldName}
          value={value.value}
          onChange={(e) => handleChange(e)}
        />
        <AppDropdown overlay={menu} trigger="click">
          <QmarkOutlined />
        </AppDropdown>
        <br />
      </>
    );
  } if (field.input_type === 'float') {
    return (
      <>
        <label>
          {fieldName}
        </label>
        <input
          type="number"
          id={fieldName}
          name={fieldName}
          value={value.value}
          onChange={(e) => handleChange(e)}
        />
        <AppDropdown overlay={menu} trigger="click">
          <QmarkOutlined />
        </AppDropdown>
        <br />
      </>
    );
  } if (field.input_type === 'float required') {
    return (
      <>
        <label>
          {fieldName}
          (required)
        </label>
        <input
          type="number"
          id={fieldName}
          name={fieldName}
          value={value.value}
          onChange={(e) => handleChange(e)}
        />
        <AppDropdown overlay={menu} trigger="click">
          <QmarkOutlined />
        </AppDropdown>
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
    input_type: PropTypes.string.isRequired,
    default: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
    ]).isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  fieldName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
    ]).isRequired,
  }).isRequired,
  type: PropTypes.string.isRequired,
};

export default FormBuilder;
