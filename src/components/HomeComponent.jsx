import React from "react";
import KeyComponent from "./KeyComponent";
import LoadingComponent from "./LoadingComponent";

const HomeComponent = () => {
  // Keys and Sound File Combination
  const keys = [
    {
      key: "a",
      sound: "boom",
    },
    {
      key: "s",
      sound: "hihat",
    },
    {
      key: "d",
      sound: "openhat",
    },
    {
      key: "f",
      sound: "snare",
    },
    {
      key: "g",
      sound: "tom",
    },
    {
      key: "h",
      sound: "clap",
    },
    {
      key: "j",
      sound: "kick",
    },
    {
      key: "k",
      sound: "ride",
    },
    {
      key: "l",
      sound: "tink",
    },
  ];

  const [loaded, setLoaded] = React.useState(false); //State for loading of audio file
  const [audsrc, setAudSrc] = React.useState(""); //State for src of audio file
  const audioRef = React.useRef(); //Ref for the audio file

  //Event to fire when key is pressed
  const handleKeypress = async (e) => {
    const sound = keys.find((ke) => e.key.toLowerCase() === ke.key);
    if (sound !== undefined) {
      setAudSrc(sound.file.default);
      audioRef.current.play();
    }
  };

  React.useEffect(() => {
    //Creating promise to show loading untill all audio files are imported
    let pr = new Promise((resolve, reject) => {
      keys.forEach(async (keyy, index) => {
        keyy.file = await import(`../assets/sounds/${keyy.sound}.wav`);
        if (index === keys.length - 1) resolve();
      });
    });
    pr.then(() => {
      document.addEventListener("keyup", (e) => handleKeypress(e));
      setLoaded(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="wrapper">
      {/* Showing LoadingComponent untill all audio files are imported */}
      {loaded ? (
        <>
          {keys.map((keyy) => (
            <KeyComponent key={keyy.key} det={keyy} />
          ))}
          <audio ref={audioRef} src={audsrc}></audio>
        </>
      ) : (
        <LoadingComponent />
      )}
    </div>
  );
};

export default HomeComponent;
