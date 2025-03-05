import Header from "../components/Header"
import './styles/Home.css'

function Home() {
    return (
        <>
            <Header />
            <div className="background">
                <div className="main-content">
                    <div className="text">
                        <p>Warrify</p>
                        <p>A new way of managing warranties</p>
                        <p>Efficient. Organized. Simple</p>
                    </div>
                    <div className="image">
                        <img src="./../assets/info.png" alt="da"/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home