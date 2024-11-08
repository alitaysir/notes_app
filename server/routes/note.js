import express from 'express'
import Note from '../models/Note.js'
import middleware from '../middlewares/middleware.js'

const router=express.Router()

router.get('/', async(req,res)=>{
    try {
        const notes=await Note.find()
        return res.status(200).json({success:true, notes:notes})
    } catch (error) {
        return res.status(500).json({success:false,
            message:"Unable to fetch notes"
        })
    }
})

router.post('/add', middleware, async(req,res)=>{
    try {
        const {title,description}=req.body
        const {userId}=req.user.id

        const newnote= new Note({title,description,userId})

        await newnote.save();

        return res.status(200).json({success:true, message:"Note created successfully"})
    
    } catch (error) {
        return res.status(500).json({success:false,
            message:"Error creating Note"
        })

    }
})

router.put('/:id', async(req,res)=>{
    try {
        const {id}=req.params;
        const updatednote= await Note.findByIdAndUpdate(id,req.body)
        return res.status(200).json({success:true, updatednote})
    } catch (error) {
        return res.status(500).json({success:false,
            message:"Unable to edit note"
        })
    }
})

router.delete('/:id', async(req,res)=>{
    try {
        const {id}=req.params;
        const deletednote= await Note.findByIdAndDelete(id)
        return res.status(200).json({success:true, deletednote})
    } catch (error) {
        return res.status(500).json({success:false,
            message:"Unable to delete note"
        })
    }
})

export default router;