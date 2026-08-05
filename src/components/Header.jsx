function Header() {
    return (
        <header className="header">
            <div className="left">
                <img
                    className="codefest-logo"
                    src="/images/codefest-logo.png"
                    alt="CodeFest"
                />

                <div className="hero-title">
                    <div className="hero-tag">CODE FEST - 2026</div>
                    <div className="hero-main">MADHESH PRADESH</div>
                </div>
            </div>

            <div className="right organizer-block">
                <div style={{ textAlign: "right" }}>
                    <div className="label">Organized by</div>
                    <div className="title">Code For Change Birgunj</div>
                </div>

                <img
                    className="organizer-logo"
                    src="/images/cfc-logo.png"
                    alt="Code For Change"
                />
            </div>
        </header>
    );
}

export default Header;