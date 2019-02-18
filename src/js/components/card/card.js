import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './elements/wrapper';
import Image from './elements/image';
import Content from './elements/content';
import Title from './elements/title';
import Description from './elements/description';
import Link from './elements/link';
import Tag from './elements/tag';
import Slide from './elements/slide';

const Card = ({ item, isActive }) => (
  // Should keep the className for animation.
  <Slide className={`slide ${isActive}`}>
    <Wrapper>
      <Image image={item.urls} />
      <Content data-color={item.color} data-purpose="card-content">
        <Tag>{item.tags[0] && item.tags[0].title}</Tag>
        <Title>{item.user.name}</Title>
        <Description>
          {item.description || item.user.bio}
        </Description>
        <Link href={item.links.html} target="_blank" rel="noopener noreferrer">Read More</Link>
      </Content>
    </Wrapper>
  </Slide>
);

Card.propTypes = {
  item: PropTypes.object.isRequired,
  isActive: PropTypes.string,
};
Card.defaultProps = {
  isActive: '',
};

export default Card;
