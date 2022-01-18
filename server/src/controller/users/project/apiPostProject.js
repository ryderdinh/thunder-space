const { exist } = require("joi")
const Project = require("../../../models/Project")
const Staff = require("../../../models/Staff")

module.exports = async (req, res, next) => {
    try {
        const userId = req.user._id
        const code = req.body.projectCode
        const name = req.body.projectName

        const existCreater = await Staff.findById({ _id : userId })
        if(!existCreater) return res.status(401).send("unauthorize")
        //Valid code 
        const existCode = await Project.findOne({ code: code })
        if (existCode) return  res.status(400).send("project code already exist") 
        //Valide body
        const maybeDuplicate = [...req.body.projectManager, ...req.body.projectMember]
        const removeDuplicate = [...new Set(maybeDuplicate)]
   
        if(removeDuplicate.length != maybeDuplicate.length) return res.status(400).send("wrong data request")
        if(!removeDuplicate.every(e => e !== existCreater.email)) return res.status(400).send("wrong data request")
        //Valid exsit member
        const existManager = await Staff.find({ email: req.body.projectManager })
        const existMember = await Staff.find({ email: req.body.projectMember })
        //Map value
        const managers = [...existManager, existCreater].map(e => e = {
            uid : e._id,
            role : 'manager'
        })
        const members = [...existMember].map(e => e = {
            uid : e._id,
            role : 'normal'
        })

        // Create
        const result = await Project.create({
            code: code,
            name: name,
           member : [...managers, ...members]
        })  
        result.save()
        return res.status(200).send({ data : 'success' })
    }catch(err) {
       console.log(err);
       return res.status(400).send("some thing went wrong")
    }
}