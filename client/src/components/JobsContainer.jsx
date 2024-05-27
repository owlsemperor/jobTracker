import Job from './Job'
import Wrapper from '../assets/wrappers/JobsContainer'

import { useAllJobsContext } from '../pages/AllJobs'
import PageBtnContainer from './PageBtnContainer.jsx'

const JobsContainer = () => {
  const { data } = useAllJobsContext()

  const { jobs, numOfPages, totalJobs } = data

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'}
      </h5>
      <div className='jobs'>
        {jobs.map((job) => {
          return (
            <Job
              key={job._id}
              _id={job._id}
              position={job.position}
              company={job.company}
              jobLocation={job.jobLocation}
              jobType={job.jobType}
              createdAt={job.createdAt}
              jobStatus={job.jobStatus}
            />
          )
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}

export default JobsContainer
