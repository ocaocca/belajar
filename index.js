//dependencies
const express = require('express');
const bodyParser = require('body-parser');
//dependencies documentation
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


//Import data model
const {sequelize, userModel} = require ('./config/database')

//setting server
const PORT = 3000;
const app = express();
//deklarasi form urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
 
// parse application/json
app.use(bodyParser.json())

//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//bikin route
app.get('/users', async (req, res) => {
    const getUsers = await userModel.findAll();

    if(!getUsers) {
        res.send({
            status: 400,
            error: true,
            data: []
        })
    }else{
        res.send({
            status: 200,
            error: null,
            data: getUsers
        })
    }
    
});

app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const getUsers = await userModel.findOne({where: { id: id }});

    if(!getUsers) {
        res.send({
            status: 400,
            error: true,
            data: []
        })
    }else{
        res.send({
            status: 200,
            error: null,
            data: getUsers
        })
    }
    
});

app.post('/register', async (req, res) => {
    const {name, kelas} = req.body;
    const regisUser = await userModel.create({
        name,
        kelas
    })
    res.send({
        status: 200,
        error: null,
        data: regisUser
    })
});

app.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { name, kelas } = req.body;
    const findUser = await userModel.findOne({ where: { id: id }})
    //updating name and kelas
    const updateUser = await findUser.update({
        name: name,
        kelas: kelas,
    })
    //findUser.name = name
    //findUser.kelas = kelas
    await updateUser.save()
    res.send({
        status: 200, 
        error: null,
        data: updateUser
    })

});

app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const findUser = await userModel.findOne({ where: { id : id }});
    const deleteUser = await findUser.destroy();

    res.send({
        status: 200,
        error: null,
        message: "Data Deleted"
    })
});


//listen port
app.listen(PORT, () => {
    console.log(`Express is running on port http://localhost:${PORT}`);
});