const InputField = ({
  name,
  label,
  id,
  type,
  placeholder,
  value,
  onChange,

  onKeyDown,
  onBlur,
}: any) => {
  return (
    <>
      <div className="field_set_div">
        {label && <label htmlFor={id}>{label}</label>}
        {type === "textarea" ? (
          <textarea
            cols={50}
            rows={4}
            className="event_description_textarea"
            name={name}
            placeholder={placeholder}
            id={id}
            value={value}
            onChange={onChange}
            required
          ></textarea>
        ) : (
          <input
            name={name}
            className="inputs"
            type={type}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown ? onKeyDown : () => {}}
            onBlur={onBlur ? onBlur : () => {}}
            required
          />
        )}
      </div>
    </>
  );
};

export default InputField;
