# Buddy Item Registry
[![Build Status](https://travis-ci.org/gobixm/buddy-itemregistry.svg?branch=master)](https://travis-ci.org/gobixm/buddy-itemregistry)

*Consumes auction data from kafka topic **auction-data***

Downloads item information from battle.net api and persist it in mongodb,
exposing some http api to fetch data.

### Configuration
[supported configuration formats](https://github.com/dominictarr/rc)
*Environment variables should be prefixed with* **buddy_itemregistry_** (case matters)

| Parameter        | Default           |
| ------------- |:-------------:|
|consulHost|localhost|
|consulPort|9500|
|consulId|buddy_itemregistry-0|
|hosting|https://localhost:8001|
|battleNetApiKey|<secret>|
|realms|howling-fjord|
|locale|ru_RU|
|kafkaBrokers|localhost:9092|
|mongoUrl|mongodb://localhost:27017/wowbuddy-items|

### Usage
npm start