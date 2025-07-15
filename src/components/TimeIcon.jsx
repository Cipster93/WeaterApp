import React from "react";

const TimeIcon = ({ timeOfDay }) => {
    switch (timeOfDay) {
        case 'sunrise':
            return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="4" fill="#FFA500" />
                    <path d="M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 0l1.42-1.42M2 12h2m16 0h2" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" />
                    <path d="M8 20h8" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" />
                </svg>
            );
        case 'sunset':
            return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="4" fill="#FF6347" />
                    <path d="M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 0l1.42-1.42M2 12h2m16 0h2" stroke="#FF6347" strokeWidth="2" strokeLinecap="round" />
                    <path d="M8 20h8" stroke="#FF6347" strokeWidth="2" strokeLinecap="round" />
                </svg>
            );
        case 'day':
            return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="4" fill="#FFD700" />
                    <path d="M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 0l1.42-1.42M2 12h2m16 0h2" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
                </svg>
            );
        case 'night':
            return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#4169E1" />
                    <circle cx="17" cy="7" r="1" fill="#FFD700" />
                    <circle cx="19" cy="9" r="0.5" fill="#FFD700" />
                    <circle cx="15" cy="5" r="0.5" fill="#FFD700" />
                </svg>
            );
        default:
            return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="4" fill="#FFD700" />
                    <path d="M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 0l1.42-1.42M2 12h2m16 0h2" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
                </svg>
            );
    }
};

export default TimeIcon;