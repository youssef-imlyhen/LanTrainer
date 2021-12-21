import React, { useReducer, useEffect, useRef, useState } from "react";
import ImportLocal from "./ImportLocal";
import SaveQuote from "./SaveQuote";

export default function MoviePlayer() {
  const [selection, dispatch] = useReducer(setUpMovieReducer, {});
  const [mainSub, setMainSub] = useState();
  const [lastPlayedCues, setLastPlayedCues] = useState({
    main: {text: '', startTime: '', id: ''},
    lang1: {text: '', startTime: '', id: ''},
    lang2: {text: '', startTime: '', id: ''}
  });
  const lang1SrcRef = useRef(0);
  const moviePlayer = useRef();

  useEffect(() => {
    // Prob: it runs 9 times 
    if (selection.file && !selection.lang1Src) {
      const file = selection.file
      const reader = new FileReader();
      reader.readAsText(file, "WINDOWS-1256");
      reader.addEventListener("load", () => {
        let sub1Str = reader.result;
        let lang1Blob = new Blob([sub1Str], { type: "text/plain" });
        lang1SrcRef.current = window.URL.createObjectURL(lang1Blob);
      });
      dispatch({type: "setLang1Sub", payload: lang1SrcRef.current});
    }

  }, [selection]);

  useEffect(()=>{
    console.log(lastPlayedCues);
  }, [lastPlayedCues])

  // to give the possibility to observe the cuechange of nonselected track
  const movieLoadHandler = (e) =>  {
    const Tracks = [...moviePlayer.current.textTracks];
    Tracks.forEach(textTrack => {
      textTrack.mode = textTrack.mode === "disabled" ? "hidden" : textTrack.mode 
      // specific for the ar, en, fr case of subs
      switch (textTrack.mode) {
        case 'showing':
          textTrack.addEventListener("cuechange", () => {
            if (textTrack.activeCues.length !== 0) {
              let curCue = textTrack.activeCues[0];
              setLastPlayedCues(prev => ({...prev, main:{
                text: curCue.text, 
                id: curCue.id,
                startTime: curCue.startTime
              }}))
            }  
          })
          break;
        case 'hidden':
          if (textTrack.label === 'ar') {
            textTrack.addEventListener("cuechange", () => {
              if (textTrack.activeCues.length !== 0) {
                let curCue = textTrack.activeCues[0];
                setLastPlayedCues(prev => ({...prev, lang1:{
                  text: curCue.text, 
                  id: curCue.id,
                  startTime: curCue.startTime
                }}))
              }  
            })
          }else{
            textTrack.addEventListener("cuechange", () => {
              if (textTrack.activeCues.length !== 0) {
                let curCue = textTrack.activeCues[0];
                setLastPlayedCues(prev => ({...prev, lang2:{
                  text: curCue.text, 
                  id: curCue.id,
                  startTime: curCue.startTime
                }}))
              }  
            })
          }
          break;
        default:
          break;
      }    
  
    })
 }



  return (
    <div>
      <figure className="" className="">
        <video controls className="container" src={selection.movieSrc} ref={moviePlayer} onPlay={movieLoadHandler}> 
          <track
            className="defaultTrack"
            kind="subtitles"
            label="en"
            srcLang="ar"
            default
            src={selection.mainSubSrc}
          

          />
          <track
            className="lang1Track"
            kind="subtitles"
            label="ar"
            srcLang="ar"
            src={selection.lang1Src}
          />
          <track
            className="lang2Track"
            kind="subtitles"
            label="fr"
            srcLang="fr"
            src={selection.lang2Src}
          />
        </video>
        <div className="bg-neutral flex justify-between">
          <figcaption className="card h-36 w-5/12">
            <p className="card-body ">{lastPlayedCues.lang1.text}</p>
          </figcaption>
      <SaveQuote lastPlayedCues={lastPlayedCues} movieName={selection.movieName}/>
          <figcaption className="card h-36 w-5/12">
            <p className="card-body ">{lastPlayedCues.lang2.text}</p>
          </figcaption>
        </div>
      </figure>
      <ImportLocal dispatch={dispatch} />
    </div>
  );

  function setUpMovieReducer(state, action) {
    let newState = {};
    switch (action.type) {
      case "handleFileChange":
        try {
          const files = [...action.files];
          files.forEach((file, i) => {
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

              // to do find a pattern to movie name like using .mp4 or the
              //oher extention to know if this file is a movie or not
              default:
                let movieName = file.name
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
        newState = {...state, lang1Src: action.payload}
        break
      default:
        throw new Error();
    }
    return newState;
  }
}

