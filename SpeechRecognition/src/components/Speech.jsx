import 'regenerator-runtime/runtime'
import React, { useState } from 'react'
import SpeechRecognition,{ useSpeechRecognition } from 'react-speech-recognition'
// import useClipboard from "react-use-clipboard";

const Speech = () => {

    const startListening = ()=>{
        SpeechRecognition.startListening({ continuous: true, language:'en-IN' })
    }

    const {transcript,browserSupportsSpeechRecognition,resetTranscript,listening} = useSpeechRecognition();
    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    // const [copiedText, setCopiedText] = useState('')
    // const [isCopied, setCopied] = useClipboard(copiedText, {
    //     // `isCopied` will go back to `false` after 3000ms.
    //     successDuration: 3000,
    //   });

    const [message, setMessage] = useState('')
  const commands = [
    {
      command: 'I would like to order *',
      callback: (food) => setMessage(`Your order is for: ${food}`)
    },
    {
      command: 'The weather is :condition today',
      callback: (condition) => setMessage(`Today, the weather is ${condition}`)
    },
    {
      command: 'My top sports are * and *',
      callback: (sport1, sport2) => setMessage(`#1: ${sport1}, #2: ${sport2}`)
    },
    {
      command: 'Pass the salt (please)',
      callback: () => setMessage('My pleasure')
    },
    {
      command: ['Hello', 'Hi'],
      callback: ({ command }) => setMessage(`Hi there! You said: "${command}"`),
      matchInterim: true
    },
    {
      command: 'Beijing',
      callback: (command, spokenPhrase, similarityRatio) => setMessage(`${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`),
      // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2
    },
    {
      command: ['eat', 'sleep', 'leave'],
      callback: (command) => setMessage(`Best matching command: ${command}`),
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
      bestMatchOnly: true
    },
    {
      command: 'clear',
      callback: ({ resetTranscript }) => resetTranscript()
    }
  ]

  return (
    <>
        <div className='container w-full flex flex-col md:w-10/12 xl:w-8/12 mx-auto shadow-md p-8 rounded'>
        <h3 className="text-4xl font-bold text-center text-gray-600 mb-8 drop-shadow">Voice Recognition</h3>
            <div className='flex justify-between'>
                <p className='font-semibold text-xl'>Microphone: {listening ? 'on' : 'off'}</p>
                {/* <button onClick={setCopied}>
                    Was it copied? {isCopied ? "Yes! 👍" : "Nope! 👎"}
                </button> */}
            </div>
            {/* <p className='px-4 py-5 min-h-[10vh] m-2 border border-gray-700 shadow' onClick={()=>setCopiedText(transcript)}> */}
            <p className='px-4 py-5 mb-4 min-h-[10vh] m-2 border border-gray-700 shadow'>
                {message}
            </p>
            <p className='px-4 py-5 mb-4 min-h-[10vh] m-2 border border-gray-700 shadow'>
                {transcript}
            </p>
            <button onClick={startListening} className='bg-blue-400 py-2 mb-2 px-6 rounded hover:bg-blue-600 text-white font-medium tracking-wide'>Start Listening</button>
            <button onClick={SpeechRecognition.stopListening} className='bg-green-400 mb-2 hover:bg-green-600 py-2 px-6 rounded text-white font-medium tracking-wide'>Stop Listening</button>
            <button onClick={SpeechRecognition.abortListening} className='bg-red-400 py-2 mb-2 hover:bg-red-600 px-6 rounded text-white font-medium tracking-wide'>Abort Listening</button>
            <button onClick={resetTranscript} className='bg-yellow-400 py-2 px-6 rounded mb-2 hover:bg-yellow-600 text-white font-medium tracking-wide'>Reset Paragraph</button>
        </div>
    </>
  )
}

export default Speech