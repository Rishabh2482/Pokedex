import './App.css'
import CoustomRoutes from './routes/CustomRoutes'
import { Link } from 'react-router-dom'

function App() {

  return (
    <div className='outer-pokedex'>     
        <h1 id="pokedex-heading">
          <Link to="/" className='link'>Pokedex</Link>       
        </h1>
      <CoustomRoutes/>
    </div>
  )
}

export default App
