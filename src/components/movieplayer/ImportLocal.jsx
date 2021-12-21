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
    
      <input
        type="file"
        name="select-movie"
        className=" btn"
        multiple
        onChange={changeHandler}
      />
  );
}
