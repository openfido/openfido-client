import React, {
  useState, useEffect, useReducer, useRef,
} from 'react';
import PropTypes from 'prop-types';
// import { Blob } from 'buffer';
import styled from 'styled-components';
import {
  StyledButton,
} from 'styles/app';

import formReducer from 'reducers/configform';
import FormBuilder from './form-builder';

const PipelineFormStyled = styled.form`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: left;
    padding-bottom: 10px;
  `;

const DEFAULT_STATE = {};

const PipelineFormJson = ({ config, formType, onInputFormSubmit }) => {
  const [fType, setFormType] = useState(undefined);
  const [fName, setFormName] = useState(undefined);
  // used to prepare the form for conversion
  const [formBuilder, setFormBuilder] = useState([]);
  const [isHidden, setIsHidden] = useState(false);
  const [toCsv, dispatch] = useReducer(formReducer, DEFAULT_STATE);

  // used for when submitted
  const [convertedCsv, setConvertedCsv] = useState([]);
  const csvLink = useRef();

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
        cleanConfig[item].value = cleanConfig[item].default;
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

  const handleSubmit = async () => {
    const configMapable = Object.keys(config);
  };

  // generates a form based on the length of the config file
  if (formBuilder.length > 0) {
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
            return (
              <FormBuilder
                key={item}
                type={fType}
                field={field}
                fieldName={item}
                value={toCsv[item]}
                handleChange={handleChange}
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
      The system could not detect a manifest.json file with a &quot;
      {fName}
      &quot; property.
      <br />
      Please create the required file in the pipeline&apos;s repository or proceed with manual upload.
    </div>
  );
};

PipelineFormJson.propTypes = {
  config: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
  onInputFormSubmit: PropTypes.func.isRequired,
  formType: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default PipelineFormJson;
