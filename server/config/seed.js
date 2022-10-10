// const {Perfume} = require('../models')

// const seedData = async () => {
//     try {
//         const response = await fetch('https://my-perfumes-api.herokuapp.com/perfumes');
//         let perfumeslist = await response.json();
//         perfumesList = perfumesList.data
//         console.log('hello', response);

//         const addPerfume = await Perfume.insertMany(perfumesList);

//         console.log(addPerfume)

//     } catch (err) {
//         console.log(err);
//     }
// }

// seedData();