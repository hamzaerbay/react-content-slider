import React, { Component } from 'react';
import $ from 'jquery';
import {
  TweenMax, Power3, TimelineLite, Linear,
} from 'gsap';
import Card from './card';
import { config } from './lib/config';
import Loader from './loader';

export default class CardSlider extends Component {
  constructor(props) {
    super(props);
    this.init = this.init.bind(this);
    this.prevClick = this.prevClick.bind(this);
    this.nextClick = this.nextClick.bind(this);
    this.fetchAll = this.fetchAll.bind(this);

    this.activeSlide = $('.active');
    this.homeSlide = $('.slide');
    this.slideNavPrev = $('#prev');
    this.slideNavNext = $('#next');
    this.searchQuery = [
      'drone-capture', 'aerial-capture', 'industrial', 'building', 'construction', 'architecture', 'drone-view',
      'travel',
    ];
    this.state = {
      isLoading: true,
      imageData: [],
    };
  }

  componentDidMount() {
    this.init();
    this.fetchAll();
  }

  // drone capture, aerial capture
  fetchAll() {
    const randomQuery = Math.floor(Math.random() * this.searchQuery.length);
    fetch(
      `https://api.unsplash.com/search/photos/?client_id=${
        config.APPLICATION_ID
      }&query=${this.searchQuery[randomQuery]}&orientation=portrait`,
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(res.status);
      })
      .then((items) => {
        this.setState({ isLoading: false, imageData: items.results });
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  init() {
    TweenMax.set(this.homeSlide.not(this.activeSlide), { autoAlpha: 0 });
    TweenMax.set(this.slideNavPrev, { autoAlpha: 0.2 });
  }

  nextSlide(slideOut, slideIn, slideInAll) {
    const t1 = new TimelineLite();
    const slideOutContent = slideOut.find('.card-content');
    const slideInContent = slideIn.find('.card-content');
    const slideOutImg = slideOut.find('.card-img');
    const slideInImg = slideIn.find('.card-img');
    const index = slideIn.index();
    const size = this.homeSlide.length;
    if (slideIn.length !== 0) {
      t1.set(slideIn, { autoAlpha: 1, className: '+=active' })
        .set(slideOut, { className: '-=active' })
        .to(slideOutContent, 0.65, { y: '+=40px', ease: Power3.easeInOut }, 0)
        .to(slideOutImg, 0.65, { backgroundPosition: 'bottom', ease: Power3.easeInOut }, 0)
        .to(slideInAll, 1, { y: '-=100%', ease: Power3.easeInOut }, 0)
        .fromTo(slideInContent, 0.65, { y: '-=40px' }, { y: 0, ease: Power3.easeInOut }, '-=0.7')
        .fromTo(
          slideInImg,
          0.65,
          { backgroundPosition: 'top' },
          {
            backgroundPosition: 'bottom',
            ease: Power3.easeInOut,
          },
          '-=0.7',
        );
    }
    TweenMax.set(this.slideNavPrev, { autoAlpha: 1 });

    if (index === size - 1) {
      TweenMax.to(this.slideNavNext, 0.3, { autoAlpha: 0.3, ease: Linear.easeNone });
    }
  }

  prevSlide(slideOut, slideIn, slideInAll) {
    const t1 = new TimelineLite();
    const slideOutContent = slideOut.find('.card-content');
    const slideInContent = slideIn.find('.card-content');
    const slideOutImg = slideOut.find('.card-img');
    const slideInImg = slideIn.find('.card-img');
    const index = slideIn.index();
    if (slideIn.length !== 0) {
      t1.set(slideIn, { autoAlpha: 1, className: '+=active' })
        .set(slideOut, { className: '-=active' })
        .to(slideOutContent, 0.65, { y: '-=40px', ease: Power3.easeInOut }, 0)
        .to(slideOutImg, 0.65, { backgroundPosition: 'top', ease: Power3.easeInOut }, 0)
        .to(slideInAll, 1, { y: '+=100%', ease: Power3.easeInOut }, 0)
        .fromTo(slideInContent, 0.65, { y: '+=40px' }, { y: 0, ease: Power3.easeInOut }, '-=0.7')
        .fromTo(
          slideInImg,
          0.65,
          { backgroundPosition: 'bottom' },
          {
            backgroundPosition: 'top',
            ease: Power3.easeInOut,
          },
          '-=0.7',
        );
    }
    TweenMax.set(this.slideNavPrev, { autoAlpha: 1 });

    if (index === 0) {
      TweenMax.to(this.slideNavPrev, 0.3, { autoAlpha: 0.3, ease: Linear.easeNone });
    }
  }

  prevClick(e) {
    e.preventDefault();
    const slideOut = $('.slide.active');
    const slideIn = $('.slide.active').prev('.slide');
    const slideInAll = $('.slide');
    this.prevSlide(slideOut, slideIn, slideInAll);
  }

  nextClick(e) {
    e.preventDefault();
    const slideOut = $('.slide.active');
    const slideIn = $('.slide.active').next('.slide');
    const slideInAll = $('.slide');
    this.nextSlide(slideOut, slideIn, slideInAll);
  }

  render() {
    const { isLoading, imageData } = this.state;
    if (isLoading) {
      return <Loader />;
    }
    return (
      <div>
        {imageData.map((item, index) => (
          <Card key={item.id} item={item} isActive={index === 0 ? 'active' : ''} />
        ))}
        <div className="prevnext">
          <button type="button" className="pn-btn" id="prev" onClick={this.prevClick} />
          <button type="button" className="pn-btn" id="next" onClick={this.nextClick} />
        </div>
      </div>
    );
  }
}
