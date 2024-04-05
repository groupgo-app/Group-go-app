import { ITemplate } from "../types/Template";
import others from "/templateimages/others.png";
import gameNight from "/templateimages/game night.png";
import sportEvent from "/templateimages/sport event.png";
import partyEvent from "/templateimages/party event.png";
import travelEvent from "/templateimages/travel event.png";
import bookClub from "/templateimages/book club.png";
import restaurantEvent from "/templateimages/mini restaurant template img.png";

export const templates: ITemplate[] = [
  {
    id: 1,
    templateName: "Resturant Event",
    imgUrl: restaurantEvent,
    coverImg: "",
    imageAlt: "mini restaurant template image",
  },
  {
    id: 2,
    templateName: "Book Club",
    imgUrl: bookClub,
    coverImg: "",
    imageAlt: "mini book club template image",
  },
  {
    id: 3,
    templateName: "Travel Event",
    imgUrl: travelEvent,
    coverImg: "",
    imageAlt: "mini travel illustration image",
  },
  {
    id: 4,
    templateName: "Party Event",
    imgUrl: partyEvent,
    coverImg: "",
    imageAlt: "mini template image of a club party",
  },
  {
    id: 5,
    templateName: "Sport Event",
    imgUrl: sportEvent,
    coverImg: "",
    imageAlt: "mini template illustration of sport",
  },
  {
    id: 6,
    templateName: "Game Night",
    imgUrl: gameNight,
    coverImg: "",
    imageAlt: "mini image illustration of game night",
  },
  {
    id: 7,
    templateName: "Others",
    imgUrl: others,
    coverImg: "",
    imageAlt: "image illustration of other event that can be added",
  },
];
