import * as Colors from "./colors"
import * as Typos  from "./typography"

export const header = {
    backgroundColor: 'white',
    shadowOffset: {height:10},
    shadowColor: Colors.gray,
    shadowRadius: 5,
    shadowOpacity: 0.5,
    borderColor: Colors.borderSecondary,
    borderBottomWidth: 1,
}

export const header_text = {
    ...Typos.pageTitle
}

export const header_text_dark = {
    ...header_text,
    color: Colors.dark
}

export const header_text_light = {
    ...header_text,
    color: 'white'
}