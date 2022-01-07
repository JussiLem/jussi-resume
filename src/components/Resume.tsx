import { useEffect, useState } from 'react'
import { EducationFields, SkillSetFields, UserFields, WorkFields } from '../common'
import { getResumeData } from '../mock-data'

const educationHistoryHandler = (educationFields?: EducationFields[]) => {
  return educationFields
    ? educationFields.sort((a, b) => {
        return Number(b.graduated) - Number(a.graduated)
      })
    : null
}

const handleResumeData = async (email: string) => {
  const resumeData = await getResumeData(email)
  const receivedWorkHistory = resumeData.resume.workHistory || null
  const receivedEducationHistory = educationHistoryHandler(resumeData.resume.educationHistory)
  const receivedSkillMessage = resumeData.resume.skillmessage || null
  const receivedSkillSet = resumeData.resume.skillSet || null
  return {
    receivedWorkHistory,
    receivedEducationHistory,
    receivedSkillMessage,
    receivedSkillSet,
  }
}

interface ResumeProps {
  user: UserFields
}

const Resume = ({ user }: ResumeProps) => {
  const [educationHistory, setEducationHistory] = useState<EducationFields[] | null>([])
  const [workHistory, setWorkHistory] = useState<WorkFields[] | null>([])
  const [skillSet, setSkillSet] = useState<SkillSetFields[] | null>([])
  const [skillMessage, setSkillMessage] = useState<string | null>('')
  useEffect(() => {
    const handleStatusChange = async () => {
      const {
        receivedWorkHistory,
        receivedEducationHistory,
        receivedSkillSet,
        receivedSkillMessage,
      } = await handleResumeData(user.email)
      setEducationHistory(receivedEducationHistory)
      setWorkHistory(receivedWorkHistory)
      setSkillMessage(receivedSkillMessage)
      setSkillSet(receivedSkillSet)
    }
    handleStatusChange()
  }, [user.email])

  return (
    <section id="resume">
      <div className="row education">
        <div className="three column header-col">
          <h1>
            <span>Education</span>
          </h1>
        </div>
        {educationHistory ? (
          <div className="nine columns main-col">
            <div className="row item">
              <div className="twelve columns">
                {educationHistory.map(education => {
                  return (
                    <div key={education.school}>
                      <h3>{education.school}</h3>
                      <p className="info">
                        {education.degree} <span>&bull;</span>
                        <em className="date">{education.graduated}</em>
                      </p>
                      <p>{education.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="row work">
        <div className="three columns header-col">
          <h1>
            <span>Work</span>
          </h1>
        </div>
        <div className="nine columns main-col">
          {workHistory?.map(work => {
            return (
              <div key={work.company}>
                <h3>{work.company}</h3>
                <p className="info">
                  {work.title}
                  <span>&bull;</span> <em className="date">{work.years}</em>
                </p>
                <p>{work.description}</p>
              </div>
            )
          })}
        </div>
      </div>

      <div className="row skill">
        <div className="three columns header-col">
          <h1>
            <span>Skills</span>
          </h1>
        </div>

        <div className="nine columns main-col">
          <p>{skillMessage}</p>

          <div className="bars">
            <ul className="skills">
              {skillSet?.map(skills => {
                const className = `bar-expand ${skills.name.toLowerCase()}`
                return (
                  <li key={skills.name}>
                    <span style={{ width: skills.level }} className={className} />
                    <em>{skills.name}</em>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Resume
