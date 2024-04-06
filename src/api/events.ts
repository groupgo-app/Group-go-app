import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
  // FieldValue,
} from "firebase/firestore";

import { db } from "../config/firebase";
// import setFirebaseArr from "../utils/setFirebaseArr";

const eventsCollectionRef = collection(db, "events");

export const saveEvent = async (data: any) => {
  try {
    const newData = {
      ...data,
      eventInfo: {
        ...data.eventInfo,
        socialLinks: JSON.stringify([...data.eventInfo.socialLinks]),
      },
    };
    const docRef = await addDoc(eventsCollectionRef, newData);
    const snapShot = await getDoc(docRef);
    const savedData = snapShot.data();

    return savedData;
  } catch (error: any) {
    console.log(error?.stack);
    throw new Error(error);
  }
};

export const updateEvent = async (
  eventId: string,
  userId: string,
  eventData: any,
) => {
  try {
    const newData = {
      ...eventData,
      eventInfo: {
        ...eventData.eventInfo,
        socialLinks: JSON.stringify([...eventData.eventInfo.socialLinks]),
      },
    };
    const dataList: any[] = [];
    const q = query(eventsCollectionRef, where("eventId", "==", eventId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      let data = doc.data();
      data.id = doc.id;
      dataList.push(data);
    });
    if (dataList[0]) {
      if (dataList[0].uid === userId) {
        const eventDoc = doc(db, "events", dataList[0].id);

        await updateDoc(eventDoc, newData);
      }
    } else {
      return Error("Data not found");
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchEvents = async () => {
  try {
    const eventList: any[] = [];

    const eventSnapshot = await getDocs(eventsCollectionRef);
    eventSnapshot.forEach((doc) => {
      let data = doc.data();
      data.id = doc.id;
      eventList.push(data);
    });
    return eventList;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
};

export const fetchEventById = async (eventId: string) => {
  try {
    const dataList: any[] = [];
    const q = query(eventsCollectionRef, where("eventId", "==", eventId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      let data = doc.data();
      data.id = doc.id;
      dataList.push(data);
    });

    return dataList[0];
  } catch (error: any) {
    console.log(error.stack);
  }
};

export const updateParticipantsCount = async (eventId: string) => {
  try {
    // const eventRef = query();
    const eventRef = doc(db, "event", eventId);
    await updateDoc(eventRef, {
      numberOfPaidParticipants: increment(1),
    });
  } catch (error: any) {
    console.log(error.stack);
  }
};
