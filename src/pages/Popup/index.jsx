import React from 'react';
import { render } from 'react-dom';

import Popup from './Popup';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';

render(<ChakraProvider><Popup /></ChakraProvider>, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
