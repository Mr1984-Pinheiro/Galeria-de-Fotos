import { useState, useEffect } from 'react'
import * as Photos from './services/photos'
import * as C from './App.styles'
import { Photo } from './types/Photo'
import {PhotoItem} from './components/PhotoItem'
 
const App = () =>{

  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  
  useEffect(()=>{
    const getPhotos = async () => {
      setLoading(true);
      setPhotos(await Photos.getAll());
      setLoading(false);
    }
    getPhotos();
  }, []);

  const handleFormSubmit = () => {

  }

  return(
      <C.Container>
        <C.Area>
          <C.Header>Galeria de Fotos</C.Header>

          <C.UploadForm method="POST" onSubmit={handleFormSubmit} >
            <input type="file" name='image' />
            <input type="submit" value="Enviar" />
          </C.UploadForm>

          {loading && 
            <C.ScreenWaring>
              <div className="emoji">✋​</div>
              <div>Carregando...</div>
            </C.ScreenWaring>          
          }

          {!loading && photos.length > 0 && 
            <C.PhotoList>
              {photos.map((item, index)=>(
                <PhotoItem key={index} url={item.url} name={item.name} />
              ))}
            </C.PhotoList>          
          }

            {!loading && photos.length === 0 && 
            <C.ScreenWaring>
              <div className="emoji">🤤​</div>
              <div>Não há fotos cadastradas.</div>
            </C.ScreenWaring>          
          }



          


        </C.Area>
      </C.Container>
  );
}

export default App;