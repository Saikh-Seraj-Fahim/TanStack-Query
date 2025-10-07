import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

const retrieveProducts = async () => {
    const response = await axios.get('http://localhost:3000/products');
    return response.data;
}

export default function ProductList() {
    const { data: products, error, isLoading } = useQuery({
        queryKey: ["products"], // return kora result ta products er moddhe cache kora thakbe.
        queryFn: retrieveProducts,
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


// see after 36 minute.