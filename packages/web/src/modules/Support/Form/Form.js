import React from 'react';
import * as R from 'ramda';
import { FormGroup } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import withStyles from 'material-ui/styles/withStyles';

const SUBJECTS = [
  { id: 'loginIssue', label: 'Login issue' },
  { id: 'reportUser', label: 'Report a user' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'generalInquiry', label: 'General inquiry' },
];

const styles = theme => ({
  field: {
    marginTop: theme.spacing.unit * 2,
  },
});

const Form = props => {
  const { handleChange, handleBlur, values, errors, classes } = props;

  return (
    <FormGroup>
      <TextField
        margin="dense"
        name="email"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
        label="Enter your email"
        fullWidth
        error={R.has('email', errors)}
        helperText={errors.email}
      />
      <TextField
        className={classes.field}
        select
        SelectProps={{ native: true }}
        InputLabelProps={{
          shrink: true,
        }}
        margin="dense"
        name="subject"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.subject}
        label="Subject"
        error={R.has('subject', errors)}
        helperText={errors.subject}
        InputProps={{
          multiline: true,
        }}
      >
        <option value="">Choose...</option>
        {R.map(
          subject => (
            <option key={subject.id} value={subject.id}>
              {subject.label}
            </option>
          ),
          SUBJECTS,
        )}
      </TextField>
      <TextField
        className={classes.field}
        margin="dense"
        name="body"
        InputProps={{ multiline: true }}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.body}
        label="Message"
        placeholder="Type your message..."
        error={R.has('body', errors)}
        helperText={errors.body}
      />
    </FormGroup>
  );
};

export default withStyles(styles)(Form);
