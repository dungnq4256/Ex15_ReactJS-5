import productApi from "api/productApi";
import BaseDropdown from "general/components/BaseForm/BaseDropdown";
import BaseTextArea from "general/components/BaseForm/BaseTextArea";
import BaseTextField from "general/components/BaseForm/BaseTextField";
import DialogModal from "general/components/DialogModal";
import ToastHelper from "general/helpers/ToastHelper";
import PropTypes from "prop-types";
import { useState } from "react";

ModalCreateProduct.propTypes = {
    show: PropTypes.bool,
    close: PropTypes.bool,
    updateData: PropTypes.func,
    onClose: PropTypes.func,
    icon: PropTypes.string,
    description: PropTypes.string,
};
ModalCreateProduct.defaultProps = {
    show: null,
    close: true,
    updateData: null,
    onClose: null,
    icon: "",
    description: "",
    onExecute: null,
    title: "",
};

function ModalCreateProduct(props) {
    const {
        show,
        close,
        updateData,
        onClose,
        icon,
        description,
        onExecute,
        title,
    } = props;
    const [productOnChange, setProductOnChange] = useState({
        category_id: null,
        inventory_id: null,
        name: "",
        code: "",
        description: "",
        image: "",
        price: null,
        quantity: null,
        sell: null,
    });
    const resetText = () => {
        setProductOnChange({
            category_id: null,
            inventory_id: null,
            name: "",
            code: "",
            description: "",
            image: "",
            price: null,
            quantity: null,
            sell: null,
        });
    };
    const handelCreateProduct = async () => {
        try {
            const res = await productApi.createProduct(productOnChange);
            if (res.status === 200)
                ToastHelper.showSuccess("Thêm sản phẩm thành công!");
            updateData(true);
            resetText();
        } catch (error) {
            if (error.response.data === "Already exist code")
                ToastHelper.showError("Mã sản phẩm đã tồn tại!");
        }
    };

    return (
        <DialogModal
            show={show}
            onClose={onClose}
            icon={icon}
            description={description}
            onExecute={handelCreateProduct}
            title="Thêm sản phẩm"
            textBtnCancel="Hủy"
            textBtnExecute="Xác nhận"
        >
            <div className="d-flex flex-column justify-content-center align-items-center w-100">
                <div className="row d-flex justify-content-between mb-3 bg-white border-1 shadow-sm rounded w-100 py-2">
                    <div className="col-6 d-flex justify-content-end align-items-center">
                        <div className="fs-6 me-3">Mã sản phẩm: </div>
                    </div>
                    <div className="col-6 d-flex justify-content-start align-items-center">
                        <BaseTextField
                            name="ProductCode"
                            placeholder="Nhập mã sản phẩm..."
                            value={productOnChange.code}
                            onChange={(e) =>
                                setProductOnChange({
                                    ...productOnChange,
                                    code: e.target.value,
                                })
                            }
                            error="Bạn chưa nhập mã sản phẩm"
                        />
                    </div>
                </div>
                <div className="row d-flex justify-content-between mb-3 bg-white border-1 shadow-sm rounded w-100 py-2">
                    <div className="col-6 d-flex justify-content-end align-items-center">
                        <div className="fs-6 me-3">Tên sản phẩm: </div>
                    </div>
                    <div className="col-6 d-flex justify-content-start align-items-center">
                        <BaseTextField
                            name="ProductName"
                            placeholder="Nhập tên sản phẩm..."
                            value={productOnChange.name}
                            onChange={(e) =>
                                setProductOnChange({
                                    ...productOnChange,
                                    name: e.target.value,
                                })
                            }
                            error="Bạn chưa nhập tên sản phẩm"
                        />
                    </div>
                </div>
                <div className="row d-flex justify-content-between mb-3 bg-white border-1 shadow-sm rounded w-100 py-2">
                    <div className="col-6 d-flex justify-content-end align-items-center">
                        <div className="fs-6 me-3">Mô tả sản phẩm: </div>
                    </div>
                    <div className="col-6 d-flex justify-content-start align-items-center">
                        <BaseTextArea
                            name="ProductDescription"
                            placeholder="Nhập mô tả sản phẩm..."
                            value={productOnChange.description}
                            onChange={(e) =>
                                setProductOnChange({
                                    ...productOnChange,
                                    description: e.target.value,
                                })
                            }
                            error="Bạn chưa nhập mô tả sản phẩm"
                        />
                    </div>
                </div>
                <div className="row d-flex justify-content-between mb-3 bg-white border-1 shadow-sm rounded w-100 py-2">
                    <div className="col-6 d-flex justify-content-end align-items-center">
                        <div className="fs-6 me-3">Mô tả sản phẩm: </div>
                    </div>
                    <div className="col-6 d-flex justify-content-start align-items-center">
                        <BaseDropdown
                            name="InventoryID"
                            value={productOnChange.inventory_id}
                            onChange={(e) =>
                                setProductOnChange({
                                    ...productOnChange,
                                    description: e.target.value,
                                })
                            }
                            error="Bạn chưa nhập mô tả sản phẩm"
                        />
                    </div>
                </div>
            </div>
        </DialogModal>
    );
}

export default ModalCreateProduct;
