import { useState, useCallback, useEffect, useRef } from "react";

function App() {

  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [specialCharAllowed, setSpecialCharAllowed] = useState(false)
  const [password,setPassword] = useState("")
  const passwordRef = useRef(null)

  const setPasswordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  
    if(numberAllowed) str += "1234567890"
  
    if(specialCharAllowed) str += "!@#$%^&*()~"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }

    setPassword(pass);

  },[length,numberAllowed,specialCharAllowed,setPassword])

  const CopyToClipBoard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(() => {
    setPasswordGenerator()
  },[length,numberAllowed,specialCharAllowed,setPasswordGenerator])


  return (
    <div className="w-full bg-gray-800 max-w-md mx-auto shadow-md-rounded-lg px-4 py-3 my-8 ">
      <h1 className="text-center text-white text-2xl">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" placeholder="Password" className="outline-none w-full py-1 px-3" value={password} readOnly ref={passwordRef}></input>
        <button className=" bg-blue-700 px-4" onClick={CopyToClipBoard}>Copy</button>
      </div>

      <div className="flex  text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
            <input type="range" min="{6}" max="{100}" value={length} className="cursor-pointer" onChange={(e) => setLength(e.target.value)}></input>
            <label>Length:{length}</label>
        </div>
        <div className="flex items-center gap-x-1">
        <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
              setNumberAllowed((prev) => !prev);
          }}
      />
        <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={specialCharAllowed}
              id="characterInput"
              onChange={() => {
                setSpecialCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
      </div>
    </div>
  );
}

export default App;
