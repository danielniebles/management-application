export interface Candidate {
  Name: {
    ConfidenceScore: number
    FirstName: string
    FormattedName: string
    FullName: string
    LastName: string
    MiddleName: string
    TitleName: string
  }[]
  ResumeCountry: {
    Country: string
    CountryCode: {
      IsoAlpha2: string
      IsoAlpha3: string
      UNCode: string
    }
    Evidence: string
  }[]
  WorkedPeriod: {
    TotalExperienceInMonths: string
    TotalExperienceInYear: string
    TotalExperienceRange: string
  }
  currentJobProfile: string
  fileUrl: string
  _id: string

}