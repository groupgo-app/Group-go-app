import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import { db } from "../config/firebase";

// Create a function to find a specific user
export const findUser = async (uid) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userSnapShot = await getDoc(userDocRef);
    if (!userSnapShot.exists()) {
      return false;
    }
    let userData = userSnapShot.data();
    return userData;
  } catch (error) {
    console.log(error);
  }
};

// Create a function to save event for a specific user
export const saveEventForAUser = async (uid, data) => {
  try {
    const docRef = await addDoc(collection(db, "users", uid, "events"), data);
    // console.log(docRef);
    const snapShot = await getDoc(docRef);
    const savedData = snapShot.data();
    return savedData;
  } catch (error) {
    console.log(error.stack);
  }
};

// Create a function to fetch all event for a specific user
export const fetchEventForAUser = async (uid) => {
  try {
    const eventList = [];
    const eventRef = collection(db, "users", uid, "events");
    const eventSnapshot = await getDocs(eventRef);
    eventSnapshot.forEach((doc) => {
      // console.log(doc.id);
      let data = doc.data();
      data.id = doc.id;
      // console.log(data);
      eventList.push(data);
    });
    return eventList;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
};

// create a function to fetch a single event for a given id and ownerId
export const fetchSingleEventByOwnerAndID = async (uid, eventId) => {
  try {
    const eventRef = query(doc(db, "users", uid, "events", eventId));
    const getEventSnapShot = await getDoc(eventRef);
    // console.log("Event snapshot", getEventSnapShot.data());

    // console.log("uid", uid);
    // console.log("eventId", eventId);
    if (getEventSnapShot.exists()) {
      return getEventSnapShot.data();
    } else {
      return "Data not found";
    }
  } catch (error) {
    console.log(error.stack);
  }
};
