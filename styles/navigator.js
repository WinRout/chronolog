import * as Colors from "./colors"
import * as Typos from "./typography"

export const navigator = {
    backgroundColor: Colors.yellow,
    paddingTop: 20,
    shadowOffset: { height: 5 },
    shadowColor: Colors.dark,
    shadowRadius: 10,
    shadowOpacity: 0.5,
}

export const item = {
    borderRightStyle: 'solid',
    borderRightWidth: 0.5,
    borderColor: Colors.mantarini
}

export const label = {
    ...Typos.textXXSmall,
    color: "black",
    marginBottom: -10,
    marginTop: 10
}

export const icon = {
    fontSize: 16,
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
    borderWidth: 0.5,
    borderColor: Colors.mantarini,
}

export const activeCircle = {
    backgroundColor: Colors.mantarini,
}