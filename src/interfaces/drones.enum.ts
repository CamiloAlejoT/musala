export enum DroneWeight {
  LIGHT = 'Lightweight',
  MIDDLE = 'Middleweight',
  CRUISER = 'Cruiserweight',
  HEAVY = 'Heavyweight',
}

export enum DroneState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  DELIVERING = 'DELIVERING',
  DELIVERED = 'DELIVERED',
  RETURNING = 'RETURNING',
}

export enum DispatchStatus {
  PENDING = 'Pending',
  INPROGRESS = 'In progress',
  DONE = 'Done',
}

export const WEIGHTLIMIT = 500;
export const BATTERYCAPACITY = 100;

export const EMPTYFIELDS = 'Empty fields are not alowed';
export const DRONENOTFOUND = 'Not found drone to update';
export const SERIALNUMBEREXIST = 'Serial Number already exist';
export const SERIALNUMBERLONGER = 'Serial Number can not be longet than 100';
export const WEIGHTLIMITBIGGER =
  'Weight limit is bigger than enable (500gr max).';
export const BATTERYCAPACITYBIGGER =
  'Battery capacity could not be bigger than 100%.';
export const DRONEESTATEINCORRECT =
  'Drone state could not be set (IDLE, LOADING, LOADED, DELIVERING, DELIVERED, RETURNING).';
export const DRONEMODELINCORRECT =
  'Drone model could not be set (Lightweight, Middleweight, Cruiserweight, Heavyweight)';
export const DRONEINUSE = "Can not update/Delete a drone that is asigned for a dispatch."

export const MEDICATIONNAMEREGEX = /^[A-Za-z0-9\-_]+$/;
export const MEDICATIONCODEREGEX = /^[A-Z0-9_]+$/;

export const NAMENOTALLOWED =
  'Medication name not allowed, allowed only letters, numbers, - and _';
export const CODENOTALLOWED =
  'Medication code not allowed, allowed only upper case letters, underscore and numbers';

export const DISPATCHWEIGHTERROR =
  'The weight for this dispatch is to big, please select another drone or remove some medicine';
export const DISPATCHWEIGHTBIGERTHANDRONE =
  "The dispatch's total weight is bigger than the selected drone can carry ";
export const DISPATCHDRONEBATTERYERROR =
  "The selected drone's baterry is under 25% please select another drone or recharge the drone";
export const DRONEALREADYUSED =
  'The selected dron for the dispatch is already in use';
export const DISPATCHESTATUSNOTVALID = "Dispatch estatus is not valid."
export const NOTGETBACKESTATUS = "Change Done estatus es not valid action"


export const DRONEENTITY = 'drone_entity';
export const MEDICATIONENTITY = "'medication_entity'";
