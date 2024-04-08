export const linkToImage = async (link: string, eventData: any) => {
  const response = await fetch(link);

  // here image is url/location of image
  const blob = await response.blob();
  const file = new File(
    [blob],
    `${eventData.eventType}_image.${blob.type.split("/")[1]}`,
    {
      type: blob.type,
    },
  );
  return file;
};

//   https://firebasestorage.googleapis.com/v0/b/groupgodb.appspot.com/o/images%2FParty%20Event_image.png?alt=media&token=83102506-5f54-4ff3-a47e-8c070742978a
