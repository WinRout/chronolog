import * as Colors from './colors'
import * as Typo from './typography'

export const primary = {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 20,
    borderColor: Colors.borderSecondary,
    borderWidth: 1,
    width: "85%",
    backgroundColor: Colors.surfacePrimary,
    alignSelf: 'center',
}

export const primary_title = {
    ...Typo.textLight,
    color: Colors.textPrimary,
    width: '85%',
    alignSelf: 'center',
    padding: 10,
    paddingLeft: 20
}