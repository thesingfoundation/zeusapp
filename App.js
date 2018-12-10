'use strict';
import React, {Component} from 'react';
import {
  Scene,
  Router,
  Reducer,
  Overlay,
  Stack,
  Drawer,
  Lightbox
} from 'react-native-router-flux';
//App components
import Index from './app/components/Index';
import Camera from './app/components/Camera';
import Home from './app/components/Home';
import Units from './app/components/Polling-units';
import DrawerContent from './app/components/Side-drawer';
import About from './app/components/About';
import Volunteer from './app/components/Volunteer';
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
                <Scene key='about' component={About} />
                <Scene key='volunteer' component={Volunteer} />
                <Drawer
                  initial
                  hideNavBar
                  key="drawer"
                  contentComponent={DrawerContent}
                >
                <Scene initial key='home' component={Home} hideNavBar />
              </Drawer>
              </Stack>
            </Lightbox>
        </Overlay>
      </Router>
    );
  }
}
