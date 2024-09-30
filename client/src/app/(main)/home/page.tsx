import ListManga from './list-manga'
import SlideHome from './slide'

type Props = {}

const HomePage = (props: Props) => {
  return (
    <div className='h-full'>
      <SlideHome />

      <div className='container py-20 px-24 '>
        <h2 className='text-lg font-medium mb-10'>Latest Updates</h2>
        <ListManga />
      </div>
    </div>
  )
}

export default HomePage