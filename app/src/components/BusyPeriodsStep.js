import { useState } from 'react'
import Modal from './Modal'

const BusyPeriodsStep = ({ formData, setFormData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const [newBusyPeriod, setNewBusyPeriod] = useState({ name: '', startTime: '', endTime: '' })
  
  const updateNewBusyPeriod = (event) => {
    const newNewBusyPeriod = {...newBusyPeriod}
    newNewBusyPeriod[event.target.name] = event.target.value
    setNewBusyPeriod(newNewBusyPeriod)
  }
  
  const addNewBusyPeriod = () => {
    setFormData({...formData, busyPeriods: [...formData.busyPeriods, newBusyPeriod]})
  }
  
  const removeBusyPeriod = (index) => {
    const newBusyPeriods = [...formData.busyPeriods]
    newBusyPeriods.splice(index, 1)
    setFormData({...formData, busyPeriods: newBusyPeriods})
  }
  
  return (
    <div>
      <div className="text-gray-500 dark:text-gray-400 font-semibold mb-6">Step 3 of 3</div>
      <h1 className="text-3xl xl:text-5xl 2xl:text-6xl font-extrabold mb-10">Are you unavailable at any point during the week?</h1>
      <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 mb-4">
        <h2 className="text-lg font-semibold">Busy Periods</h2>
        <button onClick={() => setIsModalOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 512 512">
            <title>Add</title>
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M256 112v288M400 256H112"/>
          </svg>
        </button>
      </div>
      {formData.busyPeriods.length > 0 ? (
        <ul className="mb-6">
          {formData.busyPeriods.map((busyPeriod, index) => (
            <li className="bg-gray-100 dark:bg-[#161b22] p-6 sm:p-8 rounded-md flex justify-between mb-4 last:mb-0" key={index}>
              <div>
                <div className="text-lg font-semibold">{busyPeriod.name}</div>
                <div>{busyPeriod.startTime} - {busyPeriod.endTime}</div>
              </div>
              <button onClick={() => removeBusyPeriod(index)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <div>No busy periods have been added.</div>
      )}
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <div className="fixed inset-0 flex justify-center items-center pointer-events-none">
          <div className="bg-white dark:bg-[#0d1117] sm:rounded-md w-full sm:w-1/2 h-full sm:h-2/3 flex flex-col pointer-events-auto">
            <div className="flex justify-between items-center p-6 sm:p-8">
              <h1 className="text-xl font-semibold">Add a Busy Period</h1>
              <button onClick={() => setIsModalOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 512 512">
                  <title>Close</title>
                  <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"/>
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 sm:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-10 gap-4 mb-4 last:mb-0">
                <div className="sm:col-span-4">
                  <label className="block mb-2">Name</label>
                  <input className="bg-gray-100 dark:bg-[#161b22] px-4 py-2.5 rounded-md w-full" name="name" value={newBusyPeriod.name} onChange={(event) => updateNewBusyPeriod(event)} />
                </div>
                <div className="sm:col-span-3">
                  <label className="block mb-2">Start Time</label>
                  <input className="bg-gray-100 dark:bg-[#161b22] px-4 py-2.5 rounded-md w-full" name="startTime" type="time" value={newBusyPeriod.startTime} onChange={(event) => updateNewBusyPeriod(event)} />
                </div>
                <div className="sm:col-span-3">
                  <label className="block mb-2">End Time</label>
                  <input className="bg-gray-100 dark:bg-[#161b22] px-4 py-2.5 rounded-md w-full" name="endTime" type="time" value={newBusyPeriod.endTime} onChange={(event) => updateNewBusyPeriod(event)} />
                </div>
                <div>
                  <label>Days</label>
                  <div>
                    <div>
                      <input className="" type="checkbox" />
                      <label>M</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end px-6 sm:px-8 py-6">
              <button className="bg-indigo-500 text-white font-semibold px-4 py-2.5 rounded-md w-full sm:w-auto" onClick={addNewBusyPeriod}>Add</button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default BusyPeriodsStep