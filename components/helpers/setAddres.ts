
export let default_address = 'https://dummyjson.com/products'
export function SetAddress(new_address:string){
    if(new_address.length > 0) {
        default_address = new_address;
    }
}

