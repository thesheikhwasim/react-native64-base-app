import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ReduxNetworkProvider } from 'react-native-offline';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './src/store/store';
import MealsList from './src/screens/meals/mealsList';
import MealsDetail from './src/screens/meals/mealsDetail';

const Stack = createStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Meals List">
        <Stack.Screen name="Meals List" component={MealsList} />
        <Stack.Screen name="Meals Detail" component={MealsDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ReduxNetworkProvider>
          <AppNavigation />
        </ReduxNetworkProvider>
      </PersistGate>
    </Provider>
  )
}

export default App;
