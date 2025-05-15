var validator = require("email-validator");
const express = require('express');
const supabaseClient = require('@supabase/supabase-js');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();


const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/customers', async (req,res) => {
    console.log ('Attempting to GET all clients');

    const { data, error } = await supabase.from('customers').select();

    if (error) {
        console.log('Error');
        res.send(error);
    } else {
        res.send(data);
    }
});

app.post('/customers', async (req, res) => {
  console.log('Adding Customer');

  
  console.log(req.body);
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var question = req.body.question;

    if (!validator.validate(email)) {
    console.log(`Email ${email} is Invalid`);
    res.statusCode = 400;
    res.header('Content-Type', 'application/json');
    var errorJson = {
      message: `${email} is not a Valid email`,
    };
    res.send(JSON.stringify(errorJson));
    return;
  }

  const { data, error } = await supabase
    .from('customers')
    .insert({
      cust_fname: firstName,
      cust_lname: lastName,
      cust_email: email,
      cust_message: question,
    })
    .select();

  if (error) {
    console.log('Error');
    res.send(error);
  } else {
    res.send(data);
  }
});

app.listen(port, () => {
  console.log('APP IS ALIVEEE', port);
});