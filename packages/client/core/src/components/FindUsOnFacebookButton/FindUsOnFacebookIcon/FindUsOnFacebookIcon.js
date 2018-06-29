import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  white: {
    fill: '#fff',
  },
};

const FindUsOnFacebookButton = ({ className, classes }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1024 201.43"
  >
    <path
      className={classes.white}
      d="M7,44.46H81.91V60H23.47V99.59H71.81V115H23.47V166.2H7Z"
    />
    <path
      className={classes.white}
      d="M108.52,57.32c-7.19,0-10.48-5.45-10.48-11.5s3.29-11.49,10.48-11.49S119,39.79,119,45.82,115.7,57.32,108.52,57.32Zm-8,108.88V76.6l15.92-2.53V166.2Z"
    />
    <path
      className={classes.white}
      d="M197.34,166.2V110.1c0-15.38-5.83-20.65-18.44-20.65-9.32,0-18.25,4.87-23.3,9.75v67H139.68V76.6l15.92-2.53V87.51c8.16-8.18,18.64-13.44,28.92-13.44,18.06,0,28.73,11.49,28.73,30.77V166.2Z"
    />
    <path
      className={classes.white}
      d="M294.72,34.92l15.92-2.53V166.2H294.72V158c-6.41,6.05-14.36,11.11-24.84,11.11-25,0-39.61-20.26-39.61-47.14,0-27.07,18.64-47.91,45.23-47.91A68.16,68.16,0,0,1,294.72,77Zm-19.8,53.57c-18.05,0-28.14,14.79-28.14,33.1,0,19.68,9.9,32.73,26.39,32.73,8.36,0,15.53-3.32,21.55-8.57V94.91C289.48,90.63,282.69,88.49,274.92,88.49Z"
    />
    <path
      className={classes.white}
      d="M386.93,77v56.09c0,15.39,5.82,20.65,17.46,20.65A36.19,36.19,0,0,0,428.66,144V77h15.92v89.6l-15.92,2.53V156.07c-8.15,8.18-18.63,13.05-29.9,13.05-17.07,0-27.75-11.49-27.75-30.77V77Z"
    />
    <path
      className={classes.white}
      d="M495.49,169.31c-10.87,0-22.9-3.31-31.06-8.37l4.08-14.61a52.07,52.07,0,0,0,27.37,8.38c10.1,0,17.67-4.68,17.67-12.67,0-9-10.49-11.88-21-14.8-12.62-3.51-26.39-9.74-26.39-26.1,0-16.56,14-27.07,31.83-27.07a65.69,65.69,0,0,1,28.73,6.62L522.67,95.3a58.84,58.84,0,0,0-25.43-6.62c-9.51,0-15.72,3.89-15.72,11.1,0,8.57,9.51,11.49,20.58,14.41,13,3.51,27,9.74,27,26.69S514.91,169.31,495.49,169.31Z"
    />
    <path
      className={classes.white}
      d="M623,169.12c-25.23,0-42.89-18.7-42.89-47.53,0-28.62,18.24-47.72,43.87-47.72,25.43,0,42.7,18.9,42.7,47.72C666.7,150.23,648.07,169.12,623,169.12Zm.2-80.83c-17.66,0-27.37,13.83-27.37,33.11,0,19.09,10.29,33.31,27.76,33.31,17.66,0,27.37-13.64,27.37-32.92C651,102.7,640.69,88.29,623.22,88.29Z"
    />
    <path
      className={classes.white}
      d="M741.77,166.2V110.1c0-15.38-5.82-20.65-18.43-20.65-9.32,0-18.25,4.87-23.3,9.75v67H684.12V76.6L700,74.07V87.51c8.15-8.18,18.63-13.44,28.92-13.44,18,0,28.73,11.49,28.73,30.77V166.2Z"
    />
    <path
      className={classes.white}
      d="M1007.35,4.11H835.22a10.68,10.68,0,0,0-10.68,10.68V186.92a10.68,10.68,0,0,0,10.68,10.68H927.9V122.77H902.77V93.48H927.9V71.93c0-25,15.26-38.6,37.56-38.6A208.6,208.6,0,0,1,988,34.48V60.6H972.61c-12.13,0-14.48,5.76-14.48,14.22V93.48h29l-3.77,29.29H958.13V197.6h49.22A10.68,10.68,0,0,0,1018,186.92V14.79A10.68,10.68,0,0,0,1007.35,4.11Z"
    />
  </svg>
);

export default withStyles(styles)(FindUsOnFacebookButton);