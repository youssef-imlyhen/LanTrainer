import React, { useEffect, useRef } from "react";

export default function Player({selection ,setLastPlayedCues}) {
  const moviePlayer = useRef();
  // to give the possibility to observe the cuechange of nonselected track
  const movieLoadHandler = (e) => {
    const Tracks = [...moviePlayer.current.textTracks];
    Tracks.forEach((textTrack) => {
      textTrack.mode =
        textTrack.mode === "disabled" ? "hidden" : textTrack.mode;
      // specific for the ar, en, fr case of subs
      switch (textTrack.mode) {
        case "showing":
          textTrack.addEventListener("cuechange", () => {
            if (textTrack.activeCues.length !== 0) {
              let curCue = textTrack.activeCues[0];
              setLastPlayedCues((prev) => ({
                ...prev,
                main: {
                  text: curCue.text,
                  id: curCue.id,
                  startTime: curCue.startTime,
                },
              }));
            }
          });
          break;
        case "hidden":
          if (textTrack.label === "ar") {
            textTrack.addEventListener("cuechange", () => {
              if (textTrack.activeCues.length !== 0) {
                let curCue = textTrack.activeCues[0];
                setLastPlayedCues((prev) => ({
                  ...prev,
                  lang1: {
                    text: curCue.text,
                    id: curCue.id,
                    startTime: curCue.startTime,
                  },
                }));
              }
            });
          } else {
            textTrack.addEventListener("cuechange", () => {
              if (textTrack.activeCues.length !== 0) {
                let curCue = textTrack.activeCues[0];
                setLastPlayedCues((prev) => ({
                  ...prev,
                  lang2: {
                    text: curCue.text,
                    id: curCue.id,
                    startTime: curCue.startTime,
                  },
                }));
              }
            });
          }
          break;
        default:
          break;
      }
    });
  };

  useEffect(() => {
    console.log(selection);
  }, [selection])
  return (
    <video
      controls
      className="min-w-full"
      src={selection.movieSrc}
      ref={moviePlayer}
      onPlay={movieLoadHandler}
    >
      <track
        className="defaultTrack"
        kind="subtitles"
        label="en"
        srcLang="en"
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
  );
}
