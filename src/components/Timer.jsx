function Timer() {
    return (
        <div className="timer-panel">
            <div className="timer-label">Time Remaining</div>
            <div className="timer">30:00:00</div>

            <div className="progress">
                <div className="progress-fill"></div>
            </div>
        </div>
    );
}

export default Timer;