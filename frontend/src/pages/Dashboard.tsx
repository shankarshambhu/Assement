import { Box, Card, CardContent, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"

function Dashboard() {
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [sales, setSales] = useState([])
  const [totalSales, setTotalSales] = useState(0);
  const [products, setProducts] = useState<any>([]);
  const [lastsales, setLastSales] = useState([])



  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/dashboard/totalitems");
      if (res.data.success) {
        setItems(res.data.itemToday);
        setTotalItems(res.data.itemToday.length);


      }

    } catch (error: any) {

    }

  }


  const fetchSales = async () => {
    try {
      const res = await axios.get("http://localhost:5000/dashboard/totalsales");
      if (res.data.success) {
        setSales(res.data.saleToday);
        setTotalSales(res.data.saleToday.length);


      }

    } catch (error: any) {

    }



  }

  const fetchLastSales = async () => {
    try {
      const res = await axios.get("http://localhost:5000/dashboard/lasttensales");
      if (res.data.success) {
        setLastSales(res.data.sales.slice(0,10));
      }


    } catch (error) {

    }
  }

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/product/lessproduct");
      if (res.data.success) {
        setProducts(res.data.products)

      }

    } catch (error: any) {


    }

  }
  useEffect(() => {

    fetchItems();
    fetchSales();
    fetchProducts();
    fetchLastSales();


  }, [])
  return (

    <>
      <Grid container spacing={3} mt={'2%'}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h5">Total items sold today </Typography>
              <Typography sx={{ mt: '2px' }}>{totalItems} </Typography>

            </CardContent>
          </Card>

        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h5">Total sales happened today </Typography>
              <Typography sx={{ mt: '2px' }}>{totalSales} </Typography>

            </CardContent>
          </Card>

        </Grid>


      </Grid>
          <Box mt={'5%'} flex={3} >
        <Typography variant="h6" >
          Products with stock less than 10
        </Typography>

        <TableContainer component={Paper} sx={{ width: '20%' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Tax</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product: any) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.currentStock}</TableCell>
                  <TableCell>{product.taxPercentage}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>


      <Box mt={4} flex={1}>
        <Typography variant="h6" >
          Last 10 Sales
        </Typography>
        <TableContainer component={Paper} sx={{ maxWidth: 600 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lastsales.map((sale:any) => (
                <TableRow key={sale.id}>
                  <TableCell>{sale.total}</TableCell>
                  <TableCell>{new Date(sale.date).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>



      {/* <Box mt={'5%'}>
        <Typography variant="h6" >
          Products with stock less than 10
        </Typography>

        <TableContainer component={Paper} sx={{ width: '20%' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Tax</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product: any) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.currentStock}</TableCell>
                  <TableCell>{product.taxPercentage}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>


      <Box mt={4}>
        <Typography variant="h6" >
          Last 10 Sales
        </Typography>
        <TableContainer component={Paper} sx={{ maxWidth: 600 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lastsales.map((sale:any) => (
                <TableRow key={sale.id}>
                  <TableCell>{sale.total}</TableCell>
                  <TableCell>{new Date(sale.date).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box> */}





    </>
  )
}

export default Dashboard