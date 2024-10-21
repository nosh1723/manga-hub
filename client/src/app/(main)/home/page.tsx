import ListManga from './list-manga';
import SlideHome from './slide';

type Props = {}

const HomePage = (props: Props) => {
  return (
    <div className='relative h-full'>
      <SlideHome />

      <div className='container py-20 px-24 '>
        <ListManga />
      </div>
    </div>
  )
}

export default HomePage