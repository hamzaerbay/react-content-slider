import React from 'react';
import ReactDom from 'react-dom';
import { ThemeProvider } from 'styled-components';
import themeVariables from 'sass-extract-loader?{"plugins": ["sass-extract-js"]}!./sass/variables.scss';
import CardSlider from './js/card-slider';
import './sass/style.scss';

const App = () => (
  <ThemeProvider theme={themeVariables}>
    <CardSlider />
  </ThemeProvider>
);

ReactDom.render(<App />, document.getElementById('root'));
