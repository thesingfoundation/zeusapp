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
import Index from './components/Index';
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
                <Scene key='index' component={Index} />
              </Stack>
            </Lightbox>
        </Overlay>
      </Router>
    );
  }
}
