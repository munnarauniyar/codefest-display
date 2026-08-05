import AdminControls from "../components/AdminControls";

function Admin() {
    return (
        <div className="admin-shell">
            <div className="admin-topbar">
                <div>
                    <div className="admin-eyebrow">CodeFest Control Center</div>
                    <h1>Hackathon Display Console</h1>
                </div>

                <div className="live-indicator">
                    <span className="live-dot"></span>
                    LIVE
                </div>
            </div>

            <div className="admin-layout">
                <div className="admin-panel">
                    <h2>Timer Controls</h2>
                    <AdminControls />
                </div>

                <div className="admin-panel">
                    <h2>Display Notes</h2>
                    <ul className="admin-notes">
                        <li>Timer visible most of the time</li>
                        <li>Sponsor card every 2 minutes for 8 seconds</li>
                        <li>State survives refresh and power cuts</li>
                        <li>Use F11 or kiosk mode on the smart board</li>
                        <li>Sponsor logos rotate automatically</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Admin;