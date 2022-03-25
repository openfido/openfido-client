import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Dropdown, Menu } from 'antd';
import ReactSelect from 'react-select';
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

const FormSelect = styled.select`
  min-width: 10rem;
`;

const FormInput = styled.input`
  min-width: 10rem;
`;

const FormBuilder = ({
  field, fieldName, fieldId, handleChange, value, type, handleChangeSelect,
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
    csv: ['str', 'str optional', 'str required', 'float', 'int', 'int optional', 'int required', 'boolean', 'enum', 'set', 'title', 'upload'],
    rc: ['str', 'title', 'upload'],
    json: ['str', 'str optional', 'str required', 'float', 'int', 'int optional', 'int required', 'boolean', 'arr', 'enum', 'set', 'title', 'upload'],
  };

  // variable list to automatically (and cleanly) update field generation
  let fieldType = 'text';
  let requirement = '';
  const isValid = validInputTypes[type].includes(field.input_type);
  let isSelect = false;
  let isMultiSelect = false;
  let boolDefault = false;

  // updates the variables to generate a field based on the provided input type
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
      fieldType = 'checkbox';
      requirement = '(enable/disable)';
      boolDefault = (value.value === 'true');
      break;
    case 'arr':
      fieldType = 'text';
      requirement = '';
      break;
    case 'enum':
      isSelect = true;
      requirement = '(choose one)';
      break;
    case 'set':
      isSelect = true;
      isMultiSelect = true;
      requirement = '(choose all that apply)';
      break;
    default:
      fieldType = 'text';
      requirement = '(invalid configuration)';
  }

  // looking at merging multi select and select for cleaner/consistent implementation and styling
  if (isMultiSelect) {
    const options = [];
    field.default.split(',').map((choice) => options.push({
      label: choice,
      value: choice,
      id: fieldId,
    }));
    return (
      <>
        <FormLabel>
          {fieldName}
          {requirement}
        </FormLabel>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
        }}
        >
          <div
            style={{
              minWidth: '83%',
            }}
          >
            <ReactSelect
              isMulti
              options={options}
              name="ReactSelect"
              isClearable
              onChange={(e) => handleChangeSelect(e)}
            />
          </div>
          <AppDropdown overlay={menu} trigger="click">
            <QmarkOutlined />
          </AppDropdown>
        </div>
        <br />
      </>
    );
  }

  if (isSelect) {
    return (
      <>
        <FormLabel>
          {fieldName}
          {requirement}
        </FormLabel>
        <FormSelect
          id={fieldId}
          name={fieldName}
          value={value.value}
          onChange={(e) => handleChange(e)}
        >
          {field.default.split(',').map((choice) => <option value={choice} key={choice}>{choice}</option>)}
        </FormSelect>
        <AppDropdown overlay={menu} trigger="click">
          <QmarkOutlined />
        </AppDropdown>
        <br />
      </>
    );
  }

  // variables are great! almost as good as comments that tell you the past variables make this run
  if (isValid) {
    if (field.input_type !== 'title') {
      return (
        <>
          <FormLabel>
            {fieldName}
            {requirement}
          </FormLabel>
          <FormInput
            type={fieldType}
            id={fieldId}
            name={fieldName}
            value={value.value}
            defaultChecked={boolDefault}
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

  // Tells the user in which input they misconfigured the manifest.
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
  handleChangeSelect: PropTypes.func.isRequired,
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
