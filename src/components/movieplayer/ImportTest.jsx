import React from 'react'

export default function ImportTest() {
    const changeHandler = e =>{
        let file = window.URL.creatText(e.target.files[0]);
        console.log(file);
    }
    return (
        <div>
            <input
        type="file"
        name="select-movie"
        className=" btn btn-primary"
        multiple
        onChange={changeHandler}
      />
    </div>
    )
}
