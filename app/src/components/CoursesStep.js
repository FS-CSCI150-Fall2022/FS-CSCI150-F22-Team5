import { useState, useEffect } from 'react'
import Modal from './Modal'
import { motion, AnimatePresence } from 'framer-motion'

const CoursesStep = ({ formData, setFormData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const [courses, setCourses] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://localhost:4000/courses')
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
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl xl:text-6xl 2xl:text-7xl font-extrabold">Courses</h1>
        <button className="bg-gradient-to-br from-red-400 to-orange-400 px-4 py-2.5 rounded-md flex" onClick={() => setIsModalOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add
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
          <div className="bg-white dark:bg-[#0d1117] p-8 rounded-md w-1/2 h-2/3 flex flex-col pointer-events-auto">
            <h1 className="text-xl font-semibold mb-8">Add Course</h1>
            <div className="relative mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute top-2.5 left-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input className="bg-gray-100 dark:bg-[#161b22] pl-14 pr-4 py-2.5 rounded-md w-full" onChange={(event) => setFilterString(event.target.value)} />
            </div>
            <div className="flex-1 overflow-y-auto">
              <ul>
                {Object.values(courses).filter((course) => course.CRSE_TITLE.toLowerCase().includes(filterString.toLowerCase())).map((course, index) => (
                  <li className="bg-gray-100 dark:bg-[#161b22] p-8 rounded-md flex justify-between mb-4 last:mb-0" key={index}>
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