import React from "react";
import KeyComponent from "./KeyComponent";

const HomeComponent=()=>{
    const keys=[
        {
            key:"a",
            sound:"boom",
        },
        {
            key:"s",
            sound:"hihat",
        },
        {
            key:"d",
            sound:"openhat",
        },
        {
            key:"f",
            sound:"snare",
        },
        {
            key:"g",
            sound:"tom",
        },
        {
            key:"h",
            sound:"clap",
        },
        {
            key:"j",
            sound:"kick",
        },
        {
            key:"k",
            sound:"ride",
        },
        {
            key:"l",
            sound:"tink",
        },
    ]

    const [audsrc,setAudSrc]=React.useState("");
    const audioRef=React.useRef();

    const handleKeypress=async (e)=>{
        const sound=keys.find(ke=>e.code===`Key${ke.key.toUpperCase()}`)?.sound;
        if(sound!==undefined){
            const file = await import(`../assets/sounds/${sound}.wav`);
            setAudSrc(file.default);
            audioRef.current.play();
        }
    }

    React.useEffect(()=>{
        document.addEventListener("keyup",(e)=>handleKeypress(e));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
        <div className="wrapper">
            {keys.map(keyy=><KeyComponent key={keyy.key} det={keyy}/>)}
            <audio ref={audioRef} src={audsrc}></audio>
        </div>
    )
}

export default HomeComponent;