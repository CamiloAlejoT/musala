export enum DroneWeight {
    LIGHT = "Lightweight",
    MIDDLE = "Middleweight",
    CRUISER = "Cruiserweight",
    HEAVY = "Heavyweight"
}

export enum DroneState {
    IDLE = "IDLE",
    LOADING = "LOADING",
    LOADED = "LOADED",
    DELIVERING = "DELIVERING",
    DELIVERED = "DELIVERED",
    RETURNING = "RETURNING"
}


export const WEIGHTLIMIT = 500
export const BATTERYCAPACITY = 100




export const EMPTYFIELDS = "Empty fields are not alowed"
export const DRONENOTFOUND = "Not found drone to update"
export const SERIALNUMBEREXIST = "Serial Number already exist"
export const SERIALNUMBERLONGER = "Serial Number can not be longet than 100"
export const WEIGHTLIMITBIGGER = "Weight limit is bigger than enable (500gr max)."
export const BATTERYCAPACITYBIGGER = "Battery capacity could not be bigger than 100%."
export const DRONEESTATEINCORRECT = "Drone state could not be set (IDLE, LOADING, LOADED, DELIVERING, DELIVERED, RETURNING)."
export const DRONEMODELINCORRECT = "Drone model could not be set (Lightweight, Middleweight, Cruiserweight, Heavyweight)"


export const DRONEENTITY = "drone_entity"
