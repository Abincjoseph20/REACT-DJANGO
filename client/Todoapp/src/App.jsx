import { useState,useEffect } from 'react'
import './App.css'

function App() {
  const [books, setBook] = useState([]) // for listing the books

  const [title,setTitle]= useState("")// for creating title and year
  const [year,setYear]= useState(0)

  const [newTitle,SetNewTitle] = useState('');// for updating

// for api calls  
useEffect(()=>{
  fetchBooK();
},[]);

// CRUD

//for fetch the and list the data   [R - CRUD   ]
const fetchBooK = async ()=> {
  try{
    const response = await fetch('http://127.0.0.1:8000/get_book/');
    const data = await response.json();
    console.log(data);
    setBook(data);
  }catch(error){
    console.log(error)
  }
};



//for create data   [C - CRUD   ]
const addBook = async ()=>{
const bookData = {
  title,
  relesed_year:year  // python is delare the varibale name is 'relesed_year' but reat is declare tha same variable is 'year'
  };
try{
  const response = await fetch('http://127.0.0.1:8000/create_book/',{
    method:"POST",
    headers:{
      'Content-Type':'application/json',
    },
    body:JSON.stringify(bookData),
  });
  const data = await response.json();
  setBook((previous)=>[...previous,data]);

  console.log(data)
}catch{
  console.log(error);
}
};


//for update data [UD - CRUD   ]

const UpdateTitle = async (pk, relesed_year) => {
  const updateData = {
    title: newTitle,
    relesed_year: relesed_year,
  };

  try {
    const response = await fetch(`http://127.0.0.1:8000/get_book/${pk}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    const data = await response.json();
    setBook((prev) => prev.map((b) =>{
      if (b.id===pk){
        return data;
      }else{
        return b;
      }
    }));
  } catch (error) {
    console.log('Update Error:', error);
  }
};


const deleteTilet = async (pk)=>{
  try{
    const response = await fetch(`http://127.0.0.1:8000/get_book/${pk}/`,{
      method:'DELETE',
    })
    setBook((previ) => previ.filter((b)=>b.id !== pk ));
  }catch (error){
    console.log(error);
  }
};


  return (
    <>

  <div className="book-form">
    <input 
      type="text" 
      placeholder='Book title' 
      onChange={(e) => setTitle(e.target.value)}
    />
    <input 
      type="number" 
      placeholder='Release year'
      onChange={(e) => setYear(e.target.value)}
    />
    <button onClick={addBook}>Add Book</button>
  </div>

  <div className="book-list">
    {books.map((b) => (
      <div className="book-card" key={b.id}>
        <h3>Title: {b.title} - Year: {b.relesed_year}</h3>
        <div className="book-actions">
          <input 
            type="text"
            placeholder='New title'
            onChange={(e) => SetNewTitle(e.target.value)}
          />
          <button onClick={() => UpdateTitle(b.id, b.relesed_year)}>Update</button>
          <button onClick={() => deleteTilet(b.id)}>Delete</button>
        </div>
      </div>
    ))}
</div>


    </>
  )
}

export default App
