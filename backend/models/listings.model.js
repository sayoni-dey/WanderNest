import mongoose from "mongoose";
import User from "./user.model";

const listingSchema = new mongoose.Schema({
    host: {
        type : String,
        required : [true, 'A listing must belong to a host'],
        ref : 'User'
    },
    title : {
        type : String,
        required: [true, 'Please provide a catchy title for your listing'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    image: {
        type: [String],
        required: true,
        validate: [
        (val) => val.length > 0,
        'Please provide at least one image URL for the listing',
      ],
    },
    category:{
        type : String,
        required : true,
        enum : {
            values: [
                'Beach',
                'Trending',
                'Countryside',
                'Cabins',
                'Pools',
                'Lake',
                'Treehouses',
                'Iconic Cities',
                'Mansions'
            ],
        }
    },
    description : {
        type : String,
        required : true
    },
    country : {
        type: String,
        required: [true, 'Country is required'],
        trim : true
    },
    state : {
        type: String,
        required: [true, 'State is required'],
        trim : true
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim : true
    },
    propertyType : {
        type : String,
        required : [true, 'Specify property type (e.g., Entire Place, Private Room)'],
        enum : ['Entire Place', 'Private Room', 'Shared Room']
    },
    bedrooms : {
        type: Number,
        required: [true, 'Please specify number of bedrooms'],
        min: [0, 'Bedrooms cannot be negative'],
    },
    beds : {
        type: Number,
        required: [true, 'Please specify number of beds'],
        min: [1, 'Must have at least 1 bed'],
    },
    bathrooms : {
        type: Number,
        required: [true, 'Please specify number of bathrooms'],
        min: [1, 'Must have at least 1 bathrooms'],
    },
    guests : {
        type : Number,
        required: [true, 'Please specify maximum capacity'],
        min: [1, 'Capacity must be at least 1 guest'],
    },
    amenities: {
      type: [String],
      default: [],
    },
    pricePerNight: {
      type: Number,
      required: [true, 'Please set a price per night'],
      min: [0, 'Price cannot be negative'],
    },
    isInstantBook: {
      type: Boolean,
      default: false,
    }
},
    {
        timestamps: true, // Tracks creation dates automatically ("Newest" sorting condition)
    }
);

// --- PERFORMANCE CRITICAL INDEXES ---
// 1. Compound index for location searches (text-based flexible fields)
listingSchema.index({ city: 'text', state: 'text', country: 'text' });

// 2. Geospatial index for map coordinate inquiries and distance sorting
listingSchema.index({ location: '2dsphere' });

// 3. Single index for categories to load the Home Feed instantaneously
listingSchema.index({ category: 1 });

// 4. Combined query index for common discovery filter sorting (price adjustments within categories)
listingSchema.index({ category: 1, pricePerNight: 1 });

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;