import createApiClient from "./api.service";

class CartService {
    constructor(baseUrl = "/api/carts") {
        this.api = createApiClient(baseUrl);
    }
    async getAll(data) {
        return (await this.api.post("/find",data)).data;
    }
    async create(data) {
        console.log(data)
        return (await this.api.post("/", data)).data;
    }
    async update(data) {
        return (await this.api.put("/",data)).data;
    }
    async payment(data,user_id) {
        return (await this.api.post(`/payment/${user_id}`,data)).data;
    }
    async delete(data) {
        return (await this.api.post("/delete",data)).data;
    }
}

export default new CartService();