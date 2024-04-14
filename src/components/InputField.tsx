const InputField = ({
  name,
  label,
  id,
  type,
  placeholder,
  value,
  onChange,
  autoFocus,
  onKeyDown,
  onBlur,
  required,
  inputmode,
  pattern,
  ref,
}: any) => {
  const asterisk = <span className="text-red-500">*</span>;
  return (
    <>
      <div className="field_set_div">
        {label && (
          <label htmlFor={id}>
            {required && asterisk} {label}
          </label>
        )}
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
            autoFocus={autoFocus ? autoFocus : false}
            ref={ref ? ref : null}
            inputMode={inputmode && inputmode}
            pattern={pattern && pattern}
            required
          />
        )}
      </div>
    </>
  );
};

export default InputField;
