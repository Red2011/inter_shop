// eslint-disable-next-line import/no-mutable-exports
let defaultAddress = 'https://dummyjson.com/products?limit=100';
function SetAddress(newAddress:string) {
    if (newAddress.length > 0) {
        defaultAddress = newAddress;
    }
}
export {
    defaultAddress,
    SetAddress,
};
