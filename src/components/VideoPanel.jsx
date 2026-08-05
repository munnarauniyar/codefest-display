function VideoPanel() {
    const videoId = "jKl0-lrTLso";

    const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0`;

    return (
        <div className="video-panel">
            <iframe
                src={videoUrl}
                title="Sponsor Reel"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
}

export default VideoPanel;