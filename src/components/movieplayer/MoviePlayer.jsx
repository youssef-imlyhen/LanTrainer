import React, { useReducer, useEffect, useRef, useState } from "react";
import ImportLocal from "./ImportLocal";
import Player from "./Player";
import SaveQuote from "./SaveQuote";
import toWebVTT from "srt-webvtt";

export default function MoviePlayer() {
  const [selection, dispatch] = useReducer(setUpMovieReducer, {});
  // const [mainSub, setMainSub] = useState();
  const [lastPlayedCues, setLastPlayedCues] = useState({
    main: { text: "", startTime: "", id: "" },
    lang1: { text: "", startTime: "", id: "" },
    lang2: { text: "", startTime: "", id: "" },
  });
  const lang1SrcRef = useRef(0);

  // handle the arabic subtitle
  useEffect(async () => {
    // Prob: it runs 9 times
    if (selection.file && !selection.lang1Src) {
      const file = selection.file;
      const reader = new FileReader();
      reader.readAsText(file, "WINDOWS-1256");
      reader.addEventListener("load", () => {
        let sub1Str = reader.result;
        let lang1Blob = new Blob([sub1Str], { type: "text/plain" });
        lang1SrcRef.current = window.URL.createObjectURL(lang1Blob);
      });
      dispatch({ type: "setLang1Sub", payload: lang1SrcRef.current });
    }
    if (selection.srtFile && !selection.mainSubSrc) {
      const file = selection.srtFile;
      const mainSubSrc = await toWebVTT(file);
      dispatch({type: "setUpSrt", payload: mainSubSrc})
    };
    console.log(selection);
  }, [selection]);

  return (
    <div>
      <figure className="">
        <Player setLastPlayedCues={setLastPlayedCues} selection={selection} />
        <div className="bg-neutral flex justify-between">
          <figcaption className="card h-36 w-5/12  text-xl">
            <p className="card-body ">{lastPlayedCues.lang1.text}</p>
          </figcaption>
          <SaveQuote
            lastPlayedCues={lastPlayedCues}
            movieName={selection.movieName}
          />
          <figcaption className="card h-36 w-5/12  text-xl">
            <p className="card-body ">{lastPlayedCues.lang2.text}</p>
          </figcaption>
        </div>
      </figure>
      <ImportLocal dispatch={dispatch} />
      {/* <ImportTest />  */}
    </div>
  );

  function setUpMovieReducer(state, action) {
    let newState = {};
    switch (action.type) {
      case "handleFileChange":
        try {
          const files = [...action.files];
          files.forEach(async (file, i) => {
            switch (file.name) {
              case "en.vtt":
                let mainSubSrc = window.URL.createObjectURL(file);
                newState = { ...newState, mainSubSrc };
                break;

              case "ar.vtt":
                // let lang1Src = window.URL.createObjectURL(file);
                newState = { ...newState, file };

                break;

              case "fr.vtt":
                let lang2Src = window.URL.createObjectURL(file);
                newState = { ...newState, lang2Src };
                break;
              
                case "en.srt":
                  let srtFile = file
                  newState = {...newState, srtFile}
                  break;

              // to do find a pattern to movie name like using .mp4 or the
              //oher extention to know if this file is a movie or not
              default:
                let movieName = file.name;
                let movieSrc = window.URL.createObjectURL(file);
                newState = { ...newState, movieSrc, movieName };
                break;
            }
          });
        } catch (err) {
          throw err;
        }
        break;
        case "setLang1Sub":
          newState = { ...state, lang1Src: action.payload };
          break;
          case "setUpSrt":
        newState = { ...state, mainSubSrc: action.payload };
        break;
      default:
        throw new Error();
    }
    return newState;
  }
}
