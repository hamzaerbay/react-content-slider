import React, { Component } from 'react';
import $ from 'jquery';
import {
  TweenMax, Power3, TimelineLite, Linear,
} from 'gsap';
import Card from './components/card';
import Loader from './components/loader';
import Navigation from './components/navigation';
import UnsplashAPI from './api/UnsplashAPI';

export default class CardSlider extends Component {
  constructor(props) {
    super(props);
    this.init = this.init.bind(this);
    this.prevClick = this.prevClick.bind(this);
    this.nextClick = this.nextClick.bind(this);
    this.enableNav = this.enableNav.bind(this);

    this.activeSlide = $('.active');
    this.homeSlide = $('.slide');
    this.slideNavPrev = $('#prev');
    this.slideNavNext = $('#next');
    this.state = {
      isLoading: true,
      imageData: [],
      navEvent: true,
    };
    this.UnsplashAPI = new UnsplashAPI();
    this.listenKeyPress = this.listenKeyPress.bind(this);
  }

  componentDidMount() {
    this.init();
    this.UnsplashAPI.searchResult().then((items) => {
      this.setState({ isLoading: false, imageData: items.results });
    })
      .catch((error) => {
        throw new Error(error);
      });
    document.addEventListener('keydown', this.listenKeyPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.listenKeyPress, false);
  }

  listenKeyPress(e) {
    if (e.keyCode === 40 || e.keyCode === 39) {
      this.nextClick(e);
    } else if (e.keyCode === 38 || e.keyCode === 37) {
      this.prevClick(e);
    }
  }

  init() {
    TweenMax.set(this.homeSlide.not(this.activeSlide), { autoAlpha: 0 });
    TweenMax.set(this.slideNavPrev, { autoAlpha: 0.2 });
  }

  enableNav() {
    this.setState({ navEvent: true });
  }

  nextSlide(slideOut, slideIn, slideInAll) {
    const t1 = new TimelineLite({
      onComplete: () => this.enableNav(),
    });
    const slideOutContent = slideOut.find('[data-purpose="card-content"]');
    const slideInContent = slideIn.find('[data-purpose="card-content"]');
    const slideOutImg = slideOut.find('[data-purpose="card-img"]');
    const slideInImg = slideIn.find('[data-purpose="card-img"]');
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
    const t1 = new TimelineLite({
      onComplete: () => this.enableNav(),
    });
    const slideOutContent = slideOut.find('[data-purpose="card-content"]');
    const slideInContent = slideIn.find('[data-purpose="card-content"]');
    const slideOutImg = slideOut.find('[data-purpose="card-img"]');
    const slideInImg = slideIn.find('[data-purpose="card-img"]');
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
    if (this.state.navEvent) {
      this.setState({ navEvent: false });
      const slideOut = $('.slide.active');
      const slideIn = $('.slide.active').prev('.slide');
      const slideInAll = $('.slide');
      this.prevSlide(slideOut, slideIn, slideInAll);
    }
  }

  nextClick(e) {
    e.preventDefault();
    if (this.state.navEvent) {
      this.setState({ navEvent: false });
      const slideOut = $('.slide.active');
      const slideIn = $('.slide.active').next('.slide');
      const slideInAll = $('.slide');
      this.nextSlide(slideOut, slideIn, slideInAll);
    }
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
        <Navigation prevClick={this.prevClick} nextClick={this.nextClick} />
      </div>
    );
  }
}
