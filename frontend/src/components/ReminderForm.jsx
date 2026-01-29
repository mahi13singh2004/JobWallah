import { useState } from 'react'
import { useReminderStore } from '../store/reminder.store.js'

const ReminderForm = ({ applicationId, onReminderAdded }) => {
  const [title, setTitle] = useState("")
  const [remindAt, setRemindAt] = useState("")

  const { createReminder, loading, err, clearError } = useReminderStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    clearError()

    try {
      const success = await createReminder({
        title,
        remindAt,
        applicationId
      })

      if (success) {
        setTitle("")
        setRemindAt("")
        if (onReminderAdded) onReminderAdded()
      }
    } catch (error) {
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-lg font-semibold text-white mb-4">Add Reminder</h3>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Reminder Title
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            placeholder='e.g. Follow up on application'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Remind At
          </label>
          <input
            type="datetime-local"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            value={remindAt}
            onChange={(e) => setRemindAt(e.target.value)}
            required
          />
        </div>

        {err && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
            <p className="text-red-200 text-sm">{err}</p>
          </div>
        )}

        <button
          type='submit'
          disabled={loading}
          className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200"
        >
          {loading ? "Adding..." : "Add Reminder"}
        </button>
      </form>
    </div>
  )
}

export default ReminderForm