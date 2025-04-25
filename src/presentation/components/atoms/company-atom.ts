import { atom } from 'recoil'
import { CompanyModel } from '@/domain/models'

export const companyState = atom<CompanyModel>({
  key: 'companyState',
  default: null as unknown as CompanyModel,
})

export const loadingCompanyState = atom({
  key: 'loadingCompanyState',
  default: false
})
