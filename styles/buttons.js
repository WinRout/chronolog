import * as Colors from "./colors"
import * as Typo from "./typography"

export const primary = {
    width: 188, 
    height: 70, 
    left: 0, 
    top: 0, 
    backgroundColor: Colors.green,
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 35, 
    borderWidth: 0.50,
    borderColor: Colors.surfacePrimary,
}

export const secondary_dark = {
    ...primary,
    width: 161
}

export const secondary_light = {
    ...secondary_dark,
    backgroundColor: 'white',
    borderColor: Colors.green,
}

export const disabled = {
    backgroundColor: Colors.gray
}

export const primary_text = {
    ...Typo.headingBold,
    color: 'white'
}

export const secondary_light_text = {
    ...Typo.headingBold,
    color: Colors.green,
}