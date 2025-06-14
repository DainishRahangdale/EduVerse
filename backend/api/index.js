const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const Teacher = require('../routes/teacher')
const Student = require('../routes/student');
const cookieParser = require('cookie-parser');
const Logout = require('../routes/logout');
const Auth = require('../routes/Auth');
const Payment = require('../routes/payment');

const app = express();
dotenv.config();


app.use(cors(
   { origin:true,
    credentials: true,
   }
));
app.use(express.json());
app.use(cookieParser())



app.use('/teacher',Teacher);
app.use('/student', Student);
app.use('/logout', Logout);
app.use('/auth', Auth);
app.use('/payment', Payment);


app.get('/', (req, res)=>{
    res.send('<p>this is server</p>')
});
app.post('/', (req, res)=>{
    res.send('<p>this is server</p>')
});


app.use((req, res) => {
    res.status(404).send({message:'404 Not Found correct your path'});
});

app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${(process.env.PORT)}`);  
})