import * as Colors from "./colors"
import * as Typos  from "./typography"

export const header = {
    backgroundColor: Colors.yellow,
    shadowOffset: {height:5},
    shadowColor: Colors.dark,
    shadowRadius: 10,
    shadowOpacity: 0.2
}

export const header_text = {
    fontSize: 18,
    letterSpacing: 1,
    fontFamily: "Raleway",
    fontWeight: 900,
    textTransform: 'uppercase',
    textAlign: 'center',
}

export const header_text_dark = {
    ...header_text,
    color: Colors.dark
}

export const header_text_light = {
    ...header_text,
    color: 'white'
}