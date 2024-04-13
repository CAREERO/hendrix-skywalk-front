import React from "react";

interface BannerVideoProps {
    videoSrc: string
}
const BannerVideo:React.FC<BannerVideoProps> = (props) => {

    return (
        <>
            <div className="container-video">
                <video className="banner-video" autoPlay loop muted>
                    <source src={props.videoSrc}/>
                </video>
            </div>
            
        </>
    )

}
export default BannerVideo;