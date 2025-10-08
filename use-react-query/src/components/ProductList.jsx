import axios from 'axios'
import { useQuery } from '@tanstack/react-query'


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


const retrieveProducts = async ({ queryKey }) => {
    const response = await axios.get(`http://localhost:3000/${queryKey[0]}`);
    // jei API endpoint niye kaj korbo(/products) and queryKey er name o jodi same thake tahole evabe likha jabe.
    return response.data;
}

export default function ProductList() {
    const { data: products, error, isLoading } = useQuery({
        queryKey: ["products"], // return kora result ta products er moddhe cache kora thakbe.
        queryFn: retrieveProducts,
        retry: false
    });

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
        <div className="flex flex-col items-center justify-center w-3/5">
            <h2 className="text-3xl my-2">Product List</h2>
            <ul className="flex flex-wrap items-center justify-center">
                {products && products.map(product => (
                    <li key={product.id} className='flex flex-col items-center m-2 border rounded-lg'>
                        <img src={product.thumbnail} alt={product.title} className='object-cover w-96 h-64 rounded-sm' />
                        <p className="text-xl my-3">{product.title}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}


// see after 48 minute 35 second.