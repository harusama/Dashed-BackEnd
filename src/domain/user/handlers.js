function createUser({ models, params }) {
    const { User } = models;
    const { newUser } = params;
    console.log('newUser', newUser);
    return 'Ok';
    //return User.createOne({ attributes: newUser.value});
};

module.exports = {
    createUser
};


// app.get('/user/:email', (req, res) => {
//     const email = req.params.email;

//     if (email == undefined) {
//         res.send(400);
//     } else {
//         User.query().where('email', email).then(user => {
//             console.log('Succes:', user);
//             res.send({
//                 data: user
//             });
//         }).catch(error => {
//             console.log('Error:', error);
//             res.send(404);
//         });
//     }
// });

// app.post('/user', (req, res) => {
//     const first_name = req.body.firstName;
//     const email = req.body.email;

//     if (first_name == undefined || email == undefined) {
//         res.send(400);
//     } else {
//         User.query().insert({ first_name, email}).then(data => {
//             console.log('Succes:', data);
//             res.send(201);
//         }).catch(error => {
//             console.log('Error:', error);
//             res.send(400);
//         });
//     }
// });