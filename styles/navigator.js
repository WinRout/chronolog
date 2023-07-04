import * as Colors from "./colors"
import * as Typos from "./typography"

export const navigator = {
    position: 'absolute',
    backgroundColor: 'white',
    shadowOffset: { height: -5 },
    shadowOpacity: 0.2,
    shadowColor: 'gray',
    shadowRadius: 5,
    shadowOpacity: 0.2,
    height: 'auto',
    borderColor: Colors.borderSecondary,
    borderTopWidth: 1,


}

export const item = {
    borderRightStyle: 'solid',
    borderRightWidth: 1,
    borderColor: Colors.borderSecondary,
    flex:1,
    paddingBottom:5,
    paddingTop: 20,
}

export const label = {
    ...Typos.textXXSmall,
    color: Colors.textPrimary,
    marginBottom: 0,
    marginTop: 10
}

export const icon = {
    fontSize: 15,
    color: Colors.textPrimary,
}

export const iconContainer = {
    alignItems: 'center',
    justifyContent: 'center',
}

export const circle = {
    width: 30,
    height: 30,
    borderRadius: 25,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.borderSecondary,
}

export const activeCircle = {
    backgroundColor: Colors.yellow,
}