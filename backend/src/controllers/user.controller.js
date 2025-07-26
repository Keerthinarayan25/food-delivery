import Restaurants from '../models/restaurant.model.js';

export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurants.find({});
    if (!restaurants || restaurants.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No restaurants found" });
    }
    res.status(200).json({
      success: true,
      message: "Restaurants fetched successfully",
      data: restaurants,
    });
  } catch (error) {
    console.log('Error in getAllRestaurants:', error.message);
    res.status(500).json({message: 'Server error: Unable to fetch restaurants' });
  }
};

