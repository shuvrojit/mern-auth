# Introduction
This project is developed with Node(Express), mongodb(mongoose) and docker container.

## user routes
`GET {baseurl}/users/signup`
`GET {baseurl}/users/login`
`GET {baseurl}/users/logout`

#### signup, login will fill the cookie with jwtToken
#### logout will clear the cookie with jwtToken
