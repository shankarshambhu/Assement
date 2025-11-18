import { useEffect, useState } from "react";
import { getAllPurchases } from "../services/purchase";
import { toast } from "react-toastify";
import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import axios from "axios";

function PurchaseCard() {
    const [purchases, setPurchases] = useState<any[]>([]);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    const fetchPurchases = async () => {
        try {
            const res = await getAllPurchases();
            if (res.data.success) {

                setPurchases(res.data.purchases)
            }

        } catch (err: any) {
            const message = err?.data?.message || "Error creating purchase";

            toast.error(message)

        }

    }



    const handleAddToCart = async (product: any) => {
        setCart((prev: any) => {
            const existing = prev?.find((p: any) => p.id === product.id);
            if (existing) {
                return prev
            }
            return [...prev, { id: product.id, name: product.name, quantity: 1 }];
        })


    }

    const handleAdd = (id: any) => {
        setCart((prev: any) => {
            return prev.map((item: any) => {
                return item.id == id ?
                    { ...item, quantity: item.quantity + 1 }
                    : item
            })
        })
    }

    const handleSub = (id: any) => {
        setCart((prev: any) =>
            prev
                .map((item: any) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item: any) => item.quantity > 0)
        );
    };



    const handlePurchase = async () => {
        try {
            const res = await axios.post("http://localhost:5000/sale/createsale", { cart });
            if (res.data.sucess) {
                alert(res.data.message);
                setTotal(res.data.sale.total)
                setCart([]);
            }

        } catch (error: any) {
            const message = error?.data?.message || "Error creating job";


            toast.error(message)

        }

    }



    useEffect(() => {
        fetchPurchases();
    }, []);


    return (
        <> <Grid container spacing={2} mt={"1%"}>
            {purchases?.map((purchase) => (
                <Grid size={{ xs: 12, md: 4 }} key={purchase.id}>
                    <Card>
                        <CardContent>
                            <Typography>Name: {purchase?.product?.name}</Typography>
                            <Typography>Price: {purchase.purchasePrice}</Typography>
                            <Typography>Current stock: {purchase.quantity}</Typography>
                            <Button variant="contained" size="small" sx={{ mt: '10px' }}
                                onClick={() => handleAddToCart(purchase.product)}
                            >
                                add to cart</Button>





                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>




            <Box
                ml="25%"
                mt="5%"
                width="50%"
                border="1px solid black"
                borderRadius={2}
                p={2}
            >
                <Typography variant="h5" mb={2} fontWeight={600}>
                    Cart
                </Typography>


                <Grid container spacing={2}>
                    {cart.map((c: any) => (
                        <Grid
                            key={c.id}
                            size={{ xs: 12 }}
                        >
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                border="1px solid #ccc"
                                borderRadius={1}
                                p={1.5}
                            >
                                <Typography fontSize="1.1rem">{c.name}</Typography>

                                <Box display="flex" alignItems="center" gap={1}>
                                    <Button variant="contained" size="small" onClick={() => handleAdd(c.id)}>+</Button>
                                    <Typography>{c.quantity}</Typography>
                                    <Button variant="contained" size="small" onClick={() => handleSub(c.id)}>-</Button>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
                {cart.length !== 0 &&(
                    
                    <Box display={'flex'} justifyContent={'flex-end'}>
                        <Button sx={{ mt: '5%', mr: '5%' }} onClick={handlePurchase} size="small" variant="contained"> PURCHASE</Button>
                    </Box>

                )}


            </Box>

            {total !== 0 && (

                <Box display={'flex'} justifyContent={'center'} mt={'5%'} >
                    <Typography variant="h5">Total is {total}</Typography>
                </Box>
            )}




        </>
    )
}

export default PurchaseCard