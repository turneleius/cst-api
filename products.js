const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');


const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

router.get('/', async (req, res) => {
    const { data, error } = await supabase
        .from('products')
        .select()
    res.send({ data });
});

router.get('/:id', async (req, res) => {
    const { data, error } = await supabase
        .from('products')
        .select()
        .is('id', req.params.id)
    res.send({ data });
});

router.post('/', async (req, res) => {
    const { error } = await supabase
        .from('products')
        .insert({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
        })
    if (error) {
        res.send({ error });
    }
    res.send({ msg: "created!!" });
});

router.put('/:id', async (req, res) => {
    const { error } = await supabase
        .from('products')
        .update({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        })
        .eq('id', req.params.id)
    if (error) {
        res.send({ error });
    }
    res.send({ msg: "updated!!" });
});

router.delete('/:id', async (req, res) => {
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', req.params.id)
    if (error) {
        res.send(error);
    }
    res.send({ msg: "deleted!!" })

});

module.exports = router;