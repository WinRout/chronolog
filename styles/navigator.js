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
    paddingBottom:0,
    paddingTop: 15,
    marginTop: 10,
    marginBottom: 20,
    gap: 18,
}

export const label = {
    ...Typos.textXXSmall,
    color: Colors.textPrimary,
    marginBottom: 0,
    marginBottom: -20,
}

export const icon = {
    fontSize: 12,
    color: Colors.textPrimary,
}

export const iconContainer = {
    alignItems: 'center',
    justifyContent: 'center',
}

export const circle = {
    width: 34,
    height: 34,
    borderRadius: 25,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.borderSecondary,
}

export const activeCircle = {
    backgroundColor: Colors.yellow,
    borderWidth: 1,
    borderColor: Colors.yellow,
}

export const activeIcon = {
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 6
}