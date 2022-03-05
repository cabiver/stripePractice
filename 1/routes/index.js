const { Router } = require("express")
const router = Router()
const dotenv = require('dotenv');
dotenv.config();

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

router.get('/', (req, res)=>{
    res.render('index')
})
router.post('/checkout', async (req,res)=>{
    //console.log(req.body)
    const customer = await stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
    const charge = await stripe.charges.create({
        amount: 50000,
        currency: 'usd',
        customer: customer.id,
        description: 'My First Test Charge (created for API docs)',
    });
    res.render('download')
})
module.exports = router