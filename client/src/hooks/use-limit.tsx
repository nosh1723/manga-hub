import { useState, useEffect } from 'react';
import useWindowSize from './use-window-size';

type Limit = {
    limit: number,
    limitForSearch: number,
}

function useLimit(): Limit {
    const size = useWindowSize();
    const [limit, setLimit] = useState<number>(0);
    const [limitForSearch, setLimitForSearch] = useState<number>(0);

    useEffect(() => {
        function updateLimit() {
            if (size.laptop || size.desktop) {
                setLimit(15); 
            } else if (size.mobile || size.tablet) {
                setLimit(14); 
            }
            else if(size.laptop_l) {
                setLimit(16)
            }
        }

        function updateLimitForSearch() {
            if (size.laptop || size.desktop || size.laptop_l) {
                setLimitForSearch(18); 
            } else if (size.tablet) {
                setLimitForSearch(15); 
            } else if (size.mobile) {
                setLimitForSearch(16); 
            }
        }
        updateLimit();
        updateLimitForSearch()

    }, [size]);

    return {limit, limitForSearch};
}

export default useLimit;