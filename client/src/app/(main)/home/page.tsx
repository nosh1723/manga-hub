import ListManga from './list-manga';
import SlideHome from './slide';

type Props = {}

const HomePage = (props: Props) => {
  return (
    <div className='relative h-full'>
      <SlideHome />

      <div className='container py-8 lg:py-20 lg:px-24 md:py-14 md:px-16'>
        <ListManga />
      </div>
    </div>
  )
}

export default HomePage