import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

const retrieveProduct = async ({ queryKey }) => {
    const response = await axios.get(`http://localhost:3000/${queryKey[0]}/${queryKey[1]}`);
    return response.data;
}

export default function ProductDetails({ id }) {
    const { data: product, error, isLoading } = useQuery({
        queryKey: ["products", id],
        queryFn: retrieveProduct,
    })
    // ager bar amra products er cache toiri korechilam. seta ekhon o cache e ache.
    // ekhon sei products theke kono 1 ta specific product er data fetch korte chai 
    // and setao cache e rakhte chai. Mane 2 ta jinis cache e rakhte chai. Ei rokom 
    // 2 ba tar besi jinis cache e rakhte hole and tara jodi connected hoi tahole 
    // connected cache toirir jonno, upor er moto kore queryKey likhte hobe.

    // console.log(product,error,isLoading);

    if (isLoading) {
        return (
            <div>
                Fetching Product Details.....
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
        <div className='w-1/5'>
            <h1 className='text-3xl my-2'>Product Details</h1>
            <div className='border bg-gray-100 p-1 text-md flex flex-col'>
                <img src={product.thumbnail} alt={product.title}
                    className="object-cover w-24 h-24 border rounded-full m-auto" />
                <p>{product.title}</p>
                <p>{product.description}</p>
                <p>{product.price}</p>
                <p>{product.rating}</p>
            </div>
        </div>
    );
}
