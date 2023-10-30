import { StyleSheet, Text, View } from 'react-native';
import StackNavigators from './navigation/StackNavigators';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ModalPortal } from 'react-native-modals';
import { UserContext } from './screens/UserContext';


export default function App() {
  
  return (
      <Provider store={store}>
        <UserContext>
          <StackNavigators/>
          <ModalPortal/>
        </UserContext>
      </Provider>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
