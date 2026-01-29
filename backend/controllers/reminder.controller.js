import Application from "../models/application.model.js"
import Reminder from "../models/reminder.model.js"
export const createReminder = async (req, res) => {
    try {
        const { title, remindAt, applicationId } = req.body
        if (!title || !remindAt || !applicationId) {
            return res.status(400).json({ "message": "All fields are required" })
        }
        const application = await Application.findOne({
            _id: applicationId,
            user: req.user._id
        })
        if (!application) {
            return res.status(400).json({ "message": "Application not found" })
        }
        const reminder = await Reminder.create({
            user: req.user._id,
            application: applicationId,
            title,
            remindAt,
        })

        return res.status(201).json(reminder)
    }
    catch (error) {
        console.log("Error in createReminder backend")
        return res.status(500).json({ "message": "Internal Server Error" })
    }
}

export const getReminder = async (req, res) => {
    try {
        const reminders = await Reminder.find({ user: req.user._id })
            .populate("application", "company role status")
            .sort({ remindAt: 1 })
        return res.json(reminders)
    }
    catch (error) {
        console.log("Error in getReminder backend")
        return res.status(500).json({ "message": "Internal Server Error" })
    }
}

export const getReminderByApplication = async (req, res) => {
    try {
        const reminders = await Reminder.find({
            user: req.user._id,
            application: req.params.appId
        }).sort({ remindAt: 1 });

        return res.json(reminders)
    }
    catch (error) {
        console.log("Error in getSpecificReminder backend")
        return res.status(500).json({ "message": "Internal Server Error" })
    }
}

export const updateReminder = async (req, res) => {
    try {
        const reminder = await Reminder.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!reminder) {
            return res.status(404).json({ "message": "Reminder not found" })
        }

        reminder.title = req.body.title ?? reminder.title;
        reminder.remindAt = req.body.remindAt ?? reminder.remindAt;
        reminder.completed = req.body.completed ?? reminder.completed;

        const updatedReminder = await reminder.save()
        return res.json(updatedReminder)
    }
    catch (error) {
        console.log("Error in updateReminder backend")
        return res.status(500).json({ "message": "Internal Server Error" })
    }
}

export const deleteReminder = async (req, res) => {
    try {
        const reminder = await Reminder.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!reminder) {
            return res.status(400).json({ "message": "Reminder not found" })
        }

        return res.json({ message: "Reminder Deleted" })
    }
    catch (error) {
        console.log("Error in deleteReminder backend")
        return res.status(500).json({ "message": "Internal Server Error" })
    }
}
