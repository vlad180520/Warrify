import Header from "../components/Header"
import './styles/Contact.css'
import left from "../assets/people.jpg"
function Contact () {
    return (
        <>
            <Header />
            <div className="maxBox">
                <div className="background-box">
                    <form action="">
                        <label htmlFor="">
                            What's your email?
                            <input type="email" placeholder="warrify@mail.com"/>
                        </label>
                        <label htmlFor="">
                            Describe your problem
                            <textarea rows={6}/>
                        </label>
                        <input type="submit" />
                    </form>
                    <div className="image">
                        <img src={left} />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Contact