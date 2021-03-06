export interface Candidate {
  Name: {
    ConfidenceScore: number;
    FirstName: string;
    FormattedName: string;
    FullName: string;
    LastName: string;
    MiddleName: string;
    TitleName: string;
  }[];
  ResumeCountry: {
    Country: string;
    CountryCode: {
      IsoAlpha2: string;
      IsoAlpha3: string;
      UNCode: string;
    };
    Evidence: string;
  }[];
  WorkedPeriod: {
    TotalExperienceInMonths: string;
    TotalExperienceInYear: string;
    TotalExperienceRange: string;
  }[];
  PhoneNumber: {
    ConfidenceScore: number;
    FormattedNumber: string;
    ISDCode: string;
    Number: string;
    OriginalNumber: string;
    Type: string;
  }[];
  currentJobProfile: string;
  fileUrl: string;
  selected: boolean;
  email: string;
  _id: string;
}
