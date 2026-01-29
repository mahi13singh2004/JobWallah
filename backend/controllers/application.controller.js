import Application from "../models/application.model.js"

export const createApplication=async(req,res)=>{
    try {
        const {company, role, status, appliedDate, notes}=req.body
        if(!company || !role){
            return res.status(400).json({"message":"Company and Role fields are required"})
        }

        const application=await Application.create({
            user:req.user._id,
            company,
            role,
            status,
            appliedDate,
            notes
        })

        return res.status(201).json({
            message:"Application created successfully",
            application
        })
    } 
    catch (error) {
        console.log("Error in applicationCreate backend")
        return res.status(500).json({"message":"Internal Server Error"}) 
    }
}

export const getApplication=async(req,res)=>{
    try {
        const applications=await Application.find({
            user:req.user._id
        }).sort({createdAt:-1})

        return res.status(200).json({
            message:"Applications fetched successfully",
            applications
        })
    } 
    catch (error) {
        console.log("Error in getApplication backend")
        return res.status(500).json({"message":"Internal Server Error"}) 
    }
}

export const getApplicationById=async(req,res)=>{
    try {
        const application=await Application.findById(req.params.id)
        if(!application){
            return res.status(404).json({"message":"Application not found"})
        }

        if(application.user.toString() !== req.user._id.toString()){
            return res.status(403).json({"message":"Unauthorized"})
        }
        return res.status(200).json({
            message:"Application fetched successfully",
            application
        })
    } 
    catch (error) {
        console.log("Error in getAppById backend")
        return res.status(500).json({"message":"Internal Server Error"}) 
    }
}

export const updateApplication=async(req,res)=>{
    try {
        const application=await Application.findById(req.params.id)
        if(!application){
            return res.status(404).json({"message":"Application not found"})
        }

        if(application.user.toString() !== req.user._id.toString()){
            return res.status(403).json({"message":"Unauthorized"})
        }

        const updatedApplication=await Application.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true,runValidators:true}
        )

        return res.status(200).json({
            message:"Application updated successfully",
            updatedApplication
        })
    } 
    catch (error) {
        console.log("Error in updateApplication backend")
        return res.status(500).json({"message":"Internal Server Error"}) 
    }
}

export const deleteApplication=async(req,res)=>{
    try {
        const application=await Application.findById(req.params.id)
        if(!application){
            return res.status(404).json({"message":"Application not found"})
        }
        if(application.user.toString() !== req.user._id.toString()){
            return res.status(403).json({"message":"Unauthorized"})
        }
        await application.deleteOne()
        return res.status(200).json({"message":"Application deleted successfully"})
    } 
    catch (error) {
        console.log("Error in deleteApplication backend")
        return res.status(500).json({"message":"Internal Server Error"}) 
    }
}