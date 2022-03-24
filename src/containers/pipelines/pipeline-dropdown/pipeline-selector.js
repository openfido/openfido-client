import React from 'react';
import PropTypes from 'prop-types';

const PipelineSelector = (props) => {
// assign required values to each element for click handler
  const { pipeline, updateFromDropdown } = props;
  return (
    <option
      id={pipeline.id}
      data-url={pipeline.url}
      data-fullname={pipeline.full_name}
      data-description={pipeline.description}
      onClick={(e) => {
        updateFromDropdown.updateFromDropdown(e);
      }}
    >
      {pipeline.full_name}
    </option>
  );
};

PipelineSelector.propTypes = {
  pipeline: PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    full_name: PropTypes.string.isRequired,
  }).isRequired,
  updateFromDropdown: PropTypes.func.isRequired,

};

export default PipelineSelector;
