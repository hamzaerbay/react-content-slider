import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ item, isActive }) => (
  <div className={`slide ${isActive}`}>
    <div className="card">
      <div className="card-img" style={{ backgroundImage: `url('${item.urls.regular}')` }} />
      <div className="card-content" data-color={item.color}>
        <p className="card-theme">{item.tags[0].title}</p>
        <h2 className="card-header">{item.user.name}</h2>
        <p className="card-para">
          {item.description || item.user.bio}
        </p>
        <a className="card-link" href={item.links.html} target="_blank" rel="noopener noreferrer">Read More</a>
      </div>
    </div>
  </div>
);

Card.propTypes = {
  item: PropTypes.object.isRequired,
  isActive: PropTypes.string,
};
Card.defaultProps = {
  isActive: '',
};

export default Card;
