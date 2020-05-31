# Web Scraping restful API built with Node Express and jQuery

## Setup

Run `npm install` to install dependencies
Run `npm start` to start the server

Make GET request to the following API endpoints to see the response

### Total Confirmed Cases Worldwide

API endpoint: http://localhost:3000/totalcases

example response:

```json
{
    "confirmedCases": "6075786"
}
```

### Total Recovered Cases World wide

API endpoint: http://localhost:3000/recovered

example response:

```json
{
    "recoveredCases": "2571797"
}
```

### Confirmed Cases by Country

API endpoint: http://localhost:3000/cases

example response:

```json
[
    {
        "country": "United States",
        "cases": "1806332"
    },
    {
        "country": "Brazil",
        "cases": "499966"
    },
    {
        "country": "Russia",
        "cases": "405843"
    },
    .
    .
    .
]
```



