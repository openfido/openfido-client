import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CSVLink, CSVDownload } from 'react-csv';
import {
  StyledButton,
} from 'styles/app';

import FormBuilder from './form-builder';

const PipelineFormStyled = styled.form`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: left;
  padding-bottom: 10px;
`;

const PipelineForm = ({ config }) => {
  const [toCsv, setCsv] = useState([]);
  const [isHidden, setIsHidden] = useState(false);
  useEffect(() => {
    const configMapable = Object.keys(config);
    setCsv(configMapable);
  }, [config]);
  const clickHide = (e) => {
    // magic button to hide/unhide form
    setIsHidden(!isHidden);
  };

  const prioritizeAttached = () => {
    // magic function to check if a config.csv already attached
  };

  if (toCsv.length > 0) {
    return (
      <PipelineFormStyled>
        <StyledButton
          type="text"
          size="middle"
          textcolor="lightBlue"
          onClick={(e) => clickHide(e)}
        >
          <div>
            <strong>Manually fill the configuration form</strong>
          </div>
        </StyledButton>
        <div style={isHidden ? {} : { display: 'none' }}>
          {toCsv.map((item) => {
            const field = config[item];
            return <FormBuilder key={item} field={field} fieldName={item} />;
          })}
          <StyledButton type="submit">Submit form</StyledButton>
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

FormBuilder.propTypes = {
  config: PropTypes.shape({
    root: PropTypes.string,
  }),
};

export default PipelineForm;
