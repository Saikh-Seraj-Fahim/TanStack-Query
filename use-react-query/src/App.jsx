import ProductList from './components/ProductList'
import ProductDetails from './components/ProductDetails'
import AddProduct from './components/AddProduct'

export default function App() {
  return (
    <div className="flex m-2">
      <AddProduct />
      <ProductList />
      <ProductDetails id={1} />
    </div>
  )
}

