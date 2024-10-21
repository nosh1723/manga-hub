
import SideBar from "./sidebar";
import ListManga from "./list";

type Props = {
    params: {
        pathname: string
    };
}

const PATH_NAME = [
    { path: 'latest-updates', value: 'Latest Updates' },
    { path: 'mangas', value: 'All Manga' },
]

const AllManga = ({params}: Props) => {
    const name = PATH_NAME.find(i => i.path === params.pathname)?.value
    return (
        <div className='container py-20 px-24 '>
            <h2 className="text-lg font-medium">{name}</h2>
            <div className="flex mt-8 gap-6 ">
                <SideBar />
                <ListManga />
            </div>
        </div>
    )
}

export default AllManga