import { StyleSheet, Text, View, Switch } from 'react-native'
import React from 'react'

import { Typo, Colors } from '../../styles'

const AccountItem = ({title, description, color, icon, toggleSwitch, isEnabled}) => {
  return (
    <View style={styles.wrapper}>
        <View style={styles.box_content}>
              <View style={{...styles.box_icon, backgroundColor: color}}>
                  <Text style={styles.icon}>{icon}</Text>
              </View>
              <View style={styles.box_text}>
                  <Text style={styles.title}>{title}</Text>
                  <Text style={styles.description}>{description}</Text>
              </View>
              <Switch style={styles.switch} 
                value={isEnabled}
                onValueChange={toggleSwitch}
                trackColor={{false: Colors.mediumGray, true: Colors.interactionGreen}}
                thumbColor={Colors.surfacePrimary}
                ios_backgroundColor={Colors.mediumGray}
                  />
        </View>
        
    </View>
  )
}

export default AccountItem

const styles = StyleSheet.create({
    wrapper: {
        alignSelf: 'center',
        backgroundColor: 'transparent',
        width: '85%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: 'auto',
        paddingBottom: 0,
        borderColor: Colors.borderSecondary,
        borderBottomWidth: 1,
    },
    box_content: {
        flexDirection: 'row',
        flex: 0.7,
        alignSelf: "flex-start",
        paddingBottom:20
    },
    box_icon: {
        height:35,
        width: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 25,
    },
    box_text: {
        marginTop: 23,
        marginLeft: 20,
    },
    icon: {
        color: 'white',
        fontSize: 20,
        margin: 0,
    },
    title: {
        ...Typo.headingBold,
        color: Colors.textPrimary,
        
    },
    description: {
        ...Typo.textLight,
        color: Colors.textPrimary,
    },
    switch: {
        marginTop: 23,
        marginLeft:20
    }

})