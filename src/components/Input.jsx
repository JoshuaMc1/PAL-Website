const Input = ({
  labelName = "",
  inputType = "text",
  placeholder = "",
  id,
  defaultValue = "",
  readOnly = false,
}) => {
  return (
    <>
      <div className="w-full px-5 py-6 bg-secondary rounded-lg shadow-lg">
        <label className="text-2xl text-white font-bold" htmlFor={id}>
          {labelName}
        </label>
        <input
          className={`p-3 mt-2 block rounded-lg bg-primary w-full text-white border-none outline-none ${
            readOnly && "cursor-pointer"
          }`}
          type={inputType}
          placeholder={placeholder}
          id={id}
          defaultValue={defaultValue}
          readOnly={readOnly}
        />
      </div>
    </>
  );
};

export default Input;
