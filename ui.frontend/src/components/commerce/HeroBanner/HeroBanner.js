import React from 'react';
import PropTypes from 'prop-types';
import './HeroBanner.css';

const HeroBanner = ({ title, subtitle, backgroundImage, ctaText, ctaLink }) => {
  return (
    <div className="hero-banner" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="hero-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <a href={ctaLink} className="cta-button">
          {ctaText}
        </a>
      </div>
    </div>
  );
};

HeroBanner.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  backgroundImage: PropTypes.string.isRequired,
  ctaText: PropTypes.string.isRequired,
  ctaLink: PropTypes.string.isRequired
};

export default HeroBanner;
