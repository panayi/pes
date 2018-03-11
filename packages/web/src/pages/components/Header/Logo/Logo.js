import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    width: 288,
    height: 55,
  },
};

export class Logo extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { className, classes, ...rest } = this.props;

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 281 55"
        className={classNames(classes.root, className)}
        {...rest}
      >
        <g fill="currentColor">
          <path d="m0 55.148v-53.543h12.516v5.098c1.406-2.086 3.029-3.626 4.869-4.623 1.84-0.996 3.99-1.494 6.451-1.494 4.781 0 8.666 1.846 11.654 5.537s4.482 8.514 4.482 14.467c0 6.024-1.5 10.939-4.5 14.748s-6.832 5.713-11.496 5.713c-2.508 0-4.74-0.51-6.697-1.529s-3.568-2.502-4.834-4.447v20.074h-12.445zm27-33.96c0-3.445-0.639-6.07-1.916-7.875s-3.111-2.707-5.502-2.707-4.201 0.891-5.432 2.672c-1.23 1.781-1.846 4.418-1.846 7.91 0 3.188 0.656 5.648 1.969 7.383s3.152 2.602 5.52 2.602c2.25 0 4.014-0.891 5.291-2.672 1.277-1.782 1.916-4.22 1.916-7.313zM67.683 27.797 67.683 27.797 67.683 27.797 67.683 27.797" />
          <path d="m67.683 27.797h12.023c-1.125 4.195-3.335 7.441-6.627 9.738-3.293 2.297-7.378 3.445-12.252 3.445-5.93 0-10.617-1.799-14.062-5.396s-5.168-8.502-5.168-14.713c0-6.328 1.734-11.338 5.203-15.029 3.468-3.691 8.144-5.537 14.027-5.537 6.069 0 10.84 1.875 14.309 5.625 3.468 3.75 5.203 8.93 5.203 15.539 0 0.61-0.006 1.072-0.018 1.389-0.013 0.316-0.03 0.592-0.053 0.826h-25.84c0 2.695 0.58 4.752 1.74 6.17s2.865 2.127 5.115 2.127c1.664 0 3.035-0.352 4.113-1.055 1.079-0.703 1.841-1.746 2.287-3.129zm-13.606-11.145l14.238-0.035c-0.048-2.461-0.698-4.382-1.951-5.766-1.254-1.383-2.971-2.074-5.15-2.074-2.062 0-3.709 0.68-4.939 2.039-1.231 1.36-1.964 3.305-2.198 5.836z" />
          <path d="m81.523 28.148h12.516c0.141 1.688 0.768 2.953 1.881 3.797 1.112 0.844 2.725 1.266 4.834 1.266 1.758 0 3.141-0.34 4.148-1.02s1.512-1.594 1.512-2.742c0-1.477-1.969-2.719-5.906-3.727-2.109-0.539-3.81-1.02-5.098-1.441-4.781-1.57-8.051-3.205-9.809-4.904s-2.637-3.932-2.637-6.697c0-3.867 1.477-6.908 4.43-9.123s7.019-3.322 12.199-3.322c5.531 0 9.796 0.944 12.797 2.83 3 1.887 4.688 4.706 5.062 8.455h-12.022c-0.259-1.289-0.844-2.244-1.758-2.865s-2.18-0.932-3.797-0.932c-1.5 0-2.654 0.287-3.463 0.861-0.809 0.575-1.213 1.389-1.213 2.443 0 1.5 2.039 2.801 6.117 3.902 0.984 0.258 1.745 0.469 2.285 0.633 3.797 1.102 6.434 1.928 7.91 2.479 1.477 0.551 2.543 1.072 3.199 1.564 1.383 1.008 2.402 2.18 3.059 3.516 0.655 1.336 0.984 2.895 0.984 4.676 0 4.148-1.617 7.395-4.852 9.738s-7.747 3.516-13.535 3.516c-5.673 0-10.148-1.125-13.43-3.375-3.281-2.25-5.084-5.426-5.413-9.528z" />
          <path d="m120.89 55.148v-53.543h12.516v5.098c1.406-2.086 3.028-3.626 4.869-4.623 1.84-0.996 3.99-1.494 6.451-1.494 4.781 0 8.666 1.846 11.654 5.537s4.482 8.514 4.482 14.467c0 6.024-1.5 10.939-4.5 14.748-3.001 3.809-6.833 5.713-11.496 5.713-2.509 0-4.741-0.51-6.697-1.529-1.957-1.02-3.568-2.502-4.834-4.447v20.074h-12.445zm27-33.96c0-3.445-0.639-6.07-1.916-7.875-1.278-1.805-3.111-2.707-5.502-2.707s-4.201 0.891-5.432 2.672c-1.23 1.781-1.846 4.418-1.846 7.91 0 3.188 0.655 5.648 1.969 7.383 1.312 1.734 3.151 2.602 5.52 2.602 2.25 0 4.013-0.891 5.291-2.672 1.277-1.782 1.916-4.22 1.916-7.313z" />
          <path d="m162.56 20.66c0-6.398 1.793-11.402 5.379-15.012 3.586-3.609 8.543-5.414 14.871-5.414 6.351 0 11.325 1.805 14.924 5.414 3.598 3.609 5.396 8.613 5.396 15.012s-1.799 11.408-5.396 15.029c-3.599 3.621-8.573 5.432-14.924 5.432-6.376 0-11.344-1.805-14.906-5.414-3.564-3.609-5.344-8.625-5.344-15.047zm12.832 0c0 3.493 0.645 6.176 1.934 8.051 1.288 1.875 3.116 2.812 5.484 2.812 2.391 0 4.236-0.943 5.537-2.83 1.301-1.886 1.951-4.564 1.951-8.033 0-3.445-0.65-6.105-1.951-7.98s-3.146-2.812-5.537-2.812-4.225 0.932-5.502 2.795c-1.279 1.862-1.916 4.529-1.916 7.997z" />
          <path d="m203.98 28.148h12.516c0.141 1.688 0.768 2.953 1.881 3.797 1.112 0.844 2.725 1.266 4.834 1.266 1.758 0 3.141-0.34 4.148-1.02s1.512-1.594 1.512-2.742c0-1.477-1.969-2.719-5.906-3.727-2.109-0.539-3.81-1.02-5.098-1.441-4.781-1.57-8.051-3.205-9.809-4.904s-2.637-3.932-2.637-6.697c0-3.867 1.477-6.908 4.43-9.123s7.019-3.322 12.199-3.322c5.531 0 9.796 0.944 12.797 2.83 3 1.887 4.688 4.706 5.062 8.455h-12.023c-0.259-1.289-0.844-2.244-1.758-2.865s-2.18-0.932-3.797-0.932c-1.5 0-2.654 0.287-3.463 0.861-0.809 0.575-1.213 1.389-1.213 2.443 0 1.5 2.039 2.801 6.117 3.902 0.984 0.258 1.745 0.469 2.285 0.633 3.797 1.102 6.434 1.928 7.91 2.479 1.477 0.551 2.543 1.072 3.199 1.564 1.383 1.008 2.402 2.18 3.059 3.516 0.655 1.336 0.984 2.895 0.984 4.676 0 4.148-1.617 7.395-4.852 9.738s-7.747 3.516-13.535 3.516c-5.673 0-10.148-1.125-13.43-3.375-3.28-2.25-5.084-5.426-5.412-9.528z" />
          <path d="m280.66 39.82h-12.762c-0.141-0.609-0.264-1.242-0.369-1.898s-0.206-1.336-0.299-2.039c-1.758 1.758-3.627 3.059-5.607 3.902-1.981 0.844-4.154 1.266-6.521 1.266-3.68 0-6.592-1.014-8.736-3.041s-3.217-4.764-3.217-8.209c0-3.164 0.838-5.736 2.514-7.717 1.675-1.98 4.213-3.369 7.611-4.166 1.875-0.422 4.254-0.879 7.137-1.371 4.312-0.703 6.469-1.734 6.469-3.094v-0.914c0-1.102-0.417-1.939-1.248-2.514-0.832-0.574-2.069-0.861-3.709-0.861-1.781 0-3.194 0.364-4.236 1.09-1.043 0.727-1.693 1.793-1.951 3.199h-11.531c0.609-4.312 2.396-7.523 5.361-9.633 2.965-2.109 7.177-3.164 12.639-3.164 3.397 0 6.263 0.41 8.596 1.23 2.332 0.821 4.153 2.062 5.467 3.727 0.914 1.195 1.559 2.619 1.934 4.271 0.374 1.652 0.562 4.307 0.562 7.963v14.484c0 1.734 0.158 3.1 0.475 4.096s0.791 1.646 1.424 1.951v1.442zm-13.781-18c-0.962 0.61-2.649 1.172-5.062 1.688-1.173 0.234-2.062 0.434-2.672 0.598-1.5 0.422-2.562 0.961-3.182 1.617-0.621 0.656-0.932 1.535-0.932 2.637 0 1.359 0.422 2.455 1.266 3.287s1.956 1.248 3.34 1.248c2.132 0 3.872-0.615 5.221-1.846 1.348-1.23 2.021-2.842 2.021-4.834v-4.395z" />
        </g>
      </svg>
    );
  }
}

export default withStyles(styles)(Logo);
