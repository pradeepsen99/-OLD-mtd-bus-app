import React from 'react';
import { ExpoConfigView } from '@expo/samples';

export default class SettingsScreen extends React.Component {
    /**
     * Hides the stack bar from showing up
     * @type {{header: null}}
     */
    static navigationOptions = {
        header: null,
    };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <ExpoConfigView />;
  }
}
