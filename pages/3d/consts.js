
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
        min: -2,
        max: 2
    },
    z: {
        min: -3,
        max: 3
    }
}

export const FUNCTIONS = {
    x: "t^3 - 3*t",
    y: "t^4 - 4*t^2",
    z: "(t^5 - 10*t)/5"
}