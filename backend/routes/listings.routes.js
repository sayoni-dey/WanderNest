import express from "express";
import router from "./auth.routes";
import Listing from '../models/listings.model';
import { protect, restrictTo } from "../middlewares/auth.middleware";

router.post('/', protect, restrictTo('host'), async (req, res, next) => {
    try{
        const {
            title, 
            description,
            image,
            category,
            country,
            state,
            city,
            propertyType,
            bedrooms,
            beds,
            bathrooms,
            guests,
            amenities,
            pricePerNight,
            isInstantBook
        } = req.body;

        const newListings = new Listing ({
            host: req.user.id,
            title, 
            description,
            image: Array.isArray(image) ? images : [image],
            category,
            country,
            state,
            city,
            propertyType,
            bedrooms: parseInt(bedrooms),
            beds: parseInt(beds),
            bathrooms:parseInt(bathrooms) ,
            guests: parseInt(guests),
            amenities: Array.isArray(amenities) ? amenities : amenities.split(',').map(a => a.trim()),
            pricePerNight: parseFloat(pricePerNight),
            isInstantBook: isInstantBook === true || isInstantBook === 'true'
        });

        // 4. Fire storage allocation trigger
        const savedListing = await newListing.save();

        res.status(201).json({
            success: true,
            message: 'Listing published successfully onto WanderNest!',
            data: savedListing
        });
    }catch(err){
        console.error('Hosting submission error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to create listing due to validation discrepancy'
        });
    }
});

// @route   GET /api/listings
// @desc    Temporary helper route to view all listings
// @access  Public
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find().populate('host', 'name email phone');
    res.status(200).json({ success: true, count: listings.length, data: listings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server compilation fault' });
  }
});

export default router;