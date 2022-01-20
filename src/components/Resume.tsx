import { Suspense, useEffect, useState } from 'react'
import { isLeft, isRight } from 'fp-ts/es6/Either'
import { ValidationError } from 'io-ts'
import { Education, parseResume, SkillSetFields, WorkFields } from '../common'
import { getResumeData } from '../mock-data'

const capitalizeFirstLetter = (cap: string) => cap.charAt(0).toUpperCase() + cap.slice(1)
const educationHistoryHandler = (educationFields?: Education[]): Education[] | [] => {
  return educationFields
    ? educationFields.sort((a, b) => Number(b.graduated.year) - Number(a.graduated.year))
    : []
}

const handleResumeData = async (email: string) => {
  try {
    const resumeData = await getResumeData(email)
    return parseResume(JSON.parse(resumeData))
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw Error(e.message)
    }
    throw Error(`Unknown error: ${e}`)
  }
}

interface ResumeProps {
  userId: string
}

const Resume = ({ userId }: ResumeProps) => {
  const [educationHistory, setEducationHistory] = useState<Education[]>([])
  const [workHistory, setWorkHistory] = useState<WorkFields[]>([])
  const [skillSet, setSkillSet] = useState<SkillSetFields[]>([])
  const [skillMessage, setSkillMessage] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([])

  useEffect(() => {
    const handleStatusChange = async () => {
      const handledResumeData = await handleResumeData(userId)
      if (isRight(handledResumeData)) {
        setEducationHistory(educationHistoryHandler(handledResumeData.right.educationHistory) || [])
        setWorkHistory(handledResumeData.right.workHistory || [])
        setSkillMessage(handledResumeData.right.skillmessage || null)
        setSkillSet(handledResumeData.right.skillSet || [])
      }
      if (isLeft(handledResumeData)) {
        setValidationErrors(handledResumeData.left)
      }
    }
    handleStatusChange()
  }, [userId])

  return (
    <section id="resume">
      <Suspense fallback={<div>Loading...</div>}>
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
                          <em className="date">{education.graduated.year}</em>
                          {education.graduated.month ? (
                            <>
                              <span>&bull;</span>
                              <em className="month">
                                {capitalizeFirstLetter(education.graduated.month)}
                              </em>
                            </>
                          ) : (
                            <></>
                          )}
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
      </Suspense>
    </section>
  )
}

export default Resume
