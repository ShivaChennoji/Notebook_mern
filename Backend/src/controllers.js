const Data = require('./models.js')

var Getdata = async (req, res) => {
    try {
        const Allnotes =await Data.find()
        if (Allnotes.length>0) {
            res.status(200).json({
                success: true,
                message: 'data recieved successfully',
                data: Allnotes
            })
        }
    } catch(e){
        res.status(404).json({
            success: false,
            message: 'data recieved failed',
            data: e
        })}}
var Createdata=async(req,res) => {
    try {
        const notes = await Data.create(req.body)
        if (notes){
            res.status(201).json({
                success: true,
                message: 'notes saved successfully',
                data: notes
            })
        }
    } catch(e){
        res.status(404).json({
            success: false,
            message: 'notes saved failed',
        })
    }
}
var Updatedata =async(req,res) => {
    try {
        const newnotes = await Data.findByIdAndUpdate(req.params.id,req.body,{
            new: true
        })
        if(newnotes){
            res.status(200).json({
                success: true,
                message: 'notes updated successfully',
                data: newnotes
            })
        }
    }catch(e){
        res.status(404).json({
            success: false,
            message: 'notes updated failed',

        })
    }
}

var deletedata = async (req,res) => {
    try {
        const note = await Data.findByIdAndDelete(req.params.id)
        if (note) {
            res.status(200).json({
                success: true,
                message: 'notes deleted successfully',
                data: note
            })
        }
    }catch(e){
        res.status(404).json({
            success: false,
            message: 'notes deleted failed',

        })
    }}
module.exports = {
    Getdata,
    Createdata,
    Updatedata,
    deletedata
}