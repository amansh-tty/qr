import { createContext,useState } from "react";
import InputForm from "./components/InputForm";
import QrCode from "./components/QrCode";
import axios from 'axios'
export const InputContext=createContext()

function App() {
  const [inputValue,setInputValue]=useState({
    url:'',
    color:''
  })
  const [response,setResponse]=useState('')
  const [error,setError] = useState(null)
  const [loading,setLoading]=useState(false)
 
  
  const config={
    headers:{Authorization:'Bearer ffbfb870-91ef-11ee-a9e2-57b352664cea'}
  }
  const bodyParameters = {
  "backgroundColor": inputValue.color,
  "qrCategory": "url",
  "text":inputValue.url
}
const getQRCode = async () =>{
  try{ 
    setLoading(true)
    const res = await axios.post('https://qrtiger.com/api/qr/static',bodyParameters,config)
    setResponse(res.data.url)
  }catch(err){
    setError(err)
  }finally{
    setLoading(false)
  }
}
const value={
  inputValue,
  setInputValue,
  getQRCode,
  response,
  loading,
  error
}
  return (
    <div class="bg-gradient-to-r from-cyan-500 to-blue-500 h-screen pt-36" px-32>
    
    <div className="container mx-auto max-w-4xl bg-white rounded-md shadow">
    {/* <div className="md:grid md:grid-cols-3"> */}
    <div class="md:grid md:grid-cols-3 gap-4">
    <InputContext.Provider value={value}>
    <InputForm />
    <QrCode />
    </InputContext.Provider>
  
</div>


    </div>
    </div>
    // </div>
  );
}

export default App;
