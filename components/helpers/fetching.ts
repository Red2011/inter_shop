import axios from "axios";

const fetcher = async (url:string) => await axios
    .get(url, {
        withCredentials: false
    })
    .then((res) => res.data.products);

export default fetcher;