import { IconName } from '@fortawesome/free-brands-svg-icons'

export interface ResponseDetails {
  httpCode: number
  errorMessage: string | null
}

export interface SocialMediaUserMapper {
  userId: string
  socialMediaId: string
}
export interface SocialFields {
  socialMediaId: string
  name: string
  url: string
  className: IconName
}

export interface SocialDataFields {
  social: SocialFields[]
  response: ResponseDetails
}

interface AddressFields {
  city: string
  country: string
}

export interface UserFields {
  email: string
  name: string
  occupation: string
  description: string
  image?: string
  bio: string
  contactmessage: string
  address: AddressFields
  website: string
  resumedownload: string
  phone?: string
}

export interface MainDataFields {
  user: UserFields
  response: ResponseDetails
}

export interface EducationFields {
  school: string
  degree: string
  graduated: {
    year: number
    month?: string
  }
  description?: string
}

export interface WorkFields {
  company: string
  title: string
  years: string
  description: string
}

export interface SkillSetFields {
  name: string
  level: string
}

interface CertificationFields {
  name: string
  date: string
}

export interface ResumeUserMapper {
  userId: string
  resumeId: string
}

export interface ResumeFields {
  resumeId?: string
  skillmessage?: string
  educationHistory?: EducationFields[]
  workHistory?: WorkFields[]
  skillSet?: SkillSetFields[]
  certifications?: CertificationFields[]
}

export interface ResumeDataFields {
  resume: ResumeFields
  response: ResponseDetails
}
