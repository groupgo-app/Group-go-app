export const isPassedCurrentTime = (endDate: any, endTime: any) => {
  const endDateTime = new Date(`${endDate}T${endTime}`);
  const currentDateTime = new Date();
  return currentDateTime > endDateTime;
};
