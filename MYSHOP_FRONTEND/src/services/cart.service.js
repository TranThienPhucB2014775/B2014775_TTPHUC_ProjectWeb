import createApiClient from "./api.service";

class CartService {
    constructor(baseUrl = "/api/carts") {
        this.api = createApiClient(baseUrl);
    }
    async getAll(data) {
        console.log(data)
        return (await this.api.post("/find",data)).data;
    }
    async create(data) {
        console.log(data)
        return (await this.api.post("/", data)).data;
    }
    async update() {
        return (await this.api.put("/")).data;
    }
    async delete() {
        return (await this.api.delete("/")).data;
    }
}

export default new CartService();