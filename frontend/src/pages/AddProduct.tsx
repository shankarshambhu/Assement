import { Box, Button, Grid, TextField, Typography, } from "@mui/material"
import { useState } from "react"
import { addProduct } from "../services/product";
import { toast } from "react-toastify";

function AddProduct() {
    const [form, setForm] = useState({
        name: "",
        price: 0,
        currentStock: 0,
        taxPercentage: 0
    })

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }




    const handleSubmit = async () => {
        try {
            const { name, price, currentStock, taxPercentage } = form
            const res = await addProduct(name, price, currentStock, taxPercentage);
            if (res.data.success) {
                toast.success(res.data.message);
                setForm({
                    name: "",
                    price: 0,
                    currentStock: 0,
                    taxPercentage: 0
                });
            }
        } catch (err: any) {
            const message = err?.data?.message || "Error creating job";

            toast.error(message)
        }








    }

    return (
        <>
            <Box display={'flex'} mt={'2%'} justifyContent={'center'}>
                <Typography >Add Product</Typography>

            </Box>
            <Box borderRadius={'20px'} border={'1px solid black'} height={'70vh'} width={'50vw'} ml={'25%'} mt={'1%'}>

                <Grid container display={'flex'} mt={'4%'} ml={'10%'} mr={'10%'}  >
                    <Grid size={{ xs: 12 }} >
                        <TextField
                            name="name"
                            label="name"
                            sx={{
                                width: '100%',
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "20px", // this is the one that works
                                },
                            }} onChange={handleChange}


                        >

                        </TextField>

                    </Grid>
                </Grid>
                <Grid container spacing={3} mt={'4%'} ml={'10%'} mr={'10%'}>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            placeholder="number only"

                            name="price"
                            label="price"

                            sx={{
                                width: "100%",
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "20px", // this is the one that works
                                },

                            }}
                            onChange={handleChange}

                        >

                        </TextField>

                    </Grid>
                </Grid>

                <Grid container spacing={3} mt={'4%'} ml={'10%'} mr={'10%'}>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            placeholder="number only"

                            name="currentStock"
                            label="currentStock"

                            sx={{
                                width: "100%",
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "20px", // this is the one that works
                                },

                            }}
                            onChange={handleChange}

                        >

                        </TextField>

                    </Grid>



                </Grid>

                <Grid container spacing={3} mt={'4%'} ml={'10%'} mr={'10%'}>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            placeholder="number only"
                            name="taxPercentage"
                            label="taxPercentage"

                            sx={{
                                width: "100%",
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "20px", // this is the one that works
                                },

                            }}
                            onChange={handleChange}

                        >

                        </TextField>

                    </Grid>



                </Grid>



                <Box display={'flex'} justifyContent={'center'} mt={'5%'}  >
                    <Button variant="contained" size="large" sx={{ width: "20%", borderRadius: "20px" }} onClick={handleSubmit}>SUBMIT</Button>
                </Box>
            </Box >

        </>
    )
}

export default AddProduct