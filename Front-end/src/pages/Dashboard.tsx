import Header from "../components/Header"
import GridContainer from "../components/GridContainer"
import LoginLightbox from "../components/LoginLightbox";

const loggedIn = true;
function Dashboard () {
    return (
        <>
        <Header />
        {!loggedIn&&<LoginLightbox/>}
        <GridContainer />
        </>
    )
}
export default Dashboard