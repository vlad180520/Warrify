import Header from "../components/Header"
import './styles/Contact.css'
import left from "../assets/people.jpg"
function Contact () {
    return (
        <>
            <Header />
            <div className="maxBox">
                <div className="background-box">
                    <form className="form-contact" action="">
                        <label className="label-contact"htmlFor="">
                            What's your name?
                            <input className="input-contact" type="name" placeholder="John Smith"/>
                        </label>
                        <label className="label-contact"htmlFor="">
                            What's your email?
                            <input className="input-contact" type="email" placeholder="warrify@mail.com"/>
                        </label>
                        <label className="label-contact" htmlFor="">
                            Describe your problem
                            <textarea rows={6}/>
                        </label>
                        <input className="input-contact" type="submit" />
                    </form>
                    <div className="image-contact">
                        <img src={left} />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Contact