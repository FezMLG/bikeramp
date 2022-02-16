# Trips

## Create Trip

This endpoint logs the trip and automatically calculates the distance between start and destination addresses.

### HTTP Request

`POST http://example.com/api/trips`

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
