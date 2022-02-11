import { pipe } from 'fp-ts/lib/function'
import * as t from 'io-ts'
import { Left, Right } from 'fp-ts/es6/Either'
import { Errors } from 'io-ts/es6'

export interface ResponseDetails {
  httpCode: number
  errorMessage: string | null
}

const SocialMediaField = pipe(
  t.type({
    socialMediaId: t.union([t.string, t.null]),
    name: t.union([t.string, t.null]),
    url: t.union([t.string, t.null]),
    className: t.union([t.string, t.null]),
  }),
)

const SocialMedias = pipe(
  t.type({
    social: t.array(SocialMediaField),
  }),
)
export type SocialMediaData = t.TypeOf<typeof SocialMediaField>
export type SocialMediasData = t.TypeOf<typeof SocialMedias>

export const parseSocialMedia: (input: unknown) => Left<Errors> | Right<SocialMediaData> = (
  input: unknown,
) => SocialMediaField.decode(input)

export const parseSocialMedias: (input: unknown) => Left<Errors> | Right<SocialMediasData> = (
  input: unknown,
) => SocialMedias.decode(input)

const AddressFieldParameters = t.type({
  city: t.string,
  country: t.string,
})

const UserBioParameters = pipe(
  t.intersection([
    t.type({
      bioId: t.string,
      name: t.string,
    }),
    t.partial({
      occupation: t.union([t.string, t.null]),
      description: t.union([t.string, t.null]),
      image: t.union([t.string, t.null]),
      bio: t.union([t.string, t.null]),
      contactmessage: t.union([t.string, t.null]),
      resumedownload: t.union([t.string, t.null]),
      phone: t.union([t.string, t.null]),
      address: t.union([AddressFieldParameters, t.null]),
    }),
  ]),
)

export type UserBioData = t.TypeOf<typeof UserBioParameters>

export const parseUserBioData: (input: unknown) => Left<Errors> | Right<UserBioData> = (
  input: unknown,
) => UserBioParameters.decode(input)

const UserBasicParameters = pipe(
  t.type({
    email: t.string,
    userId: t.string,
  }),
)

export type UserBasicData = t.TypeOf<typeof UserBasicParameters>

export const parseUserBasicData: (input: unknown) => Left<Errors> | Right<UserBasicData> = (
  input: unknown,
) => UserBasicParameters.decode(input)

const GraduateParameters = pipe(
  t.intersection([
    t.type({
      year: t.number,
    }),
    t.partial({
      month: t.string,
    }),
  ]),
)

export const EducationParameters = pipe(
  t.intersection([
    t.type({
      school: t.string,
      degree: t.string,
      graduated: GraduateParameters,
    }),
    t.partial({
      description: t.string,
    }),
  ]),
)

export type Education = t.TypeOf<typeof EducationParameters>

export interface WorkFields {
  company: string
  title: string
  years: string
  description: string
}

const WorkParameters = pipe(
  t.type({
    company: t.string,
    title: t.string,
    years: t.string,
    description: t.string,
  }),
)

export interface SkillSetFields {
  name: string
  level: string
}

const SkillParameters = pipe(
  t.type({
    name: t.string,
    level: t.string,
  }),
)

const CertificationParameters = t.type({
  name: t.string,
  date: t.string,
})

const ResumeParameters = pipe(
  t.intersection([
    t.type({
      resumeId: t.string,
    }),
    t.partial({
      skillmessage: t.string,
      educationHistory: t.array(EducationParameters),
      workHistory: t.array(WorkParameters),
      skillSet: t.array(SkillParameters),
      certifications: t.array(CertificationParameters),
    }),
  ]),
)

export type Resume = t.TypeOf<typeof ResumeParameters>

export const parseResume: (input: unknown) => Left<Errors> | Right<Resume> = (input: unknown) => {
  return ResumeParameters.decode(input)
}
