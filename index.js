import bodyParser from "body-parser";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
mongoose.connect('mongodb://127.0.0.1:27017/tdb').then(console.log("connected")).catch((err)=>console.log("not connected"));
const itemsSchema= new mongoose.Schema({
  name: String
});
const Item = mongoose.model("Item", itemsSchema);
// const item1= new Item({
//   name:"hi"
// });
// const item2= new Item({
//   name:"hello"
// });
// const item3= new Item({
//   name:"bye"
// });
// const dArray=[item1,item2,item3];


const _dirname= dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
app.use(express.static(_dirname+'/public'))
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));

//let todos = [];

app.get('/', (req, res) => {
   Item.find({}).then((todos)=>
  {
  //   if(todos.length===0)
  //   {
  //     Item.insertMany(dArray).then((result) => {
  //       console.log(`Successfully inserted ${result.length} items.`);
  //     })
  //     .catch((error) => {
  //       console.error('Error inserting items:', error);
  //     });
  //     res.redirect('/');
  //   }
  //   else{
      res.render('index', { todos});
    //}
    
  });
  
 });

app.post('/add', (req, res) => {
  const newTodo = req.body.todo1;
  const item= new Item({
    name: newTodo
  });
  item.save();

   res.redirect('/');
});

app.post('/delete',(req,res)=>{
  const checkedId= req.body.checked;
  Item.findOneAndRemove(checkedId).then(console.log("deleted")).catch((error)=>{
    console.error("error deleting",error);
  })
  res.redirect('/');
})


app.listen(port,()=>
{
    console.log('running on port: ',port);
})