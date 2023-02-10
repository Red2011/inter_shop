import axios from 'axios';

const fetcher = async (url:string) => axios
    .get(url, {
        withCredentials: false,
    })
    .then((res) => res.data.products);

export default fetcher;
