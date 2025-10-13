import axios from 'axios'
import { useQuery, useQueries } from '@tanstack/react-query'


// const retrieveProducts = async () => {
//     const response = await axios.get('http://localhost:3000/products');
//     return response.data;
// }


// useQuery() theke jokhon function ta call hoi, tokhon 1 ta object (obj) pass hoi.

// const retrieveProducts = async (obj) => {
//     console.log(obj);
//     const response = await axios.get('http://localhost:3000/products}');
//     return response.data;
// }

// const retrieveProducts = async ({ queryKey }) => {
//     const response = await axios.get(`http://localhost:3000/${queryKey[0]}`);
//     // jei API endpoint niye kaj korbo(/products) and queryKey er name o 
//     // jodi same thake tahole evabe likha jabe.
//     return response.data;
// }

export default function ProductList() {
    const { data: products, error, isLoading } = useQuery({
        queryKey: ["products"], // return kora result ta products er moddhe cache 
        // kora thakbe.
        // queryFn: retrieveProducts,
        queryFn: async ({ queryKey }) => {
            const response = await axios.get(`http://localhost:3000/${queryKey[0]}`);
            // jei API endpoint niye kaj korbo(/products) and queryKey er name o 
            // jodi same thake tahole evabe likha jabe.
            return response.data;
        },
        retry: false,
        staleTime: 5000, // 5 second porjonto fresh ba updated data dekhabe. 5 second 
        // por server theke ar data fetch korbe na. tokhon puraton data e dekhabe.
        refetchInterval: 1000, // 1 second por por cache er data remove kore server 
        // theke new data fetch korbe.

        // refetchInterval: () => {
        //     // if network===4G
        //     return 2000;
        // }
        // refetchOnWindowFocus: true,
        // refetchOnReconnect: true
    });

    // useQueries:
    // The useQueries hook can be used to fetch a variable number of queries:

    // const ids = [1, 2, 3]
    // const results = useQueries({
    //     queries: ids.map((id) => ({
    //         queryKey: ['post', id],
    //         queryFn: () => fetchPost(id),
    //         staleTime: Infinity,
    //     })),
    // })

    // onek gulo query eksathe call korte hole amra useQuery() ke loop kore use
    // korbo na. ei khetre amra useQueries() use korbo.

    if (isLoading) {
        return (
            <div>
                Fetching Products.......
            </div>
        );
    }

    if (error) {
        return (
            <div>
                An Error Occured:{error.message}
            </div>
        );
    }

    return (
        <div className="w-3/5 flex flex-col items-center justify-center">
            <h2 className="text-3xl my-2">Product List</h2>
            <ul className="flex flex-wrap items-center justify-center">
                {Array.isArray(products) && products.map(product => (
                    <li key={product.id} className='flex flex-col items-center m-2 
                    border rounded-lg'>
                        <img src={product.thumbnail} alt={product.title}
                            className='object-cover w-96 h-64 rounded-sm' />
                        <p className="text-xl my-3">{product.title}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}


// see after 1 hour 36 minute 50 second.
