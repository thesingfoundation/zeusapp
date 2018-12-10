'use strict';
import React, {Component} from 'react';
import {
  Scene,
  Router,
  Reducer,
  Overlay,
  Tabs,
  Stack,
  Lightbox
} from 'react-native-router-flux';
//App components
import Index from './app/components/Index';
import Camera from './app/components/Camera';
import Home from './app/components/Home';
import Units from './app/components/Polling-units';
import Reports from './app/components/Reports';

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    return defaultReducer(state, action);
  };
};
type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Router
        createReducer={reducerCreate}
        >
        <Overlay>
            <Lightbox>
              <Stack
                hideNavBar
                key="root"
              >
                <Scene  key='index' component={Index} />
                <Scene key='camera' component={Camera} />
                <Scene key='units' component={Units} />
                <Scene  key='home' component={Home} />
                <Scene initial key='reports' component={Reports} />
              </Stack>
            </Lightbox>
        </Overlay>
      </Router>
    );
  }
}
