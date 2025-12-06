import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./screens/MainScreen";

// create stack navigator instance
const Stack = createStackNavigator();

export default function App(){
    return (

        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName="Main" 
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#007AFF', 
                    },
                    headerTintColor: '#fff', 
                    headerTitleStyle: {
                        fontWeight: 'bold', 
                    }
                }}
            >

                {/* Main Screen */}
                <Stack.Screen name="Main" component={MainScreen} options={{title: "Currency Converter"}}/>

            </Stack.Navigator>
        </NavigationContainer>

    )
}