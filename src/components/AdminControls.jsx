import { useState } from "react";

const STORAGE_KEY = "codefest_timer_state_v1";
const DEFAULT_HOURS = 30;

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

export default function AdminControls() {
    const [hoursInput, setHoursInput] = useState("");

    // Helper to update state and notify all tabs
    const updateState = (updater) => {
        const currentState = loadState();
        const newState = typeof updater === "function" ? updater(currentState) : updater;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));

        // Dispatch event so the current tab's Timer listener updates immediately
        window.dispatchEvent(new Event("storage"));
    };

    const handleStart = () => {
        updateState((prev) => {
            if (prev.running) return prev;
            return {
                ...prev,
                running: true,
                endTime: Date.now() + prev.pausedRemaining,
            };
        });
    };

    const handlePause = () => {
        updateState((prev) => {
            if (!prev.running || !prev.endTime) return prev;
            const remaining = Math.max(0, prev.endTime - Date.now());
            return {
                ...prev,
                running: false,
                endTime: null,
                pausedRemaining: remaining,
            };
        });
    };

    const handleResume = () => {
        handleStart(); // Resume behaves identically to start when paused
    };

    const handleReset = () => {
        updateState({
            running: false,
            durationMs: DEFAULT_HOURS * 60 * 60 * 1000,
            endTime: null,
            pausedRemaining: DEFAULT_HOURS * 60 * 60 * 1000,
        });
    };

    const handleAdjustTime = (minutes) => {
        updateState((prev) => {
            const msToAdd = minutes * 60 * 1000;
            if (prev.running && prev.endTime) {
                const newEndTime = Math.max(Date.now(), prev.endTime + msToAdd);
                return { ...prev, endTime: newEndTime };
            } else {
                const newRemaining = Math.max(0, prev.pausedRemaining + msToAdd);
                return { ...prev, pausedRemaining: newRemaining };
            }
        });
    };

    const handleApplyDuration = () => {
        const hours = parseFloat(hoursInput);
        if (isNaN(hours) || hours <= 0) return;

        const durationMs = hours * 60 * 60 * 1000;
        updateState({
            running: false,
            durationMs,
            endTime: null,
            pausedRemaining: durationMs,
        });
        setHoursInput("");
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => { });
        } else {
            document.exitFullscreen().catch(() => { });
        }
    };

    return (
        <>
            <div className="admin-grid">
                <button onClick={handleStart}>Start</button>
                <button className="secondary" onClick={handlePause}>Pause</button>
                <button className="secondary" onClick={handleResume}>Resume</button>

                <button className="danger" onClick={handleReset}>Reset</button>
                <button onClick={() => handleAdjustTime(1)}>+1 min</button>
                <button onClick={() => handleAdjustTime(-1)}>-1 min</button>

                <button onClick={() => handleAdjustTime(5)}>+5 min</button>
                <button onClick={() => handleAdjustTime(-5)}>-5 min</button>
                <button onClick={toggleFullscreen}>Fullscreen</button>
            </div>

            <div className="duration-row">
                <input
                    type="number"
                    value={hoursInput}
                    onChange={(e) => setHoursInput(e.target.value)}
                    placeholder="Duration in hours (e.g. 30 or 36)"
                />
                <button onClick={handleApplyDuration}>Apply</button>
            </div>
        </>
    );
}