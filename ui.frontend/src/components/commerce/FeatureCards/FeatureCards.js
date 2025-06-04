import React from 'react';
import PropTypes from 'prop-types';
import './FeatureCards.css';

const FeatureCards = ({ features }) => {
  return (
    <div className="feature-cards-container">
      {features.map((feature, index) => (
        <div key={index} className="feature-card">
          <div className="feature-icon">
            <img src={feature.icon} alt={feature.title} />
          </div>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

FeatureCards.propTypes = {
  features: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })).isRequired
};

export default FeatureCards;
