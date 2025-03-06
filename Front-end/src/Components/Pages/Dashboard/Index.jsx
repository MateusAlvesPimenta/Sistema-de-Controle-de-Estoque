import { Container } from "reactstrap"
import { DashboardHeader } from "./DashboardHeader"
import { DashboardContent } from "./DashboardContent"

export const Dashboard = () => {

    return (
        <Container className="">
            <DashboardHeader />
            <DashboardContent />
        </Container>
    )
}