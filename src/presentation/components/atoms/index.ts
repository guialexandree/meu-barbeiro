import * as dateAdapterAtoms from './date-adapter-atom'
import * as localStorageAtoms from './local-storage-adapter-atom'

export const GenericState = {
    ...dateAdapterAtoms,
    ...localStorageAtoms,
}
