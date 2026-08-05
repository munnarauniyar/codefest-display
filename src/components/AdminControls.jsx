function AdminControls() {
    return (
        <>
            <div className="admin-grid">
                <button>Start</button>
                <button className="secondary">Pause</button>
                <button className="secondary">Resume</button>

                <button className="danger">Reset</button>
                <button>+1 min</button>
                <button>-1 min</button>

                <button>+5 min</button>
                <button>-5 min</button>
                <button>Fullscreen</button>
            </div>

            <div className="duration-row">
                <input placeholder="Duration in hours (e.g. 30 or 36)" />
                <button>Apply</button>
            </div>
        </>
    );
}

export default AdminControls;