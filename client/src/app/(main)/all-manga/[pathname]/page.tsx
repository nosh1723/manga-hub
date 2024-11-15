
import SideBar from "./sidebar";
import ListManga from "./list";

type Props = {
    params: {
        pathname: string
    };
}

const PATH_NAME = [
    { path: 'latest-updates', value: 'Latest Updates' },
    { path: '', value: 'All Manga' },
]

const AllManga = ({params}: Props) => {
    const name = PATH_NAME.find(i => i.path === params.pathname)?.value
    return (
        <div className='container py-16 px-24 '>
            <h2 className="text-lg font-medium">{name || `Search with the keyword '${params.pathname}'`}</h2>
            <div className="flex mt-8 gap-6 ">
                <SideBar pathname={params.pathname}/>
                <ListManga pathname={params.pathname}/>
            </div>
        </div>
    )
}

export default AllManga