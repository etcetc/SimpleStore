# SimpleStore #

A super-simple, and by that I really do mean super simple way to persist a few values locally.

## Install ##

Using `npm`

```
npm install SimpleStore
```

## Usage ##

```
const SimpleStore = require('SimpleStore')
cont db = new SimpleStore('SomeScopeName')

db.set('string','This is a string')
db.set('int',44)
db.set('float',52.22)
db.set('obj',{a:10,b:20})
db.set('array',[1,2,3,4])

db.numItems()                     # returns 5
let mystring = db.get('string')   # returns 'this is a string'
let myint = db.get('int')         # returns 44
let myfloat = db.get('float')     # returns 52.22
let myobj = db.get('obj')         # returns {a:10,b:20}
let myarray = db.get('array')     # returns [1,2,3,4]

let notsaved = db.get('foo'       # returns undefined
let db.has('foo')                 # returns false
```

That's there is to it.  Like I said, super simple, dumb even.

This simple package was developed to allow simple scripts to have persistent state.   For example, a script that runs every minute and monitors something on a server, might then recognize that it needs to notify admins of the state (e.g. a connection to a database timed out).  It would then check in the next minute, and you might not want to keep notifying the admin each time.  So you keep track of the state and the notification status.  And if the state changes you might send a new notification, but if it stays the same, only send a notification if it has not been fixed within 10 minutes.
