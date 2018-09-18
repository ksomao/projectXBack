import mongoose from 'mongoose'

mongoose.set('useCreateIndex', true)
const Schema = mongoose.Schema

const GeoSchema = new Schema({
    type: {
        type: String,
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        index: '2dsphere'
    }
});


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
    geometry: {
        type: {type: String, default: "Point"},
        coordinates: []
    }
})

addressSchema.index({location: "2dsphere"})

export default mongoose.model("address", addressSchema, "address");
