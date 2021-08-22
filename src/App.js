import {useState,useEffect} from 'react';
import './App.css';
import {ImageList,ImageListItem} from '@material-ui/core'
import axios from 'axios'
import Loader from "react-loader-spinner";


function App() {
    const [metrop,setMetr]=useState([])
   const [isLoading,setLoading]=useState(true)
   const [isLoading1,setLoading1]=useState(true)
  //  const[totalData,setData]=useState([])
   const [outre,setOutre]=useState([])
   const [searchVille, setSearchVille] = useState("");
    const [searched,setSearched]=useState([])
    const [searched1,setSearched1]=useState([])
    const [found,setFound]=useState(false)

  
   useEffect(() => {
  
     axios.get(`http://localhost:4000/getData`)
    .then(res => {
      
      setMetr(res.data)
       setSearched(res.data)
  
      setLoading(false)

    }
   )
  
   .catch((err)=>console.log(err))
  axios.get('http://localhost:4000/outre')
  .then(res=>
    {setOutre(res.data)
    setSearched1(res.data)
    setLoading1(false)}
       )
  .catch(e=>console.log(e))
   
  },[])
  
  const handleChange = event => {
    setSearchVille(event.target.value);
    
    console.log(searchVille.trim())
    const results = metrop.filter(item =>
      {
         return item.nomCommune.toLowerCase().includes(event.target.value)||item.codePostal.includes(searchVille.trim())
      }
    );
    const results1 = outre.filter(item =>
      {
        return item.nomCommune.toLowerCase().includes(event.target.value)||item.codePostal.includes(searchVille.trim())
      }
    );
    setSearched(results);
     setSearched1(results1)
    setFound(true)
    // setSearched(results)
    // setSearched1(results1)
    
   };


  return (
    <div className="Container">
      <div  style={{backgroundColor:"#d2e5e9",flexDirection:"row",display:"flex",margin:30,borderRadius:10,padding:15,height:50}}>
        <p style={{alignSelf:'center',color:"black",fontSize:18,fontWeight:"bold"}}>Je recherche...</p>
        <input onSubmit={handleChange} type='text' id="search" placeholder="...une ville, un code postal" value={searchVille}
        onChange={handleChange} style={{borderColor:'transparent',width:"88%",borderRadius:10,marginLeft:30,fontSize:20,backgroundColor:'#f0fcff',fontWeight:'bold',paddingLeft:10}}/>
      </div>
      <div style={{flexDirection:"row",display:"flex",padding:20}} >
      <div style={{textAlign:"center",backgroundColor:"#d2e5e9",borderRadius:10,padding:10,margin:10,width:"50%"}} >
        <h2 style={{fontSize:20}}>Villes de métropole</h2>
     { isLoading?  <Loader
     style={{marginTop:'30'}}
        type="Oval"
        color="coral"
        height={30}
        width={30}
      /> : null
      
      }
       {found&&!isLoading&&searched.length===0?
       <div style={{backgroundColor:"#c47779",height:40,textAlign:"center",display:'flex',alignItems: 'center',margin:20,padding:10}}><p style={{color:'white',fontWeight:'bold',fontSize:15}}>Aucune ville correspondant au texte saisi</p></div>
       :null
      //  <div style={{backgroundColor:"#72cb79",height:40,textAlign:"center",display:'flex',alignItems: 'center',margin:10,padding:10,width:"92%"}}><p style={{color:'white',fontWeight:'bold',fontSize:15}}>{searched.length} villes correspondant au texte saisi</p></div>

       }
      
      {found&&!isLoading&&!searched.length==0?
       
       <div className="CitiesFound" style={{backgroundColor:"#72cb79",height:40,textAlign:"center",display:'flex',alignItems: 'center',margin:10,padding:10}}><p style={{color:'white',fontWeight:'bold',fontSize:15}}>{searched.length} villes correspondant au texte saisi</p></div>
       :null
       }
      <ImageList cols={2} xm >
       {searched.slice(0,100).map((item)=>(
         <ImageListItem  key={item.id} cols={1} style={{height:'auto'}} >
           <div className="item" style={{justifyContent:'space-between',backgroundColor:'#5b6770',letterSpacing:1.5,width:"90%",margin:10}}>
       <p className="textItem" style={{color:'white',fontWeight:'bold'}}>{item.nomCommune}</p>
       <p style={{color:'#818791',alignSelf:'center',paddingRight:10}}>{item.codePostal}</p>
       
      </div>
         </ImageListItem>
       ))
       }

      </ImageList>
      </div>
      <div style={{textAlign:"center",backgroundColor:"#d2e5e9",borderRadius:10,padding:10,margin:10,width:"50%"}} >
      <h2 style={{fontSize:20}}>Villes d'outre-mer</h2>

       { isLoading1? <Loader
     style={{marginTop:'30'}}
        type="Oval"
        color="coral"
        height={30}
        width={30}
      />  : null}
       {found&&!isLoading1&&searched1.length===0?
       <div style={{backgroundColor:"#c47779",height:40,textAlign:"center",display:'flex',alignItems: 'center',margin:20,padding:10}}><p style={{color:'white',fontWeight:'bold',fontSize:15}}>Aucune ville correspondant au texte saisi</p></div>
       :null
      //  <div style={{backgroundColor:"#72cb79",height:40,textAlign:"center",display:'flex',alignItems: 'center',margin:10,padding:10,width:"92%"}}><p style={{color:'white',fontWeight:'bold',fontSize:15}}>{searched.length} villes correspondant au texte saisi</p></div>

       }
      
      {found&&!isLoading1&&!searched1.length==0?
       
       <div  className="CitiesFound" style={{backgroundColor:"#72cb79",height:40,textAlign:"center",display:'flex',alignItems: 'center',margin:10,padding:10}}><p style={{color:'white',fontWeight:'bold',fontSize:15}}>{searched1.length} villes correspondant au texte saisi</p></div>
       :null
       }
      <ImageList cols={2} >
       {searched1.slice(0,100).map((item)=>(
        <ImageListItem key={item.id} cols={1} style={{height:'auto'}} >
           <div className="item" style={{justifyContent:'space-between',backgroundColor:'#5b6770',letterSpacing:1.5,width:"90%",margin:10}}>
       <p className="textItem" style={{color:'white',fontWeight:'bold',padding:5}}>{item.nomCommune}</p>
       <p style={{color:'#818791',alignSelf:'center',paddingRight:10}}>{item.codePostal}</p>
       
      </div>
        </ImageListItem>
       ))
       }
      </ImageList>
      </div>
      </div>
     
    </div>
  );
}

export default App;
