import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { SourceReader, PapperBlock } from 'dan-components';
import {
  CircularStatic,
  CircularIndeterminate,
  CircularDeterminate,
  CircularIntegration,
  LinearStatic,
  LinearIndeterminate,
  LinearDeterminate,
  LinearBuffer,
  LinearQuery,
  ProgressDelay
} from './demos';

const styles = ({
  root: {
    flexGrow: 1,
  }
});

class Progress extends React.Component {
  render() {
    const { classes } = this.props;
    const title = brand.name + ' - UI Elements';
    const description = brand.desc;
    const docSrc = 'containers/UiElements/demos/Progress/';
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item md={6} xs={12}>
              <PapperBlock title="Circular Static" icon="md-timer" desc="Progress and activity indicators are visual indications of an app loading content.">
                <div>
                  <CircularStatic />
                  <SourceReader componentName={docSrc + 'CircularStatic.js'} />
                </div>
              </PapperBlock>
              <PapperBlock title="Circular Determinate" icon="md-sync" desc="Indicators display how long an operation will take.">
                <div>
                  <CircularDeterminate />
                  <SourceReader componentName={docSrc + 'CircularDeterminate.js'} />
                </div>
              </PapperBlock>
            </Grid>
            <Grid item md={6} xs={12}>
              <PapperBlock title="Circular Indeterminate" icon="md-sync" desc="Indicators visualize an unspecified wait time.">
                <div>
                  <CircularIndeterminate />
                  <SourceReader componentName={docSrc + 'CircularIndeterminate.js'} />
                </div>
              </PapperBlock>
              <PapperBlock title="Circular Integration" icon="md-sync" desc="Visual indicator should be used to represent each type of operation.">
                <div>
                  <CircularIntegration />
                  <SourceReader componentName={docSrc + 'CircularIntegration.js'} />
                </div>
              </PapperBlock>
            </Grid>
          </Grid>
          <PapperBlock title="Linear Static" icon="ios-pulse-outline" desc="">
            <div>
              <LinearStatic />
              <SourceReader componentName={docSrc + 'LinearStatic.js'} />
            </div>
          </PapperBlock>
          <Grid container spacing={24}>
            <Grid item md={6} xs={12}>
              <PapperBlock title="Linear Determinate" icon="ios-pulse-outline" desc="">
                <div>
                  <LinearDeterminate />
                  <SourceReader componentName={docSrc + 'LinearDeterminate.js'} />
                </div>
              </PapperBlock>
              <PapperBlock title="Linear Buffer" icon="ios-pulse-outline" desc="">
                <div>
                  <LinearBuffer />
                  <SourceReader componentName={docSrc + 'LinearBuffer.js'} />
                </div>
              </PapperBlock>
              <PapperBlock title="Linear Query" icon="ios-pulse-outline" desc="">
                <div>
                  <LinearQuery />
                  <SourceReader componentName={docSrc + 'LinearQuery.js'} />
                </div>
              </PapperBlock>
            </Grid>
            <Grid item md={6} xs={12}>
              <PapperBlock title="Linear Indeterminate" icon="ios-pulse-outline" desc="">
                <div>
                  <LinearIndeterminate />
                  <SourceReader componentName={docSrc + 'LinearIndeterminate.js'} />
                </div>
              </PapperBlock>
              <PapperBlock title="Progress Delay Appearance" icon="ios-pulse-outline" desc="There are 3 important limits to know around response time. The ripple effect of the ButtonBase component ensures that the user feels that the system is reacting instantaneously.">
                <div>
                  <ProgressDelay />
                  <SourceReader componentName={docSrc + 'ProgressDelay.js'} />
                </div>
              </PapperBlock>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

Progress.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Progress);
