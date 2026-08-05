import { useEffect, useMemo, useState } from "react";

const DEFAULT_HOURS = 30;
const STORAGE_KEY = "codefest_timer_state_v1";

const sponsorCards = [
    { src: "/images/logo1.jpeg", title: "Presenting Partner" },
    { src: "/images/logo2.png", title: "Powered By" },
    { src: "/images/logo3.png", title: "Hosting Partner" },
    { src: "/images/logo4.jpg", title: "Clothing Partner" },
    { src: "/images/logo5.png", title: "Internet Partner" },
    { src: "/images/logo6.svg", title: "Learning Partner" },
];

function format(ms) {
    const total = Math.max(0, Math.floor(ms / 1000));
    const h = String(Math.floor(total / 3600)).padStart(2, "0");
    const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
    const s = String(total % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
}

function loadState() {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
        return {
            running: false,
            durationMs: DEFAULT_HOURS * 60 * 60 * 1000,
            endTime: null,
            pausedRemaining: DEFAULT_HOURS * 60 * 60 * 1000,
        };
    }

    try {
        return JSON.parse(raw);
    } catch {
        return {
            running: false,
            durationMs: DEFAULT_HOURS * 60 * 60 * 1000,
            endTime: null,
            pausedRemaining: DEFAULT_HOURS * 60 * 60 * 1000,
        };
    }
}

function Timer() {
    const [state, setState] = useState(loadState);
    const [now, setNow] = useState(Date.now());

    useEffect(() => {
        const tick = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(tick);
    }, []);

    useEffect(() => {
        const sync = () => setState(loadState());

        window.addEventListener("storage", sync);

        const interval = setInterval(sync, 1000);

        return () => {
            window.removeEventListener("storage", sync);
            clearInterval(interval);
        };
    }, []);

    const remaining = useMemo(() => {
        if (state.running && state.endTime) {
            return Math.max(0, state.endTime - now);
        }

        return state.pausedRemaining;
    }, [state, now]);

    const elapsed = state.durationMs - remaining;

    const cycle = elapsed % 120000;
    const showSponsor = cycle >= 112000 && cycle < 120000;

    const sponsorIndex =
        Math.floor(elapsed / 120000) % sponsorCards.length;

    const progress =
        state.durationMs === 0
            ? 0
            : Math.min(100, Math.max(0, ((state.durationMs - remaining) / state.durationMs) * 100));

    return (
        <div className="timer-panel">
            <div className={`timer-view ${showSponsor ? "hidden" : "visible"}`}>
                <div className="timer-label">Time Remaining</div>

                <div className="timer">{format(remaining)}</div>

                <div className="progress">
                    <div
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <div className={`sponsor-view ${showSponsor ? "visible" : "hidden"}`}>
                <div className="sponsor-card">
                    <div className="sponsor-event">CodeFest Madhesh Pradesh 2026</div>

                    <div className="sponsor-title">
                        {sponsorCards[sponsorIndex].title}
                    </div>

                    <img
                        src={sponsorCards[sponsorIndex].src}
                        alt={sponsorCards[sponsorIndex].title}
                        className="sponsor-logo-large"
                    />

                    <div className="sponsor-footer">
                        Thank you for supporting innovation and student technology.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Timer;