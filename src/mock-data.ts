import { MainDataFields, ResumeDataFields, SocialDataFields } from './common'

export const getUserMainData = async (emailAddress: string): Promise<MainDataFields> => {
  setTimeout(() => '', 1000)
  return {
    response: {
      httpCode: 200,
      errorMessage: null,
    },
    user: {
      email: emailAddress,
      name: 'Jussi',
      occupation: 'Full-stack developer',
      description:
        'My developer description. Use this to describe what you do or whatever you feel best describes yourself to a potential employer.',
      image: 'profilepic.jpg',
      bio: "Techs I like and what I'm comfortable ",
      contactmessage: 'How you should contact me',
      address: {
        city: 'Helsinki',
        country: 'Finland',
      },
      website: 'https://jussilemmetyinen.me',
      resumedownload: 'https://jussilemmetyinen.me',
    },
  }
}

export const getUserSocialMediaData = async (userId: string): Promise<SocialDataFields> => {
  setTimeout(() => '', 1000)
  return {
    response: {
      httpCode: 200,
      errorMessage: null,
    },
    social: [
      {
        socialMediaId: `${userId}-facebook`,
        name: 'facebook',
        url: 'https:/facebook/jussi.lemmetyinen',
        className: 'facebook',
      },
      {
        socialMediaId: `${userId}-twitter`,
        name: 'twitter',
        url: 'https:/twitter.com',
        className: 'twitter',
      },
      {
        socialMediaId: `${userId}-linkedin`,
        name: 'linkedin',
        url: 'https:/linkedin.com/in/jussi-lemmetyinen',
        className: 'linkedin-in',
      },
      {
        socialMediaId: `${userId}-instagram`,
        name: 'instagram',
        url: 'https:/instagram.com/menninkainen',
        className: 'instagram',
      },
      {
        socialMediaId: `${userId}-github`,
        name: 'github',
        url: 'https:/github.com/JussiLem',
        className: 'github',
      },
    ],
  }
}

export const getResumeData = async (): Promise<ResumeDataFields> => {
  setTimeout(() => '', 1000)
  return {
    response: {
      httpCode: 200,
      errorMessage: null,
    },
    resume: {
      resumeId: 'Jussi-1234-resume',
      skillmessage: 'Create a short write-up of skills to show off to employers',
      education: [
        {
          school: 'University',
          degree: 'Masters in Beer tasting',
          graduated: 'April 2018',
          description:
            'Describe your experience at school, what you learned, what useful skills you have acquired etc.',
        },
        {
          school: 'University 2',
          degree: 'haaga-helia bachelor thingy',
          graduated: 'April 2020',
          description:
            'Describe your experience at school, what you learned, what useful skills you have acquired etc.',
        },
      ],
      work: [
        {
          company: 'Siili',
          title: 'Consultant',
          years: 'August 2019 - Present',
          description: 'Hello',
        },
        {
          company: 'Svea',
          title: 'Software Developer',
          years: 'April 2018 - June 2019',
          description: 'Hello',
        },
      ],
      skills: [
        {
          name: 'Git',
          level: '90%',
        },
        {
          name: 'React',
          level: '65%',
        },
        {
          name: 'AWS',
          level: '95%',
        },
      ],
      certifications: [
        {
          name: 'AWS associate architect',
          date: '08/2020',
        },
        {
          name: 'AWS associate sysops',
          date: '05/2021',
        },
        {
          name: 'AWS associate developer',
          date: '08/2021',
        },
      ],
    },
  }
}
