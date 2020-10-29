import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import moment from 'moment';

import { StyledH2, StyledText } from 'styles/app';
import { pipelineStates, statusLongNameLegend } from 'config/pipeline-status';
import LoadingFilled from 'icons/LoadingFilled';
import styled from 'styled-components';

const Root = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  width: 294px;
  margin-top: 36px;
  margin-top: 2.25rem;
  h2 {
    margin-right: 16px;
    margin-right: 1rem;
  }
`;

const OverviewGrid = styled.div`
  display: grid;
  grid-gap: 12px;
  grid-gap: 0.75rem;
  span:not(.anticon) {
    display: block;
    margin-bottom: 0.25rem;
  }
  .anticon {
    left: 0;
    font-size: 20px;
  }
`;

const OverviewMeta = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  position: relative;
`;

const Overview = ({ pipelineRunSelected: run }) => {
  const runStatus = run && run.states && run.states.length && run.states[0].state;

  const checkPipelineRunStatus = (statuses = []) => {
    let result = false;

    if (run && run.states && run.states.length) {
      statuses.forEach((status) => {
        if (run.states[0].state === status) {
          result = true;
        }
      });
    }

    return result;
  };

  return (
    <Root>
      <StyledH2 color="black">
        Run #
        {run.sequence}
      </StyledH2>
      <OverviewGrid>
        <div>
          <StyledText size="middle" color="gray20" fontweight="bold">Started At:</StyledText>
          <OverviewMeta>
            <StyledText size="large" color="black" fontweight={500}>
              {moment.utc(run.started_at).format('M/D/YY')}
            </StyledText>
            <StyledText size="large" color="black" fontweight={500}>
              {moment.utc(run.started_at).format('h:m:sa')}
            </StyledText>
          </OverviewMeta>
        </div>
        <div>
          <StyledText size="middle" color="gray20" fontweight="bold">Completed At:</StyledText>
          <OverviewMeta>
            {checkPipelineRunStatus([pipelineStates.COMPLETED, pipelineStates.FAILED, pipelineStates.ABORTED]) ? (
              <>
                <StyledText size="large" color="black" fontweight={500}>
                  {moment.utc(run.updated_at).format('M/D/YY')}
                </StyledText>
                <StyledText size="large" color="black" fontweight={500}>
                  {moment.utc(run.updated_at).format('h:m:sa')}
                </StyledText>
              </>
            ) : (
              <>
                <StyledText size="large" color="black" fontweight={500}>
                  {statusLongNameLegend[runStatus]}
                </StyledText>
                {runStatus === pipelineStates.RUNNING && (
                  <Spin indicator={<LoadingFilled spin />} />
                )}
              </>
            )}
          </OverviewMeta>
        </div>
        <div />
        <div>
          <StyledText size="middle" color="gray20" fontweight="bold">Duration</StyledText>
          <StyledText size="large" color="black" fontweight={500}>
            <OverviewMeta>
              {checkPipelineRunStatus([pipelineStates.COMPLETED, pipelineStates.FAILED, pipelineStates.ABORTED]) ? (
                <>
                  <StyledText size="large" color="black" fontweight={500}>
                    {moment.utc(run.started_at).fromNow(true)}
                  </StyledText>
                </>
              ) : (
                <>
                  <StyledText size="large" color="black" fontweight={500}>
                    {statusLongNameLegend[runStatus]}
                  </StyledText>
                  {runStatus === pipelineStates.RUNNING && (
                    <Spin indicator={<LoadingFilled spin />} />
                  )}
                </>
              )}
            </OverviewMeta>
          </StyledText>
        </div>
      </OverviewGrid>
    </Root>
  );
};

Overview.propTypes = {
  pipelineRunSelected: PropTypes.shape({
    sequence: PropTypes.number.isRequired,
    updated_at: PropTypes.string.isRequired,
    started_at: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    states: PropTypes.arrayOf(PropTypes.shape({
      state: PropTypes.string.isRequired,
    })),
  }).isRequired,
};

export default Overview;