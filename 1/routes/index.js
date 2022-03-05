const { Router } = require("express")
const router = Router()
const dotenv = require('dotenv');
dotenv.config();

const stripe = require('stripe')(process.env.key)

router.get('/', (req, res)=>{
    res.render('index')
})
router.post('/checkout', async (req,res)=>{
    //console.log(req.body)
    const customer = await stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
    //console.log(customer)
    const charge = await stripe.charges.create({
        amount: 50000,
        currency: 'usd',
        customer: customer.id,
        description: 'My First Test Charge (created for API docs)',
    });
    //console.log(customer)

    //console.log('\n')
    //console.log(charge)

    res.render('download')
})
//tok_1Ka4lZEYF0cPTFO9J3HZAIUH
//tok_1Ka4mzEYF0cPTFO9jqVOEwmJ
module.exports = router