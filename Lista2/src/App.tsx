import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Exercise1 from './screens/Exercise1';
import Exercise2 from './screens/Exercise2';
import Exercise3 from './screens/Exercise3';
import Exercise4 from './screens/Exercise4';
import Exercise5 from './screens/Exercise5';
import Exercise6 from './screens/Exercise6';
import Exercise7 from './screens/Exercise7';
import Exercise8 from './screens/Exercise8';
import Exercise9 from './screens/Exercise9';
import Exercise10 from './screens/Exercise10';
import ConsultaCep from './screens/ConsultaCep';
import HistoricoCep from './screens/HistoricoCep';
import { CepProvider } from './contexts/CepContext';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons'; 

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <CepProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Exercise1"
          screenOptions={({ route }) => ({
            drawerIcon: ({ color, size }) => {
              const iconsMap: Record<string, string> = {
                Exercise1: 'home-outline',
                Exercise2: 'list-outline',
                Exercise3: 'alarm-outline',
                Exercise4: 'map-outline',
                Exercise5: 'search-outline',
                Exercise6: 'mail-outline',
                Exercise7: 'calendar-outline',
                Exercise8: 'person-outline',
                Exercise9: 'chatbubbles-outline',
                Exercise10: 'settings-outline',
                ConsultaCep: 'search-outline',
                HistoricoCep: 'time-outline',
              };

              const iconName = iconsMap[route.name] ?? 'ellipse-outline';
              return <Ionicons name={iconName as any} size={size} color={color} />;
            },
          })}
        >
          <Drawer.Screen 
            name="Exercise1" 
            component={Exercise1}
            options={{ title: 'Exercício 1' }}
          />
          <Drawer.Screen 
            name="Exercise2" 
            component={Exercise2}
            options={{ title: 'Exercício 2' }}
          />
          <Drawer.Screen 
            name="Exercise3" 
            component={Exercise3}
            options={{ title: 'Exercício 3' }}
          />
          <Drawer.Screen 
            name="Exercise4" 
            component={Exercise4}
            options={{ title: 'Exercício 4' }}
          />
          <Drawer.Screen 
            name="Exercise5" 
            component={Exercise5}
            options={{ title: 'Exercício 5' }}
          />
          <Drawer.Screen 
            name="Exercise6" 
            component={Exercise6}
            options={{ title: 'Exercício 6' }}
          />
          <Drawer.Screen 
            name="Exercise7" 
            component={Exercise7}
            options={{ title: 'Exercício 7' }}
          />
          <Drawer.Screen 
            name="Exercise8" 
            component={Exercise8}
            options={{ title: 'Exercício 8' }}
          />
          <Drawer.Screen 
            name="Exercise9" 
            component={Exercise9}
            options={{ title: 'Exercício 9' }}
          />
          <Drawer.Screen 
            name="Exercise10" 
            component={Exercise10}
            options={{ title: 'Exercício 10' }}
          />

          <Drawer.Screen 
            name="ConsultaCep" 
            component={ConsultaCep}
            options={{ title: 'Consulta de CEP' }}
          />

          <Drawer.Screen 
            name="HistoricoCep" 
            component={HistoricoCep}
            options={{ title: 'Histórico de CEPs' }}
          />

        </Drawer.Navigator>
      </NavigationContainer>
    </CepProvider>
  );
}
