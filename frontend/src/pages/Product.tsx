import { useEffect, useState } from "react";
import { deleteProduct, getAllProducts, updateProduct } from "../services/product";
import { toast } from "react-toastify";
import { Box, Button, Card, CardContent, Grid, Modal, TextField, Typography } from "@mui/material";
import { purchaseProduct } from "../services/purchase";

function Product() {
  const [products, setProducts] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [formData, setFormData] = useState({ name: "", price: 0, currentStock: 0, taxPercentage: 0 });
  const [purchase, setPurchase] = useState(false);
  const [purchaseData, setpurchaseData] = useState({ quantity: 0 });

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res.data.products);

    } catch (err: any) {
      const message = err?.data?.message || "Error fetching products";
      toast.error(message);
    }
  };
  console.log(products)

  const handleUpdate = (product: any) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleSave = async () => {
    try {
      const { name, price, currentStock, taxPercentage } = formData
      const res = await updateProduct(selectedProduct.id, name, price, currentStock, taxPercentage);
      if (res.data.success) {
        toast.success("Product updated!");
        setOpen(false);
        fetchProducts();

      }

    } catch (err: any) {
      const message = err?.data?.message || "Error creating job";

      toast.error(message)
    }
  };




  const handleBuy = async () => {
    try {
      const { quantity } = purchaseData;
      const res = await purchaseProduct(selectedProduct.id, quantity);
      if (res.data.success) {
        toast.success(res.data.message);
        fetchProducts();

        setPurchase(false)
      }

    } catch (err: any) {
      const message = err?.data?.message || "Error creating job";

      toast.error(message)


    }

  }

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteProduct(id);
      if (res?.data.success) toast.success(res.data.message);
      fetchProducts();

    } catch (err: any) {
      const message = err?.data?.message || "Error deleting product";
      toast.error(message);
    }
  };

  const handlePurchase = async (product: any) => {
    try {
      setSelectedProduct(product);
      setPurchase(true);

    } catch (error) {

    }

  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Grid container spacing={2} mt={"1%"}>
        {products.map((product) => (
          <Grid size={{ xs: 12, md: 4 }} key={product.id}>
            <Card>
              <CardContent>
                <Typography>Name: {product.name}</Typography>
                <Typography>Price: {product.price}</Typography>
                <Typography>Current stock: {product.currentStock}</Typography>
                <Typography>Tax: {product.taxPercentage}</Typography>


                <Box display="flex" justifyContent="space-between" gap={1} mt={2}>
                  <Button variant="contained" onClick={() => handlePurchase(product)}>
                    PURCHASE
                  </Button>
                  <Button variant="contained" onClick={() => handleUpdate(product)}>
                    Update
                  </Button>
                  <Button color="error" variant="outlined" onClick={() => handleDelete(product.id)}>
                    Delete
                  </Button>

                </Box>



              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            width: 400,
          }}
        >
          <Typography variant="h6" mb={2}>
            Update Product
          </Typography>
          <TextField
            label="Product Name"
            fullWidth
            sx={{ mb: 2 }}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            label="Price"
            fullWidth
            type="number"
            sx={{ mb: 2 }}
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
          />
          <TextField
            label="currentStock"
            fullWidth
            type="number"
            sx={{ mb: 2 }}
            value={formData.currentStock}
            onChange={(e) => setFormData({ ...formData, currentStock: Number(e.target.value) })}
          />
          <TextField
            label="taxPercentage"
            fullWidth
            type="number"
            sx={{ mb: 2 }}
            value={formData.
              taxPercentage
            }
            onChange={(e) => setFormData({ ...formData, taxPercentage: Number(e.target.value) })}
          />
          <Box display="flex" justifyContent="flex-end" gap={1}>
            <Button color="error" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>









      <Modal open={purchase} onClose={() => setPurchase(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            width: 400,
          }}
        >
          <Typography variant="h6" mb={2}>
            Make Purchase
          </Typography>

          <TextField
            label="quantity"
            fullWidth
            type="number"
            sx={{ mb: 2 }}
            value={purchaseData.
              quantity
            }
            onChange={(e) => setpurchaseData({ ...purchaseData, quantity: Number(e.target.value) })}
          />
          <Box display="flex" justifyContent="flex-end" gap={1}>
            <Button color="error" onClick={() => setPurchase(false)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleBuy}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default Product;
