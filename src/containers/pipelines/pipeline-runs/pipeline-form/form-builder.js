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

const FormLabel = styled.label`
  min-width: 15rem;
`;

const FormBuilder = ({
  field, fieldName, fieldId, handleChange, value, type,
}) => {
  // simple dropdown tooltip
  const menu = (
    <AppDropdownMenu>
      <AppDropdownMenuItem>
        {field.description}
      </AppDropdownMenuItem>
    </AppDropdownMenu>
  );

  const validInputTypes = {
    csv: ['str', 'str optional', 'str required', 'float', 'int', 'int optional', 'int required', 'boolean', 'enum', 'set', 'title'],
    rc: ['str', 'title'],
    json: ['str', 'str optional', 'str required', 'float', 'int', 'int optional', 'int required', 'boolean', 'arr', 'enum', 'set', 'title'],
  };

  let fieldType = 'text';
  let requirement = '';
  const isValid = validInputTypes[type].includes(field.input_type);

  switch (field.input_type) {
    case 'str':
      fieldType = 'text';
      requirement = '';
      break;
    case ' optional':
      fieldType = 'text';
      requirement = '(optional)';
      break;
    case 'str required':
      fieldType = 'text';
      requirement = '(required)';
      break;
    case 'float':
      fieldType = 'number';
      requirement = '';
      break;
    case 'int':
      fieldType = 'number';
      requirement = '';
      break;
    case 'int optional':
      fieldType = 'number';
      requirement = '(optional)';
      break;
    case 'int required':
      fieldType = 'number';
      requirement = '(required)';
      break;
    case 'boolean':
      fieldType = 'text';
      requirement = '(true/false)';
      break;
    case 'arr':
      fieldType = 'text';
      requirement = '';
      break;
    default:
      fieldType = 'text';
      requirement = '(invalid configuration)';
  }

  if (isValid) {
    if (field.input_type !== 'title') {
      return (
        <>
          <FormLabel>
            {fieldName}
            {requirement}
          </FormLabel>
          <input
            type={fieldType}
            id={fieldId}
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
    } if (field.input_type === 'title') {
      return (
        <>
          <h4 style={{ textDecoration: 'underline' }}>
            {fieldName}
          </h4>
          <br />
        </>
      );
    }
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
  fieldId: PropTypes.string.isRequired,
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
