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
    borderLeft: '0.50px white solid',
    borderTop: '0.50px white solid', 
    borderRight: '0.50px white solid',
    borderBottom: '0.50px white solid',
}

export const primary_disabled = {
    ...primary,
    backgroundColor: Colors.gray
}

export const primary_text = {
    ...Typo.headingBold,
    color: 'white'
}