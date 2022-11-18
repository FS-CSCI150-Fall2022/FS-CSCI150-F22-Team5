import { useState, useEffect } from 'react'
import Modal from './Modal'
import { motion, AnimatePresence } from 'framer-motion'

const CoursesStep = ({ formData, setFormData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const [courses, setCourses] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://35.92.207.28:8080/courses')
    //http://localhost:4000?  test on local machine
      //http://35.92.207.28:8080/? If you want to run on AWS
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not OK')
      }
      return response.json()
    })
    .then((data) => {
      setCourses(data)
      setError(null)
    })
    .catch((error) => {
      setError(error.message)
      setCourses(null)
    })
    .finally(() => setLoading(false))
  }, [])

  const [filterString, setFilterString] = useState('')
  
  const addCourse = (course) => {
    setFormData({...formData, courses: [...formData.courses, course]})
  }

  const removeCourse = (index) => {
    const newCourses = [...formData.courses]
    newCourses.splice(index, 1)
    setFormData({...formData, courses: newCourses})
  }
  
  return (
    <div>
      <div className="text-gray-500 dark:text-gray-400 font-semibold mb-4">Step 1 of 3</div>
      <h1 className="text-3xl xl:text-5xl 2xl:text-6xl font-extrabold mb-8">What courses are you interested in taking?</h1>
      <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 mb-4">
        <h2 className="text-lg font-semibold">Courses</h2>
        <button onClick={() => setIsModalOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 512 512">
            <title>Add</title>
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M256 112v288M400 256H112"/>
          </svg>
        </button>
      </div>
      {formData.courses.length > 0 ? (
        <ul>
          <AnimatePresence initial={false}>
            {formData.courses.map((course, index) => (
              <motion.li className="bg-gray-100 dark:bg-[#161b22] p-6 sm:p-8 rounded-md flex justify-between mb-4 last:mb-0" key={course.CRSE_ID} layout initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
                <div>
                  <div className="text-lg font-semibold">{course.SUBJECT_ID} {course.CATALOG_NBR}</div>
                  <div>{course.CRSE_TITLE}</div>
                </div>
                <button onClick={() => removeCourse(index)}>Remove</button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      ) : (
        <div>No courses have been selected.</div>
      )}
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <div className="fixed inset-0 flex justify-center items-center pointer-events-none">
          <div className="bg-white dark:bg-[#0d1117] sm:rounded-md w-full sm:w-1/2 h-full sm:h-2/3 flex flex-col pointer-events-auto">
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-xl font-semibold">Add Courses</h1>
                <button onClick={() => setIsModalOpen(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 512 512">
                    <title>Close</title>
                    <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"/>
                  </svg>
                </button>
              </div>
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 absolute top-2.5 left-4" fill="currentColor" viewBox="0 0 512 512">
                  <title>Search</title>
                  <path d="M456.69 421.39L362.6 327.3a173.81 173.81 0 0034.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 00327.3 362.6l94.09 94.09a25 25 0 0035.3-35.3zM97.92 222.72a124.8 124.8 0 11124.8 124.8 124.95 124.95 0 01-124.8-124.8z"/>
                </svg>
                <input className="bg-gray-100 dark:bg-[#161b22] pl-14 pr-4 py-2.5 rounded-md w-full" value={filterString} onChange={(event) => setFilterString(event.target.value)} />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-6 sm:px-8 pb-6 sm:pb-8">
              <ul>
                {Object.values(courses).filter((course) => `${course.SUBJECT_ID} ${course.CATALOG_NBR}`.toLowerCase().includes(filterString.toLowerCase()) || course.CRSE_TITLE.toLowerCase().includes(filterString.toLowerCase())).map((course, index) => (
                  <li className="bg-gray-100 dark:bg-[#161b22] p-6 sm:p-8 rounded-md flex justify-between mb-4 last:mb-0" key={index}>
                    <div>
                      <div className="text-lg font-semibold">{course.SUBJECT_ID} {course.CATALOG_NBR}</div>
                      <div>{course.CRSE_TITLE}</div>
                    </div>
                    <button onClick={() => addCourse(course)}>Add</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default CoursesStep