import Image from 'next/image'

type Props = {}
type Data = {
    id: string,
    url: string
}

const SlideHome = (props: Props) => {
    // const sliderContainerRef = useRef<HTMLDivElement | null>(null);
    // const sliderRef = useRef<HTMLDivElement | null>(null);

    // const [positionSlide, setPositionSlide] = useState<number>(0)

    // const data = [
    //     {
    //         "id": "img-1",
    //         "url": "/image/sakamoto.jpg"
    //     },
    //     {
    //         "id": "img-2",
    //         "url": "https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/1947/panorama/processed-a09344782cd35ebd3827bcc34de86511.jpg"
    //     },
    //     {
    //         "id": "img-3",
    //         "url": "https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/699/panorama/processed-ab73ab510f4bfc50ecbdaeef7c02f120.jpg"
    //     }
    // ]

    // useEffect(() => {
    //     const slider = sliderContainerRef.current;
    //     if (slider) {
    //         slider.addEventListener('scroll', handleScroll);
    //         return () => {
    //             slider.removeEventListener('scroll', handleScroll);
    //         };
    //     }
    // }, []);

    // const handleScroll = () => {
    //     if (sliderContainerRef.current && sliderRef.current) {
    //         const scrollLeft = sliderContainerRef.current.scrollLeft;
    //         const width = sliderRef.current.clientWidth;
    //         const index = Math.round(scrollLeft / width);
    //         setPositionSlide(index);
    //     }
    // };

    // const handleClickSlide = (index: number): void => {
    //     if (sliderContainerRef.current && sliderRef.current) {
    //         sliderContainerRef.current.scrollTo({
    //             left: sliderRef.current.clientWidth * index,
    //             behavior: "smooth",
    //         });
    //     }
    // };
    return (
        // <div className='mb-[calc(5rem)] md:mb-[calc(8rem)] flex justify-center box-content'>
        //     <div ref={sliderContainerRef} className='scroll-smooth snap-x snap-mandatory overflow-x-auto flex w-full translate-y-[calc(5rem)] md:translate-y-[calc(7rem)] relative z-10 hide-scrollbar gap-4 snap px-2 select-none'>
        //         <div className="snap-align-none snap-none hidden md:block flex-none 2xl:w-[calc((100vw-960px-2rem)/2)] xl:w-[calc((100vw-1024px-2rem)/2)] lg:w-[calc((100vw-768px-2rem)/2)] md:w-[calc((100vw-768px-2rem)/2)]"></div>
        //         {data?.map((i: Data, index: number) => {
        //             return <div
        //                 ref={sliderRef}
        //                 key={i.id}
        //                 className={`w-[960px] h-[496px] flex-none rounded-lg overflow-hidden relative z-10 snap-center snap-always transition ${positionSlide == index ? "" : "opacity-50"}`}
        //                 onClick={() => handleClickSlide(index)}
        //             >
        //                 <div className='absolute w-full h-full rounded-lg z-10 bg-banner__main'></div>
        //                 <Image
        //                     src={i?.url}
        //                     width={960}
        //                     height={496}
        //                     alt="Bocchi!?"
        //                     className='absolute z-0 w-full h-full top-0 left-0 rounded-lg brightness-75'
        //                 />
        //                 <div className='absolute z-20 bottom-9 left-7 right-7 flex items-end gap-6'>
        //                     <Link href={''}>
        //                         <Image
        //                             src="/image/sakamotox.jpg"
        //                             width={190}
        //                             height={270}
        //                             alt="Bocchi!?"
        //                             className='rounded-md brightness-90'
        //                         />
        //                     </Link>

        //                     <Link href={''} className='max-w-[600px] hover:opacity-85'>
        //                         <h3 className='text-lg line-clamp-1'>Title</h3>
        //                         <p className='w-full text-sm text-[--gray-cus-300] line-clamp-4'>Having to deal with his abusive boss day after day while working an exploitative job, Yamase Fuyu has become tired of it all… Until one day he accidentally runs into Minase Ito, his ex-girlfriend from university.
        //                             The sudden reunion lifts Fuyu’s spirits, who wastes no time inviting Ito to chat over</p>
        //                     </Link>
        //                 </div>
        //             </div>
        //         })}
        //         <div className="snap-align-none snap-none hidden md:block flex-none 2xl:w-[calc((100vw-960px-2rem)/2)] xl:w-[calc((100vw-1024px-2rem)/2)] lg:w-[calc((100vw-768px-2rem)/2)] md:w-[calc((100vw-768px-2rem)/2)]"></div>
        //     </div>
        // </div>

        <div className='flex justify-center mt-14'>
            <div className='container px-8 w-full'>
                <div className=' rounded-md border-2 border-gray-200'>
                    <Image 
                        src='/image/bg_bannerpng.png'
                        width={1400}
                        height={330}
                        alt='bg-banner'
                        className='w-full rounded-sm'
                    />
                </div>
            </div>
        </div>
    )
}

export default SlideHome