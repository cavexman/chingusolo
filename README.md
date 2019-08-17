# chingusolo
This project is an attempt to fulfill the tier 3 pre-requisite solo project for Chingu's Voyage 11.
see live site at https://notesolo-cave.firebaseapp.com/

To build, use npm run build.

If you have a firebase account you can edit the firebaseConfig in App.js with your credentials and then: npm run deploy.

This branch is organized for a firebase deploy, where we won't have our own server implementation, but let firebase be the host. If we need server side code we will use firebase Functions.
All the interesting code is in the client directory.
Data is stored using firestore.
Auth is handled by firebase auth.
Data is stored per user, tied to the uid from the auth token.
Currently only accepting google user login to keep the ui clean and simple, but we can turn on a variety of auth types.
