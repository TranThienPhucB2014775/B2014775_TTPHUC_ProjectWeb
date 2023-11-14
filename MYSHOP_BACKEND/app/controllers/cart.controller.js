const CartService = require("../services/cart.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

//Tạo và lưu trữ một user mới
exports.create = async (req, res, next) => {
    if (!req.body?.user_id) {
        return next(new ApiError(400, "User không được để trống"));
    }
    if (!req.body?.product_id) {
        return next(new ApiError(400, "Sản phẩm không được để trống"));
    }
    if (!req.body?.quantity) {
        return next(new ApiError(400, "Số lượng không được để trống"));
    }
    try {
        const cartService = new CartService(MongoDB.client);
        const filter = {
            user_id: req.body.user_id,
            product_id: req.body.product_id
        };
        documentss = await cartService.find(filter);
        if (documentss == '') {
            // return next(
            //     new ApiError(500, `${documentss} 12`)
            // );
            const document = await cartService.create(req.body);
            return res.send(document);
            
        } else {
            documentss[0].quantity++
            const document = await cartService.update(documentss[0]);
            return res.send(document);
        }

    } catch (error) {
        return next(
            new ApiError(500, `Đã xảy ra lỗi khi thêm vào giỏ hàngg`)
        );
    }
};

exports.findAll = async (req, res, next) => {
    if (!req.body.user_id) {
        return next(new ApiError(400, `User id ${JSON.stringify(req.body)} không được để trống`));
        // console.log(req.body)
    }
    let documents = [];
    try {
        const cartService = new CartService(MongoDB.client);
        documents = await cartService.find(req.body);

    } catch (error) {
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi truy xuất giỏ hàng")
        );
    }

    return res.send(documents);
};



// Cập nhật giỏ hàng theo id
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Dữ liệu để cập nhật không được để trống"));
    }

    try {
        const cartService = new CartService(MongoDB.client);
        const document = await cartService.update(req.body);
        if (!document) {
            // document = null
            return next(new ApiError(404, `Sản phẩm không được tìm thấy `));
        }
        return res.send({ message: `Sản phẩm đã được cập nhật thành công` });
    } catch (error) {
        return next(
            new ApiError(500, `Lỗi khi cập nhật sản phẩm với id=${error}`)
        );
    }
};

// Xóa sản phẩm theo id
exports.delete = async (req, res, next) => {
    // if (!req.body?.product_id) {
    //     return next(new ApiError(400, "Sản phẩm không được để trống"));
    // }
    if (!req.body?.user_id) {
        return next(new ApiError(400, `Lỗi khi xoá sản phẩm khỏi giỏ hàng ${req.body.user_id}`));
    }
    try {
        const cartService = new CartService(MongoDB.client);
        const document = await cartService.delete(req.body);
        if (!document) {
            return next(new ApiError(404, "Sản phẩm không được tìm thấy"));
        }
        return res.send({ message: "Sản phẩm đã được xóa thành công" });
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Không thể xóa sản phẩm với id=${req.params.id}`
            )
        );
    }
};

// Xóa tất cả các sản phẩm từ CSDL
exports.deleteAll = async (_req, res, next) => {
    try {
        const cartService = new CartService(MongoDB.client);
        const deletedCount = await cartService.deleteAll();
        return res.send({
            message: `${deletedCount} sản phẩm đã được xóa thành công`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi xóa tất cả sản phẩm")
        );
    }
}; 