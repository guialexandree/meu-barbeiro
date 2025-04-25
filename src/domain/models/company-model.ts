export type CompanyModel = {
  id: string
  name: string
  pix: string
  statusAttendance: CompanyStatusAttendance
}

export type CompanyStatusAttendance = 'serving' | 'closed'
