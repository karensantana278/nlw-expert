import logo from './assets/logo-nlw-experts.svg';
import { NewNoteCard } from './components/new-note-card';
import { NoteCard } from './components/note-card';


export function App() {

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} alt="nlw experts" />

      <form className="w-full">
        <input 
        type="text" 
        placeholder="Busque em suas notas..."
        className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none" />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-3 auto-rows-[250px] gap-6">

        <NewNoteCard />

        <NoteCard time="há 2 dias" description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et, nihil. Animi corrupti vel velit excepturi cumque maxime ab officiis fuga? Perferendis voluptatibus eos repudiandae ipsam quasi non autem debitis soluta?" />

        <NoteCard time="há 3 dias" description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et, nihil. Animi corrupti vel velit excepturi cumque maxime ab officiis fuga? Perferendis voluptatibus eos repudiandae ipsam quasi non autem debitis soluta?" />

        <NoteCard time="há 4 dias" description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et, nihil. Animi corrupti vel velit excepturi cumque maxime ab officiis fuga? Perferendis voluptatibus eos repudiandae ipsam quasi non autem debitis soluta?" />

        <NoteCard time="há 5 dias" description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et, nihil. Animi corrupti vel velit excepturi cumque maxime ab officiis fuga? Perferendis voluptatibus eos repudiandae ipsam quasi non autem debitis soluta?" />

        <NoteCard time="há 6 dias" description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et, nihil. Animi corrupti vel velit excepturi cumque maxime ab officiis fuga? Perferendis voluptatibus eos repudiandae ipsam quasi non autem debitis soluta?" />

      

      </div>


    </div>
  )
}

