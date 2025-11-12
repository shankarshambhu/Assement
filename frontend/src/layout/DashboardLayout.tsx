import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"
import Navbar from "../component/Navbar"

function DashBoardLayout() {
    return (
        <>
            <Box display={'flex'} flexDirection={'column'} minHeight={'100vh'}>
                <Navbar />

                <Box
                    component="main"
                    flex={4}
                    bgcolor="background.default"
                    p={3}
                    overflow="auto">

                    <Outlet />

                </Box>

            </Box>
        </>


    )
}

export default DashBoardLayout