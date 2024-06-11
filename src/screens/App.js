import React from 'react';
import StackNavigation from '../routes/StackNavigation';
import { Provider } from 'react-redux';
import store from '../redux/Store';
import { UserProvider } from '../redux/Context';

const App = () => {
  return (
    <Provider store={store}>
      <UserProvider>
        <StackNavigation />
      </UserProvider>
    </Provider>
  );
};

export default App;
