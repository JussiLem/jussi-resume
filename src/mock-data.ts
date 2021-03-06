import { UserBasicData } from './common'

const usersMockData: UserBasicData[] = [
  {
    email: 'jussi@jussi.com',
    userId: 'user-1234',
  },
  {
    email: 'jussi@jussi2.com',
    userId: 'user-1235',
  },
  {
    email: 'jussi@jussi3.com',
    userId: 'user-1236',
  },
]

export const getUserFromDb = async (emailAddress: string): Promise<string> => {
  setTimeout(() => '', 3000)
  const user = usersMockData.find(user => user.email === emailAddress)
  return JSON.stringify(user)
}

export const getUserBioData = async (userId: string): Promise<string> => {
  setTimeout(() => '', 1000)
  return JSON.stringify({
    bioId: userId,
    name: 'Jussi',
    occupation: 'Full-stack developer',
    description:
      'My developer description. Use this to describe what you do or whatever you feel best describes yourself to a potential employer.',
    image: '../kuva.jpg',
    bio: "Techs I like and what I'm comfortable ",
    contactmessage: 'How you should contact me',
    address: {
      city: 'Helsinki',
      country: 'Finland',
    },
    phone: null,
    website: 'https://jussilemmetyinen.me',
    resumedownload: 'https://jussilemmetyinen.me',
  })
}

export const getUserSocialMediaData = async (userId: string): Promise<string> => {
  setTimeout(() => '', 1000)
  return JSON.stringify({
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
  })
}

export const getResumeData = async (userId: string): Promise<string> => {
  setTimeout(() => '', 1000)
  return JSON.stringify({
    resumeId: `${userId}-resume`,
    skillmessage: 'Create a short write-up of skills to show off to employers',
    educationHistory: [
      {
        school: 'Beer University',
        degree: 'Masters in Beer tasting',
        graduated: {
          year: 2014,
        },
        description:
          'Describe your experience at school, what you learned, what useful skills you have acquired etc.',
      },
      {
        school: 'Haaga-Helia University',
        degree: 'haaga-helia bachelor thingy',
        graduated: {
          year: 2021,
          month: 'April',
        },
        description:
          'Describe your experience at school, what you learned, what useful skills you have acquired etc.',
      },
      {
        school: 'High School',
        degree: 'School degree',
        graduated: {
          year: 2018,
        },
        description: 'Lots of high schooling',
      },
    ],
    workHistory: [
      {
        company: 'Siili',
        title: 'Consultant',
        years: 'August 2019 - Present',
        description: 'Hello',
      },
      {
        company: 'Svea Ekonomi',
        title: 'Software Developer',
        years: 'April 2018 - June 2019',
        description: 'Developed some Java stuff.',
      },
    ],
    skillSet: [
      {
        name: 'Git',
        level: '90%',
      },
      {
        name: 'React',
        level: '75%',
      },
      {
        name: 'AWS',
        level: '95%',
      },
      {
        name: 'TypeScript',
        level: '93%',
      },
      {
        name: 'Java',
        level: '85%',
      },
    ],
    certifications: [
      {
        name: 'AWS Associate Architect',
        date: '08/2020',
      },
      {
        name: 'AWS Associate SysOps',
        date: '05/2021',
      },
      {
        name: 'AWS associate Developer',
        date: '08/2021',
      },
    ],
  })
}
