import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function AddProduct() {
    const queryClient = useQueryClient();

    const [state, setState] = useState({
        title: "",
        description: "",
        price: 0,
        rating: 5,
        thumbnail: ""
    })

    // const mutation = useMutation({
    //     mutationFn: (newProduct) => axios.post("http://localhost:3000/products",
    //         newProduct),
    //     onSuccess: () => {
    //         queryClient.invalidateQueries(["products"]);
    //     }
    // });

    // queryClient.invalidateQueries(["products"]); er mane hocche amra queryClient
    // ke bolchi je tumi products er data gulo stale thakle tumi cache theke products
    // er data gulo remove kore dao and new data fetch kore products cache e save 
    // koro. eta likhle new data add korle browser refresh na korei new data UI te 
    // show hobe.

    const mutation = useMutation({
        mutationFn: (newProduct) => axios.post("http://localhost:3000/products",
            newProduct),
        onSuccess: (data, variables, context) => {
            console.log(context);
            queryClient.setQueriesData(["random"], { value: "some random data" })
            queryClient.invalidateQueries(["products"]);
        },
        onMutate: (variables) => {
            return { greeting: 'Say hello' }
        }
    });
    // onSuccess callback hisebe kichu jinis dite pare amader ke. jemon data:je form 
    // data gulo submit korlam. je form data gulo submit korlam ta diye kichu korte 
    // chaile ekhan theke kora jabe. variables: form theke jei variable er data gulo 
    // submit kora holo.
    // context hocche extra data jeta diye amra kichu korte pari. jokhon mutation hoi,
    // tokhon mutation function execute houar ag diye kichu jinis ami context hisebe 
    // pass korte pari. kivabe? onMutate er maddhom e. onMutate sob somoy mutate 
    // function execute houar ag diye run hoi. onMutate amader ke form er variable 
    // gulo variables parameter e dei. sei sathe kichu jinis chaile success object e 
    // pathano jai. jemon 1 ta greetings message chaile pathate pari. mane mutation 
    // surur ag diye jodi amra kichu korte chai, seta amra onMutate er moddhe kore 
    // return korte pari and seta onSuccess e context er maddhom e dhorte pari.

    // kono data hard code kore cache e add korte chaile, amra use korbo 
    // setQueriesData(). ei khetre setQueriesData() er 1st parameter hocche jei
    // cache e data add korte chai sei cache er name. and 2nd parameter hocche 
    // jei data hard code kore add korte chai seta. jemon amra ei code e random name
    // e 1 ta cache create korte chai and seta te {value:"some random data"} ei data
    // add korchi. ba jei form data submit kora holo tar kono variable niye onno
    // arek ta cache e add korte pari.

    const submitData = e => {
        e.preventDefault();
        console.log(state);
        const newData = { ...state, id: crypto.randomUUID().toString() };
        mutation.mutate(newData);
    }

    const handleChange = e => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.type === "number" ? e.target.valueAsNumber :
            e.target.value;
        setState({
            ...state,
            [name]: value
        })
    }

    if (mutation.isLoading) {
        return <span>Submitting.....</span>
    }

    if (mutation.isError) {
        return <span>Error:{mutation.error.message}</span>
    }

    return (
        <div className="w-1/5 h-1/2 m-2 p-2 bg-gray-100">
            <h2 className="text-2xl my-2">Add a product</h2>
            {mutation.isSuccess && <p>Product Added!</p>}
            <form className="flex flex-col" onSubmit={submitData}>
                <input type="text" value={state.title} name="title"
                    onChange={handleChange} className="p-2 my-2 border rounded"
                    placeholder="Enter a product title" />
                <textarea value={state.description} name="description"
                    onChange={handleChange} className="p-2 my-2 border rounded"
                    placeholder="Enter a product description" />
                <input type="number" value={state.price} name="price"
                    onChange={handleChange} className="p-2 my-2 border rounded"
                    placeholder="Enter a product price" />
                <input type="text" value={state.thumbnail} name="thumbnail"
                    onChange={handleChange} className="p-2 my-2 border rounded"
                    placeholder="Enter a product thumbnail URL" />
                <button type="submit"
                    className="bg-black m-auto text-white text-xl p-1 rounded-md">
                    Add
                </button>
            </form>
        </div>
    );
}
