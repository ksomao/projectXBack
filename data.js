import mongoose from 'mongoose'

const Schema = mongoose.Schema

const addressSchema = new Schema({
    A: String,
    B: String,
    C: String,
    nom: String,
    adresse: String,
    num: String,
    boite: String,
    code: String,
    commune: String,
    full_address: String,
    Latitude: String,
    Longitude: String,
    status: String,
    M: String,
    S: String,
    loc: {
        type: {type: String},
        coordinates: []
    }
})

addressSchema.index({location: "2dsphere"});
export default mongoose.model("address", addressSchema, "address");
