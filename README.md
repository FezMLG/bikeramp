# Trips

## Create Trip

This endpoint logs the trip and automatically calculates the distance between start and destination addresses.

### HTTP Request

`POST http://example.com/api/trips`

[Query Parameters](https://elpassion.notion.site/df486f89e08b4452b9ab1f3861f850d0)

# Stats

## Get Weekly Stats

### HTTP Request

`GET http://example.com/api/stats/weekly`

### Response

```json
{
  "total_distance": "40km",
  "total_price": "49.75PLN"
}
```

This endpoint retrieves how many kilometers did the courier ride during current week and how much money he received for the rides.

## Get Monthly Stats

### HTTP Request

`GET http://example.com/api/stats/monthly`

### Response

```json
[
  {
    "day": "July, 4th",
    "total_distance": "12km",
    "avg_ride": "4km",
    "avg_price": "22.75PLN"
  },
  {
    "day": "July, 5th",
    "total_distance": "3km",
    "avg_ride": "3km",
    "avg_price": "15.50PLN"
  }
]
```

This endpoint retrieves a summary of ride distances from current month, grouped by day. The
summary should include sum of all rides distances from given day, average
ride distance and average price for the ride.

## Running API

You must have a PostgreSQL database to access the API. You can use the one provided in the `docker-compose.yml` file. Be sure to create and fill in the `.env` and `docker.env` files based on the example files `(*.sample)`.

To run containers use:

```
$ docker-compose up -d
```

To run API in production mode use:

```
$ npm run build
```

```
$ npm run start:prod
```

To run API in development mode use:

```
$ npm run start:dev
```

## Google Maps Api Key

To obtain Google maps api key i will recommend you this docs from google: [Google Maps API Set Up](https://developers.google.com/maps/documentation/javascript/cloud-setup)

## Interactive Docs

To try interactive documentation go to:

```

{your_ip_address}:{your_port}/api

```

```

```
