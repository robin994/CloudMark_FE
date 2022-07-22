import React,{useState,useEffect} from "react"

import axios from "axios";
import _ from "lodash";


const pageSize = 10;
export default function Pagination() {

  const[posts,setposts] = useState()
  const[paginatedPosts,setpaginatedPosts] = useState()
  const [currentPage,setcurrentPage] = useState(1)

  useEffect(()=>{
    axios.get('https://jsonplaceholder.typicode.com/todos')
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
   <div>
   <div className="mytop">
    <input className="form-control" placeholder="search"></input>
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
              <th>Email</th>
              <th>Contratto</th>
              <th>Assunzione</th>
              <th>Commessa</th>
            </tr>
          </thead>
          <tbody>
            {
              paginatedPosts.map((post,index)=>(
                <tr key={index}>
                  <td>{post.id}</td>
                  <td>{post.userId}</td>
                  <td>{post.title}</td>
                  <td>
                    <p className={post.completed ? "btn btn-success" :"btn btn-danger"}>
                      {post.completed ? "completed":"pending"}
                    </p>
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

 
   </>
  );
}


