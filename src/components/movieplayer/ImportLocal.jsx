import {useState, React} from "react";

export default function ImportLocal({dispatch}) {
    const [isSelected, setIsSelected] = useState(false);
    
    const changeHandler = (e) => {
        let action = {
          type: "handleFileChange",
          files: e.target.files
        }  
        dispatch(action);
        setIsSelected(true);
    } 
    
    return (
    <div className="select-container">
      <input
        type="file"
        name="select-movie"
        className="select-movie"
        multiple
        onChange={changeHandler}
      />
    </div>
  );
}
