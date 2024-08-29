import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import Stripe from "stripe";

// CREATE HOTEL
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  console.log(newHotel);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

export const intent = async (req, res, next) => {
  console.log("api-is-hit");
  const hotel = await Hotel.findById(req.params.id);
  console.log("hotel", hotel);
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 10 * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  // Hotel mein payment_intent update karna
  hotel.payment_intent_id = paymentIntent.id; // payment_intent ID ko update karna
  await hotel.save(); // Save method se hotel ko update karna
  // const newHotel = new  Hotel({
  //   _id
  // })
  res.status(200).json({ clientSecret: paymentIntent.client_secret });
};

//UPDATE HOTEL

export const updateHotel = async (req, res, next) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (err) {
    next(err);
  }
};

export const confirm = async (req, res, next) => {
  console.log("api-is-hitting");
  try {
    const payment_status = await Hotel.findOneAndUpdate(
      {
        payment_intent_id: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );

    console.log("payment-status", payment_status);
    if (payment_status) {
      res.status(200).send("Payment has been confirmed.");
    }
  } catch (err) {
    next(err);
  }
};

// DELETE HOTEL

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json(" Hotel has been deleted");
  } catch (err) {
    next(err);
  }
};

//Get HOTEL

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

// GET ALL HOTELS
export const getHotels = async (req, res, next) => {
  // console.log("query", req.query);
  const { min, max, ...others } = req.query;
  const minPrice = parseInt(min) || 1;
  const maxPrice = parseInt(max) || 999;
  // console.log(typeof others.featured)
  console.log("min", minPrice, "typeof", typeof minPrice);
  console.log("max", maxPrice, "typeof", typeof maxPrice);
  console.log("other", others);
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: minPrice || 1, $lt: maxPrice || 999 },
    }).limit(req.query.limit);
    // console.log(hotels)
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

//COUNT BY CITY

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    return res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

//Count By Type
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    console.log("hotel-detail", hotel);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    console.log("room-list", list);
    return res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
