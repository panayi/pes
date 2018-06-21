import React from 'react';
import * as R from 'ramda';
import { withStateHandlers } from 'recompose';
import { createSelector, createStructuredSelector } from 'reselect';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import propSelector from '@pesposa/core/src/utils/propSelector';
import propsChanged from '@pesposa/core/src/utils/propsChanged';
import env from '@pesposa/core/src/config/env';
import * as languageConfig from '@pesposa/core/src/config/language';
import * as messageTemplates from '@pesposa/core/src/config/messageTemplates';
import * as externalUserEngagementChannels from '@pesposa/core/src/config/externalUserEngagementChannels';
import * as urlPaths from '@pesposa/core/src/selectors/urlPaths';
import { connectData } from '@pesposa/client-core/src/lib/connectData';
import { models } from '@pesposa/client-core/src/store/firebase/data';
import Button from '@pesposa/client-core/src/components/Button/Button';
import A from '@pesposa/client-core/src/components/A/A';
import { actions } from 'store/convertExternalUserTasks';

const allLanguages = languageConfig.getAll();

const styles = theme => ({
  root: {
    minWidth: 400,
    padding: [theme.spacing.unit * 2, 0, theme.spacing.unit * 3, 0],
  },
  input: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  languages: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  language: {
    marginLeft: theme.spacing.unit,
  },
  activeLanguage: {
    marginLeft: theme.spacing.unit,
    opacity: 0.4,
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing.unit * 2,
  },
  copyButton: {
    marginLeft: theme.spacing.unit,
  },
});

class MessageExternalUser extends React.Component {
  componentDidMount() {
    this.setMessageTemplate();
  }

  componentDidUpdate(prevProps) {
    if (
      propsChanged(
        ['language', 'initialMessageTemplate'],
        prevProps,
        this.props,
      )
    ) {
      this.setMessageTemplate();
    }
  }

  setMessageTemplate = () => {
    const { initialMessageTemplate, setMessageTemplate } = this.props;
    setMessageTemplate(initialMessageTemplate);
  };

  copied = () => {
    const { setCopied } = this.props;
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  messageWasSent = async () => {
    const { externalUserId, output, createEngagement, closeModal } = this.props;
    const channel = externalUserEngagementChannels.MANUAL_MESSAGE;
    createEngagement(externalUserId, channel, output);
    closeModal();
  };

  renderLanguage = language => {
    const { messageLanguage, setMessageLanguage, classes } = this.props;
    if (language === messageLanguage) {
      return (
        <Typography key={language} className={classes.activeLanguage}>
          {language}
        </Typography>
      );
    }

    return (
      <A
        key={language}
        className={classes.language}
        onClick={() => setMessageLanguage(language)}
      >
        {language}
      </A>
    );
  };

  render() {
    const {
      messageTemplate,
      setMessageTemplate,
      output,
      copied,
      closeModal,
      DialogTitle,
      DialogContent,
      DialogActions,
      classes,
    } = this.props;

    return (
      <React.Fragment>
        <DialogTitle title="Send message to ExternalUser" />
        <DialogContent>
          <div className={classes.root}>
            <div className={classes.languages}>
              {R.map(this.renderLanguage, allLanguages)}
            </div>
            <TextField
              className={classes.input}
              value={messageTemplate}
              onChange={event => setMessageTemplate(event.target.value)}
              InputProps={{
                multiline: true,
              }}
            />
            <div className={classes.actions}>
              <Button size="small" onClick={this.setMessageTemplate}>
                Reset
              </Button>
              <CopyToClipboard text={output} onCopy={this.copied}>
                <Button
                  className={classes.copyButton}
                  size="small"
                  style={{ width: 129 }}
                >
                  {copied ? 'Copied!' : 'Copy to clipboard'}
                </Button>
              </CopyToClipboard>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeModal()}>Cancel</Button>
          <Button
            variant="raised"
            color="primary"
            onClick={this.messageWasSent}
          >
            Message was sent
          </Button>
        </DialogActions>
      </React.Fragment>
    );
  }
}

const outputSelector = createSelector(
  propSelector('messageTemplate'),
  propSelector('code'),
  propSelector('adId'),
  (template, code, adId) => {
    if (R.isNil(template)) {
      return '';
    }

    const url = `https://cy.${env.domain}${urlPaths.sell({ code, adId })}`;

    return R.replace(/\{\{url\}\}/g, url, template);
  },
);

const mapDataToProps = {
  initialMessageTemplate: models.messageTemplates(
    R.always(messageTemplates.EXTERNAL_USER_CONVERT),
    propSelector('messageLanguage'),
  ),
};

const mapStateToProps = createStructuredSelector({
  output: outputSelector,
});

const mapDispatchToProps = {
  createEngagement: actions.createEngagement,
};

export default R.compose(
  withStateHandlers(
    {
      messageTemplate: '',
      messageLanguage: languageConfig.getDefault(),
      copied: false,
    },
    {
      setMessageTemplate: () => messageTemplate => ({
        messageTemplate,
      }),
      setMessageLanguage: () => messageLanguage => ({
        messageLanguage,
      }),
      setCopied: () => copied => ({
        copied,
      }),
    },
  ),
  connectData(mapDataToProps, mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(MessageExternalUser);
