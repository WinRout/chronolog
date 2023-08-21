import { View, Text } from 'react-native'
import { Navigator } from "../../styles"

const TabBarIcon = ({ focused, icon }) => {
    return (
        <View style={Navigator.iconContainer}>
            <View style={[Navigator.circle, focused && Navigator.activeCircle]}>
                <Text style={[Navigator.icon, focused && Navigator.activeIcon]}>{icon}</Text>
            </View>
        </View>
    );
};

export default TabBarIcon;