import { useState, React } from "react";
import { FaUpload } from "react-icons/fa";

export default function ImportLocal({ dispatch }) {
  const [isSelected, setIsSelected] = useState(false);

  const changeHandler = (e) => {
    let action = {
      type: "handleFileChange",
      files: e.target.files,
    };
    dispatch(action);
    setIsSelected(true);
  };

  return (
    <div className="grid place-items-center bg-neutral-focus">
      <h1 className="text-2xl text-neutral-content my-4">
        Select The Location Of The Movie And Its Subtitles
      </h1>
      <label className="btn  btn-info my-4">
        <FaUpload className="mr-2" />
        <input
          type="file"
          name="select-movie"
          className="hidden"
          multiple
          onChange={changeHandler}
        />
        Upload
      </label>
    </div>
  );
}
