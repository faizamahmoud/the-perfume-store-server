setup:

$ npx create-react-app client
$ cd client
$ npm start
$ npm install sass
$ npm i react-router-dom
$ npm i @material-ui/core
$ npm i @mui/icons-material

-> App
  -> Header
  -> Main |state: people|
    -> Routes
      -> Route |path: "/"|
        -> Index |props: people, createPeople|
      -> Route |path="/people/:id|
        -> Show |props: people, updatePeople, deletePeople|
         <Route path="/" element={<People />} />
        <Route path="/people/:id" element={<Show />} />