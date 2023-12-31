## Introduction

There is a major new technology that is destined to be a disruptive force in the field of transportation: the drone. Just as the mobile phone allowed developing countries to leapfrog older technologies for personal communication, the drone has the potential to leapfrog traditional transportation infrastructure. Useful drone functions include delivery of small items that are (urgently) needed in locations with difficult access.

## Task description

We have a fleet of 10 drones. A drone is capable of carrying devices, other than cameras, and capable of delivering small loads. For our use case the load is medications.

A Drone has:

- serial number (100 characters max);
- model (Lightweight, Middleweight, Cruiserweight, Heavyweight);
- weight limit (500gr max);
- battery capacity (percentage);
- state (IDLE, LOADING, LOADED, DELIVERING, DELIVERED, RETURNING).

Each Medication has:

- name (allowed only letters, numbers, ‘-‘, ‘_’);
- weight;
- code (allowed only upper case letters, underscore and numbers);
- image (picture of the medication case).

Develop a service via REST API that allows clients to communicate with the drones (i.e. dispatch controller). The specific communicaiton with the drone is outside the scope of this task.

The service should allow:
- registering a drone;
- loading a drone with medication items;
- checking loaded medication items for a given drone;
- checking available drones for loading;
- check drone battery level for a given drone;

## Requirements
```bash
Functional requirements
- There is no need for UI;
- Prevent the drone from being loaded with more weight that it can carry;
- Prevent the drone from being in LOADING state if the battery level is below 25%;
- Introduce a periodic task to check drones battery levels and create history/audit event log for this.
```

```bash
Non-functional requirements
- Input/output data must be in JSON format;
- Your project must be buildable and runnable;
- Your project must have a README file with build/run/test instructions (use DB that can be run locally,
- e.g. in-memory, via container);
- Any data required by the application to run (e.g. reference tables, dummy data) must be preloaded in
- the database.
- JUnit tests are optional but advisable (if you have time);
- Advice: Show us how you work through your commit history.
```

## Solution 
- get all drones: [base URL]/drones/all
- get drone by serial number: [base URL]/drones/[serial Number]
- get drones by other fields: [base ULR]/drones/[ params ] 
    * params: model, state, weightLimit, batteryCapacity, weightLimitSorter and batteryCapacitySorter, the fileds weightLimitSorter and batteryCapacitySorter are booleans if false or not set the result will be bigget than, if true the results will be lower than. E.G:
    http://localhost:3000/drones/?batteryCapacity=60&batteryCapacitySorter=true all drones with battery less than 60%  or http://localhost:3000/drones/?model=Lightweight&state=LOADED all drones in estatus "LOADED" and model "Lightweight"
- create new drone: [base URL]/drones/create
- update drone: can not update a drone that have a dispatch in a state diffrent than DONE
- delte drone: can not delete a drone that have a dispatch in a state diffrent than DONE


- get all medication: [base URL]/medication/all
- Create medicine: [base URL]/medication/create, the image parameter is a string wit the URL 

- get all dispatches: [base URL]/dispatch/all
- get dispatch by id: [base URL]/dispatch/[ id ]
- get drone with a list of all medications in active dispatch: [base URL]/dispatch/droneDetail/[ id ] (drone id)
- update a dispatch: [base URL]/dispatch/[ id ]/update only can update the status, not medicines or asigned drone. estatus aviable are 'Pending', 'In progress' and'Done'. 
- create a dispatch:  [base URL]/dispatch/create recieve two fields, asignedDrone is a number the drone ID, and the second is a string with all the medications IDs separated by , E.X: "1,2,3" it indicates the dispatch is going to have the medications with id 1, 2 and 3


One last end point was added to the drone controler but is only to get the audit log for the periodic task
 [base URL]/drones/auditURL

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
