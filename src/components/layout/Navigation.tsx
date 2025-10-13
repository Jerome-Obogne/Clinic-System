import { Link, Outlet } from "react-router"
import Buttons from "../ui/Buttons"

const Navigation = () => {

  return (
    <>
      <header className="w-full h-auto fixed top-0 bg-[color:var(--color-tertiary)] p-4">
        <nav className="flex justify-around content-center">
           <div className="w-44">
            <Link to="/">
              <img src="./logo/sample22.png" alt="nav logo"  className="max-w-full w-[700px] h-auto" />
            </Link>
           </div>
           <div className="w-60 self-center">
              <Buttons variant='contained' size="medium" className='w-full md:w-[300px] bg-[color:var(--color-quarternary)]! text-white! '  >
                <Link to={'/login'}>Pediatric login</Link>
              </Buttons>
           </div>
        </nav>
      </header>

      <main>
        <Outlet/>
      </main>
    </>
  )
}

export default Navigation