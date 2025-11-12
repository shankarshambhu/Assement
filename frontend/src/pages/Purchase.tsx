import { useEffect, useState } from "react";
import { getAllPurchases } from "../services/purchase";
import { toast } from "react-toastify";
import { Card, CardContent, Grid, Typography } from "@mui/material";

function PurchaseCard() {
    const [purchases, setPurchases] = useState<any[]>([]);

    const fetchPurchases = async () => {
        try {
            const res = await getAllPurchases();
            if (res.data.success) {

                setPurchases(res.data.purchases)
            }

        } catch (err: any) {
            const message = err?.data?.message || "Error creating job";

            toast.error(message)

        }

    }
    console.log(purchases)

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





                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
        
        </>
    )
}

export default PurchaseCard