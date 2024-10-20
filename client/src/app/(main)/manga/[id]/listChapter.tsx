import { updatedTime } from '@/lib/utils'
import { Chapter } from '@/models/manga'
import Link from 'next/link'

type Props = {
    listChapter: {
        data: Array<Chapter>, total: number
    }
}

const ListChapter = ({ listChapter }: Props) => {
    return (
        <>
            <div className='mt-10 max-h-[436px] overflow-y-auto scroll-smooth custom-scrollbar'>
                <div className='flex flex-col gap-1'>
                    {listChapter.data?.map((chapter, index) => {
                        return <Link key={index + chapter.id} href={'/reading-manga/' + chapter.id} className={`px-4 py-2 overflow-hidden ${index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"} flex items-center justify-between gap-3 hover:opacity-70`}>
                            <div className='flex gap-2'>
                                <h3 className='uppercase text-md font-bold'>chap {chapter.attributes.chapter}</h3>
                                <h4 className='font-medium'>{chapter.attributes.title}</h4>
                            </div>
                            <div className='text-sm text-[--gray-cus-400]'><span>{updatedTime(chapter.attributes.updatedAt)}</span> </div>
                        </Link>
                    })}
                </div>
            </div>
            {/* {total > listChapter.data.length &&
                <Button onClick={handleLoadMoreChapter} className='mt-2 w-full flex items-center gap-3 h-8 hover:opacity-70 rounded-sm border-2 border-black'>
                    {isLoading ? <ReloadIcon className="mr-1 h-4 w-4 animate-spin" /> : <></>}
                    Load more...
                </Button>
            } */}
        </>
    )
}

export default ListChapter