const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const Teacher = require('./routes/teacher')
const Student = require('./routes/student');

const app = express();
dotenv.config();


app.use(cors(
   { origin:true,
    credentials: true,
   }
));
app.use(express.json());



app.use('/teacher',Teacher);
app.use('/student', Student);


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