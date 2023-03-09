const Textarea = ({
  labelName = "",
  id,
  defaultValue = "",
  rows = 10,
  name,
}) => {
  return (
    <>
      <div className="w-full px-5 py-6 bg-secondary rounded-lg shadow-lg">
        <label className="text-2xl text-white font-bold" htmlFor={id}>
          {labelName}
        </label>
        <textarea
          className="p-3 mt-2 block rounded-lg bg-primary w-full text-white resize-none outline-none"
          id={id}
          rows={rows}
          name={name}
          defaultValue={defaultValue}
        ></textarea>
      </div>
    </>
  );
};

export default Textarea;
