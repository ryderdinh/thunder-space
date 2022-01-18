const { date, required, object } = require("joi")
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Report = new Schema ({
    typeReport : {type : Boolean, required : true, enum : [true, false]},
    date : {
        dateStart : {type : Number, required : true},
        dateEnd : {
            type : Number,
            required: function() {
                return this.typeReport === true;
              }
        }
    },
    content : {type: String, required : true },
    owner : {
        ref : 'Staff',
        type : mongoose.Schema.Types.ObjectId,
        required : true
    }
})

Report.methods.reportDetails = function(){
    objectReport = this.toObject()
    delete objectReport.owner
    return objectReport
}

module.exports = mongoose.model("Report",Report)