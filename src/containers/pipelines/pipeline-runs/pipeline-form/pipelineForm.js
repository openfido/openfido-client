import React, {
  useState, useEffect, useReducer,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  StyledButton,
} from 'styles/app';

import formReducer from 'reducers/configform';
import FormBuilder from './form-builder';

const PipelineFormStyled = styled.form`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: left;
  padding-bottom: 10px;
`;

const DEFAULT_STATE = {};

const PipelineForm = ({ config, formType, onInputFormSubmit }) => {
  const [fType, setFormType] = useState(undefined);
  const [fName, setFormName] = useState(undefined);
  // used to prepare the form for conversion
  const [formBuilder, setFormBuilder] = useState([]);
  const [isHidden, setIsHidden] = useState(false);
  const [toCsv, dispatch] = useReducer(formReducer, DEFAULT_STATE);

  useEffect(() => {
    const [fname, type] = formType;
    setFormName(fname);
    setFormType(type);
  }, [formType]);

  // generates the provided fieldnames into an array
  // prepares form for csv conversion and creates trackable state
  useEffect(() => {
    if (config === undefined) {
      setFormBuilder([]);
    } else {
      const configMapable = Object.keys(config);
      const cleanConfig = config;
      configMapable.map((item) => {
        if (cleanConfig[item].default === undefined) {
          cleanConfig[item].default = '';
        }
        if (cleanConfig[item].description === undefined) {
          cleanConfig[item].description = '';
        }
        if (cleanConfig[item].input_type === undefined) {
          cleanConfig[item].input_type = 'str';
        }
        cleanConfig[item].value = cleanConfig[item].default;
        if ((cleanConfig[item].input_type === 'enum') || (cleanConfig[item].input_type === 'set')) {
          cleanConfig[item].value = cleanConfig[item].default.split(',')[0]; // eslint-disable-line
        }
        return item;
      });
      dispatch({
        type: 'HANDLE INITIAL UPDATE',
        payload: cleanConfig,
      });
      setFormBuilder(configMapable);
    }
  }, [config]);

  const clickHide = () => {
    // magic button to hide/unhide form
    setIsHidden(!isHidden);
  };

  const handleChange = (e) => {
    dispatch({
      type: 'HANDLE INPUT TEXT',
      field: e.target.id,
      payload: e.target.value,
    });
  };

  // converts the data selected into a proper csv-string before updating state
  const handleChangeSelect = (data) => {
    const { id } = data[0];
    let input = '';
    for (let i = 0; i < data.length; i += 1) {
      if (i === 0) {
        input = data[i].value;
      } else {
        input += `, ${data[i].value}`;
      }
    }
    dispatch({
      type: 'HANDLE INPUT TEXT',
      field: id,
      payload: input,
    });
  };

  // const formValidator = (configMapable) => {
  //   // do magic;
  //   let passing = true;
  //   for (let i = 0; i < configMapable.length; i += 1) {
  //     console.log(toCsv[configMapable[i]]);
  //     if (toCsv[configMapable[i]].input_type.contains('required')) {
  //       if (toCsv[configMapable[i]].value.length === 0) {
  //         alert(`Please enter a value in the ${configMapable[i]} field`);
  //         passing = false;
  //         break;
  //       }
  //     }
  //   }
  //   return passing;
  // }; if (formValidator(configMapable))

  const handleRc = (configMapable) => {
    const temp = [];
    configMapable.map((item) => {
      if (toCsv[item].input_type === 'title') {
        return item;
      }
      temp.push([
        toCsv[item].value,
      ]);
      return item;
    });
    const fileContent = temp.map((e) => e.join(',')).join('\n');
    const file = new Blob([fileContent], { // eslint-disable-line
      type: 'text/plain',
    });
    onInputFormSubmit(file, `${fName}.${fType}`);
  };

  // currently async due to use of setConvertedCsv
  // only necessary while enabling download on submit
  const handleCsv = async (configMapable) => {
    const temp = [];
    configMapable.map((item) => {
      if (toCsv[item].input_type === 'title') {
        return item;
      }
      temp.push([
        item, toCsv[item].value,
      ]);
      return item;
    });
    const csvContent = temp.map((e) => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' }); // eslint-disable-line
    onInputFormSubmit(blob, `${fName}.${fType}`);
  };

  const handleSubmit = async () => {
    // convert toCsv into csv format, downloads copy of csv file and automatically attaches form
    const configMapable = Object.keys(config);
    if (configMapable === undefined) {
      alert('There was an error with the configuration file'); // eslint-disable-line
    } else if (fType === 'csv') {
      handleCsv(configMapable);
    } else if (fType === 'rc') {
      handleRc(configMapable);
    }
    clickHide();
  };

  // generates a form based on the length of the config file
  if (formBuilder.length > 0 && (typeof (fType) === 'string')) {
    return (
      <PipelineFormStyled>
        <StyledButton
          type="text"
          size="middle"
          textcolor="lightBlue"
          onClick={(e) => clickHide(e)}
        >
          <div>
            <strong>
              Manually fill the
              {' "'}
              {fName}
              {'" '}
              form
            </strong>
          </div>
        </StyledButton>
        <div style={isHidden ? {} : { display: 'none' }}>
          {formBuilder.map((item) => {
            const field = config[item];
            let fieldName;
            let fieldId = '';
            if (config[item].prompt === undefined) {
              fieldName = item;
            } else {
              fieldName = config[item].prompt;
            }
            if (typeof (item) === 'string') {
              fieldId = item;
            }
            return (
              <FormBuilder
                key={item}
                type={fType}
                field={field}
                fieldId={fieldId}
                fieldName={fieldName}
                value={toCsv[item]}
                handleChange={handleChange}
                handleChangeSelect={handleChangeSelect}
              />
            );
          })}
          <StyledButton type="submit" onClick={() => handleSubmit()}>Submit form</StyledButton>
        </div>
      </PipelineFormStyled>
    );
  }
  return (
    <div>
      The system could not detect a manifest.json file with a &quot;config&quot; property.
      <br />
      Please create the required file in the pipeline&apos;s repository or proceed with manual upload.
    </div>
  );
};

PipelineForm.propTypes = {
  config: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
  onInputFormSubmit: PropTypes.func.isRequired,
  formType: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PipelineForm;
