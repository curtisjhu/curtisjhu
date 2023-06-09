
export const SETTINGS = {
    segments: 128, // number of sample points between endpoints
    radiusSegments: 8,
    tubeRadius: 0.12,
    t: {
        min: -2,
        max: 2
    }
}

export const WINDOW = {
    x: {
        min: -3,
        max: 3
    },
    y: {
        min: -3,
        max: 3
    },
    z: {
        min: -3,
        max: 3
    }
}

export const FUNCTIONS = {
    x: "cos(t)",
    y: "sin(t)",
    z: "0"
}