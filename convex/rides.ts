import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { calculateDistance } from "../utils/helpers/distance";

export const findClosestDriver = query({
    args: { 
      passengerLat: v.number(), 
      passengerLon: v.number() 
    },
    handler: async (ctx, args) => {
      const { passengerLat, passengerLon } = args;
      
      const availableDrivers = await ctx.db
        .query("drivers")
        .filter(q => q.eq(q.field("availabilityStatus"), "AVAILABLE"))
        .collect();
      
      let closestDriver = null;
      let minDistance = Infinity;
      
      for (const driver of availableDrivers) {
        if (driver.currentLocation) {
          const distance = calculateDistance({
            lat1: passengerLat, 
            lon1: passengerLon,
            lat2: driver.currentLocation.latitude,  
            lon2: driver.currentLocation.longitude,
          })
          
          if (distance < minDistance) {
            minDistance = distance;
            closestDriver = driver;
          }
        }
      }
      
      return { closestDriver, distance: minDistance };
    },
  });
  
export const createRideRequest = mutation({
args: { 
    passengerId: v.id("passengers"),
    pickupLat: v.number(),
    pickupLon: v.number(),
    dropoffLat: v.number(),
    dropoffLon: v.number(),
    price: v.number(),
},
handler: async (ctx, args) => {
    const { passengerId, pickupLat, pickupLon, dropoffLat, dropoffLon, price } = args;
    
    const rideRequestId = await ctx.db.insert("rideRequests", {
    passengerId,
    pickupLocation: { latitude: pickupLat, longitude: pickupLon },
    dropoffLocation: { latitude: dropoffLat, longitude: dropoffLon },
    status: "PENDING",
    price,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
    });
    
    return rideRequestId;
},
});