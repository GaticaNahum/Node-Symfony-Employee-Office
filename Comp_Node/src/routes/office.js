const express = require('express');
const pool = require('../database');
const router = express.Router();

router.get('/', async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let listOffices = await pool.query('SELECT * FROM office');
    res.json({
        status: 200,
        message: "Se ha listado correctamente",
        listOffices: listOffices
    });
});

router.get('/:id', async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { id } = req.params;
    let office = await pool.query('Select * from office where id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha obtenido correctamente",
        office: office
    });
});


router.post('/create', async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { officeCode, address } = req.body;

    const office = {
        officeCode,
        address
    };

    await pool.query('INSERT INTO office set ?', [office]);
    res.json({
        status: 200,
        message: "Se ha registrado correctamente",
        office: office
    });
});

router.post('/update/:id', async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { id } = req.params;
    const { officeCode, address } = req.body;

    const office = { officeCode, address };

    await pool.query('UPDATE office set ? where id = ?', [office, id]);

    res.json({
        status: 200,
        message: "Se ha actualizado correctamente",
        office: office
    });
});

router.post('/delete/:id', async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { id } = req.params;

    await pool.query('delete from office where id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha eliminado correctamente"
    });
});




module.exports = router;