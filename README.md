automerge-test

TODO:

- on client1 create document
- save document localy
- publish document so server
 ___
- on server init document
- on server wait for changes
 ___
- on client2 open document
- on client2 init document
- from server get current document
- merge current document into - local document
- save document localy
- change document
- get changes
- publish changes to server
 ___
- get changes from client2
- apply changes to local document
- publish changes to client 1
 ___
- on client1 get changes from - server
- apply changes
