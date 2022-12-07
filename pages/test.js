import React from 'react'
import JobCard from '../components/JobCard'

const Test = () => {
  return (
    <div className='grid w-2/3 grid-cols-1 gap-3'>
        <JobCard/>
        <JobCard/>
        <JobCard/>
        <JobCard/>
    </div>
  )
}

export default Test