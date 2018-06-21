import React from 'react';
import PropTypes from 'prop-types';

class JuicyAd extends React.Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  };

  componentDidMount() {
    const script = document.createElement('script');
    script.src = '//adserver.juicyads.com/js/jads.js';
    script.async = true;
    script.setAttribute('data-id', this.props.id);
    document.body.appendChild(script);

    (window.adsbyjuicy = window.adsbyjuicy || []).push({
      adzone: this.props.id,
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    const scriptNode = document.querySelectorAll(
      `[data-id="${this.props.id}"]`,
    );
    if (scriptNode && scriptNode.parentNode) {
      scriptNode.parentNode.removeChild(scriptNode);
    }

    // const adObject = R.find(R.propEq('adzone', this.props.id), window.adsbyjuicy);

    // if (adObject) {
    //   const iframeNode = document.getElementById(adObject.ifrm);
    //   if (iframeNode && iframeNode.parentNode) {
    //     iframeNode.parentNode.removeChild(iframeNode);
    //   }
    //   window.adsbyjuicy = R.reject(R.propEq('adzone', this.props.id), window.adsbyjuicy);
    // }
  }

  render() {
    const { id, width, height } = this.props;

    return (
      <React.Fragment>
        <ins id={id} data-width={width} data-height={height} />
      </React.Fragment>
    );
  }
}

export default JuicyAd;
