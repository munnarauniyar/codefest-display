import AdminControls from "../components/AdminControls";

function Admin() {
    return (
        <div className="admin-page">
            <div className="admin-card">
                <h1>CodeFest Timer Control Panel</h1>
                <AdminControls />
            </div>
        </div>
    );
}

export default Admin;