import axios from 'axios'
import type Product from './interface_product'

const fetcher = async (url: string): Promise<Product[]> => await axios
    .get(url, {
        withCredentials: false
    })
    .then((res) => res.data.products)

export default fetcher
