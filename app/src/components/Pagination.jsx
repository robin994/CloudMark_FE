import React,{useState,useEffect} from "react"

import axios from "axios";
import _ from "lodash";
import Card from 'react-bootstrap/Card';

import { Container } from 'react-bootstrap';


const pageSize = 20;
export default function Pagination() {


    const[value,setValue]=useState('');
   
    const[tableFilter,setTableFilter]=useState([]);

    const filterData = (e)=>{
        if(e.target.value !== ""){
            setValue(e.target.value);
            const filterTable = posts.filter(o=>Object.keys(o).some(k=>
            String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
            ));
            setTableFilter([...filterTable])
        }else{
            setValue(e.target.value);
            setposts([...posts])
        }
    }

  const[posts,setposts] = useState([])
  const[paginatedPosts,setpaginatedPosts] = useState()
  const [currentPage,setcurrentPage] = useState(1)

  useEffect(()=>{
    axios.get('https://jsonplaceholder.typicode.com/comments')
    .then(res=>{
      console.log(res.data)
      setposts(res.data);
      
      setpaginatedPosts(_(res.data).slice(0).take(pageSize).value());
    })
  },[]);



  const pageCount = posts? Math.ceil(posts.length/ pageSize) :0; // page count = 20 perchè fa 200:10=20

  if(pageCount ===1)return null;
  const pages  = _.range(1,pageCount+1)

  const pagination=(pageNo)=>{
    setcurrentPage(pageNo);
    const startIndex = (pageNo -1)* pageSize;
    const paginatedPosts = _(posts).slice(startIndex).take(pageSize).value();
    setpaginatedPosts(paginatedPosts);
  }


  return (
   <>


<Container>
      <Card>
        <Card.Body>
        <div>
   <div className="mytop">
    <input className="form-control" placeholder="search" value={value} onChange={filterData}></input>
    <div className="form-check">
  <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
  </div>
    </div>
    {
      !paginatedPosts ? ("No data found"):(
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Cognome</th>
             
           
            </tr>
          </thead>
          <tbody>
            {
                value.length > 0 ? tableFilter.map((post,ind)=>{
                    return(
                        <tr key={ind}>
                            <td>{post.postId}</td>
                            <td>{post.id}</td>
                            <td>{post.name}</td>
                           
                        </tr>
                    )
                })
                :
                paginatedPosts.map((post,index)=>(
                    <tr key={index}>
                      <td>{post.postId}</td>
                      <td>{post.id}</td>
                      <td>{post.name}</td>
                      <td>
                      
                      </td>
                      
                    </tr>
    
                  ))
            }
            
            
          </tbody>
        </table>
      )
    }

    <nav className = "d-flex justify-content-center">
      <ul className="pagination">
        {
          pages.map((page, i) =>(
            <li className={
              page === currentPage ? "page-item active" :"page-item"
            }>
              <p className="page-link"
            onClick={()=>pagination(page)}>{page}
            </p>
            </li>
          ))
        }
        
 
      </ul>
    </nav>
   </div>

        </Card.Body>
      </Card>
    </Container>
   
 
   </>
  );
}


