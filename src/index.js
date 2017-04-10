import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Picker,
  AppState,
  Platform
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushController from './PushController';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  picker: {
    width: 100
  }
});

export default class App extends Component {
  state = {
    seconds: 5
  };

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange.bind(this));
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange.bind(this));
  }

  handleAppStateChange(appState) {
    const { seconds } = this.state;
    if (appState === 'background') {
      console.log(`Notification in ${seconds} seconds.`);
      PushNotification.localNotificationSchedule({
        message: "My Notification Message",
        date: Platform.OS == 'ios' ? new Date(Date.now() + (seconds * 1000)).getTime() : new Date(Date.now() + (seconds * 1000))
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Choose your notification time in seconds.
        </Text>
        <Picker
          style={styles.picker}
          selectedValue={this.state.seconds}
          onValueChange={seconds => this.setState({ seconds })}>
          <Picker.Item label="5" value={5} />
          <Picker.Item label="10" value={10} />
          <Picker.Item label="15" value={15} />
        </Picker>
        <PushController />
      </View>
    );
  }
}
