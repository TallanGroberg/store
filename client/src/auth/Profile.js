import React, {useState, useEffect} from 'react';
import {withstoreCrud} from '../provider/ProductProvider'
import {withAuth,bearerAxios} from '../provider/AuthProvider'
const Profile = (props) => {
  const [toggle, setToggle] = useState(false)
  const [yourStuff, setYourStuff] = useState([])
  const [user, setUser] = useState(JSON.parse(props.user).user)
    const {_id} = user
      console.log(toggle)
  
      useEffect(()  => {
        bearerAxios.get(`/api/product/user/${user._id}`)
        .then( res => {
          setYourStuff(res.data)
        })
      }, [])

        const toggler = () => {
          setToggle(prev => (!prev))
        }

         const deleteStuff = async(_id) => {

          const filterArray = yourStuff.filter( thing => {
            return thing._id !== _id
          })
          
          await setYourStuff( prev => (filterArray))

          props.deleteProduct(_id)
        }
        


  


  console.log('props profiles',props)

  //platform for users to 
  //edit products,
  //delete products,
  //create products,
  //display only there products. 
  // ability to change there own profiles 
  return (
    <div>
      {yourStuff.map( s => {
        return <>
                  <h1>{s.title}</h1>
                    <p>{s.description}</p>
                    <p>{s.price}</p>
                      <button onClick={() => deleteStuff(s._id)}>Delete</button>
              </>
      })}
    </div>
  );
};

export default withAuth(withstoreCrud(Profile));