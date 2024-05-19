import React from 'react';
import StackNavigation from '../routes/StackNavigation';
import {Provider} from 'react-redux';
import store from '../redux/Store';

const App = () => {
  return (
    <Provider store={store}>
      <StackNavigation />
    </Provider>
  );
};

export default App;
