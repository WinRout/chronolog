import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { Colors, Typo} from '../../styles'

const AccountCard = ({title='title', content='value'}) => {
    
  return (
            <View style={styles.field_box}>
                <View style={styles.text_container}>
                    <Text style={styles.key_text}>{title}</Text>
                </View>
                <View style={styles.text_container}>
                    <Text style={styles.value_text}>{content}</Text>
                </View>
            </View>
  )
}

export default AccountCard

const styles = StyleSheet.create({
    field_box: {
        padding:10,
        borderBottomWidth: 0.5,
        borderColor: Colors.borderSecondary,
        flexDirection: 'row',
        height: 55,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    key_text: {
        ...Typo.textXSmall,
        color: Colors.textPrimary,
    },
    text_container: {
        height: 40,
        width: '50%',
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap', // Enable text wrapping
    },
    value_text: {
        ...Typo.textLight,
        color: Colors.textPrimary,
        padding:0,
    }
})