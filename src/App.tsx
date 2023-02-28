import { useState } from 'react'
import './App.css'

function App() {
  const [roman, setRoman] = useState<string>('')
  const [normal, setNormal] = useState<number | undefined>()
  const [message, setMessage] = useState<string>('')


  //Helper function for changing the Roman number "string" to "normal" number
  const charToNumber = (i: string): number => {
    if( i === 'I' ) return 1
    if( i === 'V' ) return 5
    if( i === 'X' ) return 10
    if( i === 'L' ) return 50
    if( i === 'C' ) return 100
    if( i === 'D' ) return 500
    if( i === 'M' ) return 1000
    return -1
  }
  

  //The function that takes a one parameter string and converts it to "normal" number
  const romanToNumber = (roman: string): number => {
    //The result
    let result: number = 0
    //Counts for characters: D, L, V
    let dCount: number = 0
    let lCount: number = 0
    let vCount: number = 0



    //For loop to loop through string that is given as a parameter
    for (let i = 0; i < roman.length; i++) {

      //V, L, D Charactercs can only appear once in the string, increases count and uses it to detect the string
      if(charToNumber(roman.charAt(i)) === 5) vCount += 1
      if(charToNumber(roman.charAt(i)) === 50) lCount += 1
      if(charToNumber(roman.charAt(i)) === 500) dCount += 1


      //These functions are made for the valditation of the input
      //Checks inside the loop if some of the counts are too big and returns -3 that is used as error
      if( dCount > 1 || lCount > 1 || vCount > 1) return -3
      //First one checks if the char is a roman number
      if(charToNumber(roman.charAt(i)) === -1) return -1
      //This one checks if there are two many same characters same time
      if(roman.charAt(i) === roman.charAt(i+1) && roman.charAt(i) === roman.charAt(i+2) && roman.charAt(i) === roman.charAt(i+3)) return -2
      /*Checks if i+1 is valid and then checks if current number is smaller than next number if
       "true" reduces the number from result and if false adds it to the result*/
      if(i + 1 < roman.length && charToNumber(roman.charAt(i)) < charToNumber(roman.charAt(i+1))) {
        result -= charToNumber(roman.charAt(i))
      } else {
        result += charToNumber(roman.charAt(i))
      }
    }
    return result
  }
  //Handling the input
  const changeRoman = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoman(e.currentTarget.value)
  }
  //Handling submit and error messages
  const handleClick = () => {

    //These four if-statements are used for displaying the error
    if(romanToNumber(roman) === -1) {
      setMessage(`Your input ${roman} contains characters that are not roman numbers`)
      setRoman('')
      setNormal(undefined)
      return
    }
    if(romanToNumber(roman) === -2) {
      setMessage(`Your input ${roman} contains too many characters in a row`)
      setRoman('')
      setNormal(undefined)
      return
    }
    if(romanToNumber(roman) === -3) {
      setMessage(`Your input ${roman} contains too many D, L, V characters`)
      setRoman('')
      setNormal(undefined)
      return
    }
    if(roman==='') {
      setMessage(`Please write something`)
      setRoman('')
      setNormal(undefined)
      return
    }

    //Sets the string to number if there are no errors
    setNormal(romanToNumber(roman))
    setMessage('')
    setRoman('')
  }



  return (
    <div className="App">
      <div className='error'>
        <h2 data-testid="message">{message}</h2>
      </div>
      <div className='form'>
        <input
        type='text'
        value={roman}
        onChange={changeRoman}
        data-testid="add-word-input"
        >
        </input>
        <button onClick={handleClick}>Calculate from roman to normal</button>
      </div>
      <div className='normal'>
        <p
          id='answer'
          data-testid="answer"
        >{normal}</p>
      </div>
    </div>
  )
}

export default App
