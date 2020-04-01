# Aviasales Test Task

A simple flights search web-application.

Task repository: \
https://github.com/KosyanMedia/test-tasks/tree/master/aviasales_frontend

# To run an application:

```
$ git clone git@github.com:ihor-devingfe/aviasales-test.git
$ cd aviasales-test
$ npm i
$ npm start
```
Open http://localhost:4200/

# Functionality

The application receives a list of airline tickets on the server using \
long polling technique. \
After that it filters and sorts the flight according to the selected settings \
and displays the first 5 tickets from the list.

# Summary

During development, I strengthened my knowledge of components, services, \
custom pipes and modules. \
But most importantly - RxJS observables, operators and subjects.\
It was the hardest to implement repeating server requests, \
combine filters and sorting parameters with flights list into one stream.

I understand that perhaps some of the approaches I used are too complex for \
such a small application. But, I think that the use of such solutions \
will positively affect the future development of larger projects.

If you have any comments or suggestions, I would be happy to discuss them.
