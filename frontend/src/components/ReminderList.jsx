import { useReminderStore } from '../store/reminder.store.js'

const ReminderList = ({ reminders, onReminderUpdate }) => {
    const { updateReminder, deleteReminder, loading } = useReminderStore()

    const handleToggleCompleted = async (reminder) => {
        try {
            await updateReminder(reminder._id, {
                completed: !reminder.completed
            })
            if (onReminderUpdate) onReminderUpdate()
        } catch (error) {
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this reminder?')) {
            try {
                await deleteReminder(id)
                if (onReminderUpdate) onReminderUpdate()
            } catch (error) {
            }
        }
    }

    if (!reminders || reminders.length === 0) {
        return (
            <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Reminders</h3>
                <p className="text-gray-300">No reminders set for this application</p>
            </div>
        )
    }

    return (
        <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Reminders</h3>
            <div className="space-y-3">
                {reminders.map((reminder) => (
                    <div key={reminder._id} className={`p-4 rounded-lg border transition-all duration-200 ${reminder.completed
                            ? 'bg-green-500/20 border-green-500/50'
                            : reminder.emailSent
                                ? 'bg-blue-500/20 border-blue-500/50'
                                : 'bg-white/10 border-white/20'
                        }`}>
                        <div className="flex justify-between items-start mb-2">
                            <h4 className={`font-medium ${reminder.completed ? 'text-green-300 line-through' : 'text-white'}`}>
                                {reminder.title}
                            </h4>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleToggleCompleted(reminder)}
                                    disabled={loading}
                                    className={`px-3 py-1 text-xs font-medium rounded transition-colors duration-200 ${reminder.completed
                                            ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                                            : 'bg-green-600 hover:bg-green-700 text-white'
                                        }`}
                                >
                                    {reminder.completed ? "Undo" : "Complete"}
                                </button>
                                <button
                                    onClick={() => handleDelete(reminder._id)}
                                    disabled={loading}
                                    className="px-3 py-1 text-xs font-medium bg-red-600 hover:bg-red-700 text-white rounded transition-colors duration-200"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>

                        <p className="text-gray-300 text-sm mb-2">
                            {new Date(reminder.remindAt).toLocaleString()}
                        </p>

                        <div className="flex space-x-2">
                            {reminder.emailSent && (
                                <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded">
                                    Email Sent
                                </span>
                            )}
                            {reminder.completed && (
                                <span className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded">
                                    Completed
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ReminderList