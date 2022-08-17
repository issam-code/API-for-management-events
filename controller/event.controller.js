const event = require("../model/event");

const mongodb = require("mongodb")

const collection =require("../connection");

module.exports = class events{

    static async get_events(req,res){

         
        try {
            if(req.query.id){
                 const result = await collection.find({ _id: new mongodb.ObjectId(req.query.id) }).toArray();
                 res.send(result);
            }else{
                var limit = parseInt(req.query.limit) || 2;
                var page = parseInt(req.query.page) || 0;
                 const result = await collection.find({}).sort({"from" :-1}).skip(page * limit).limit(limit).toArray();
                 res.send(result);
            }
        } catch (error) {
            res.status(500).json({error: error});
            console.log(error)

        }
    }


    static async add_events(req,res){
            
            
        try {
            event.type =  req.body.type;
            event.name = req.body.name;
            event.tagLine = req.body.tagLine;
            event.description = req.body.description;
            event.moderator = req.body.moderator;
            event.category = req.body.category;
            event.sub_category = req.body.sub_category;
            event.rigor_rank = req.body.rigor_rank;
            if(req.body.date && req.body.from_time && req.body.to_time){
                const day = req.body.date;
                const from = req.body.from_time;
                const to = req.body.to_time;
                const dateTime_from = new Date();

                dateTime_from.setFullYear(day.split('-')[0]);
                dateTime_from.setMonth(day.split('-')[1] - 1);
                dateTime_from.setDate(day.split('-')[2]);

                dateTime_from.setHours(from.split(':')[0]);
                dateTime_from.setMinutes(from.split(':')[1]);


                const dateTime_to = new Date();

                dateTime_to.setFullYear(day.split('-')[0]);
                dateTime_to.setMonth(day.split('-')[1] - 1);
                dateTime_to.setDate(day.split('-')[2]);

                dateTime_to.setHours(to.split(':')[0]);
                dateTime_to.setMinutes(to.split(':')[1]);
                event.from = dateTime_from;
                event.to = dateTime_to;
            }
            if(req.file){
                event.image = req.file.path;
            }
            event.attendees=req.body.attendees;
            
            const insertResult = await collection.insertOne(event);
            res.send(insertResult);
        } catch (error) {
            res.status(500).json({error: error});
            console.log(error)
        }
    }

    static async  update_event(req,res){
        try {
            const updateResult = await collection.findOneAndUpdate({ _id: new mongodb.ObjectId(req.params.id)  }, { $set: req.body });
            res.send(updateResult);
            
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    static async delete_event(req, res){
        try {
            const deleteResult = await collection.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
            res.send(deleteResult);
        } catch (error) {
            res.status(500).json({error: error});
        }
    }
    
}