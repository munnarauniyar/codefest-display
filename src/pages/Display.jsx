import Header from "../components/Header";
import VideoPanel from "../components/VideoPanel";
import Timer from "../components/Timer";
import SponsorRibbon from "../components/SponsorRibbon";

function Display() {
    return (
        <div className="display-page">
            <Header />

            <div className="main">
                <VideoPanel />
                <Timer />
            </div>

            <SponsorRibbon />
        </div>
    );
}

export default Display;