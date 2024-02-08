import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

interface NewNoteCardProps {
    onNoteCreated: (description: string) => void
}

const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

const speechRecognition = new SpeechRecognitionAPI();


export function NewNoteCard({onNoteCreated}: NewNoteCardProps) {

    const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)
    const [isRecording, setIsRecording] = useState(false)
    const [content, setContent] = useState('')

    function handleStartEditor(){
        setShouldShowOnboarding(false)
    }

    function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
        setContent(event.target.value)

        if(event.target.value === "" ){
            setShouldShowOnboarding(true)
        }
    }

    function handleSaveNote(event: FormEvent){
        event.preventDefault()

        if (content === "") {
            return;
        }

        onNoteCreated(content)

        setContent('')
        setShouldShowOnboarding(true)


        toast.success('Nota criada com sucesso!')
    }

    function handleStartRecording( event: FormEvent ){
        event.preventDefault()

        

        const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

        if(!isSpeechRecognitionAPIAvailable){
            alert('Infelizmente seu navegador não suporta a API de gravação!')
            return
        }

        setIsRecording(true)
        setShouldShowOnboarding(false)

        
        speechRecognition.lang = 'pt-br'
        speechRecognition.continuous = true
        speechRecognition.maxAlternatives = 1
        speechRecognition.interimResults = true

        speechRecognition.onresult = (event) => {
            const transcription = Array.from(event.results).reduce(( text, result ) => {
                return text.concat(result[0].transcript)
            }, '')

            setContent(transcription)
        }

        speechRecognition.onerror = (event) => {
           console.error(event.message)
        }

        speechRecognition.start()
    }

    function handleStopRecording(){
        setIsRecording(false)

        if (speechRecognition !== null){
            speechRecognition.stop()
        }
    }

    return(

        <Dialog.Root>
            <Dialog.Trigger className="flex flex-col rounded-md bg-slate-700 p-5 gap-3 text-left outline-none hover:ring-2 hover:ring-slate-600  focus:ring-2 focus:ring-lime-400">
                <span className="text-sm font-medium text-slate-200">Adicionar nota</span>
                <p className="text-sm leading-6 text-slate-400">Grave uma nota em áudio que será convertida para texto automaticamente.</p>  
            </Dialog.Trigger>

            <Dialog.Portal>
            <Dialog.Overlay className="inset-0 fixed bg-black/50" />
                <Dialog.Content className="fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] h-[60vh] w-full bg-slate-700 rounded-md flex flex-col outline-none">

                    <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100 ">
                        <X className="size-5" />
                    </Dialog.Close>

                    <form  className="flex-1 flex flex-col">

                    <div className="flex flex-1 flex-col gap-3 p-5">
                        <span className="text-sm font-medium text-slate-300">
                          Adicionar nota
                        </span>
                        
                        {shouldShowOnboarding ? (
                        <p className="text-sm leading-6 text-slate-400">
                           Comece <button onClick={handleStartRecording} className="text-lime-400 font-medium hover:underline"> gravando uma nota </button> em áudio ou se preferir <button className="text-lime-400 font-medium hover:underline" onClick={handleStartEditor}> utilize apenas texto</button>.
                        </p>) : ( 
                        <textarea 
                        className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none" 
                        autoFocus
                        onChange={handleContentChanged}
                        value={content}
                        ></textarea>
                        )}
                    </div>

                            {isRecording ? (
                                 <button type="button" 
                                 onClick={handleStopRecording}
                                 className=" flex items-center justify-center gap-2 w-full bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-bold hover:text-slate-100">

                                    <div className="size-3 rounded-full bg-red-500 animate-pulse" />
                                     Gravando! (clique p/ interromper)

                                 </button>
                            ): (
                                <button type="button" 
                                onClick={handleSaveNote}
                                className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-bold hover:bg-lime-500">
                                    Salvar nota
                                </button>
                            )}
         
                    </form>


                </Dialog.Content>
        </Dialog.Portal>
        </Dialog.Root>


    )
}