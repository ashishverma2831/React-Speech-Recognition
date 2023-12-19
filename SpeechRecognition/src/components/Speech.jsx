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
            <p className='px-4 py-5 min-h-[10vh] m-2 border border-gray-700 shadow'>
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