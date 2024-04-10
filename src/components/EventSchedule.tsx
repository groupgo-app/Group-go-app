import InputField from "./InputField";

const EventSchedule = ({ eventInfo, handleChangeForEventInfo }: any) => {
  return (
    <>
      <div className="event_schedule_container">
        <div className="event_schedule_duration">
          <InputField
            id="start_date"
            type="date"
            label="Start Date"
            name="startDate"
            value={eventInfo?.startDate}
            onChange={handleChangeForEventInfo}
            required
          />

          <InputField
            id="end_date"
            type="date"
            label="End Date"
            name="endDate"
            value={eventInfo.endDate}
            onChange={handleChangeForEventInfo}
            required
          />
        </div>

        <div className="event_schedule_duration">
          <InputField
            id="start_time"
            type="time"
            label="Start Time"
            name="startTime"
            value={eventInfo.startTime}
            onChange={handleChangeForEventInfo}
            required
          />

          <InputField
            id="end_time"
            type="time"
            label="End Time"
            name="endTime"
            value={eventInfo.endTime}
            onChange={handleChangeForEventInfo}
            required
          />
        </div>
      </div>
    </>
  );
};

export default EventSchedule;
