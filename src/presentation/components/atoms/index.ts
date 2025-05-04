import * as dateAdapterAtoms from './date-adapter-atom'
import * as localStorageAtoms from './local-storage-adapter-atom'
import * as companyAtoms from './company-atom'
import * as showAtoms from './show-amount-atoms'

export const GenericState = {
    ...dateAdapterAtoms,
    ...localStorageAtoms,
    ...companyAtoms,
    ...showAtoms
}
