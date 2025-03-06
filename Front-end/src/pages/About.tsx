import Header from "../components/Header"
import './styles/About.css'
function About () {
    return (
        <>
            <Header />
            <div className="mainBox">
                <div className="color"></div>
                <div className="textBox">
                    <div className="block">
                        <h1>Overview</h1>
                        <div className="paragraph">
                            <p>Warrify is a program on the web that 
                                assists companies in automating the extraction 
                                and organization of warranty information from emails, 
                                and securely storing it in a centralized database.</p>
                        </div>
                    </div>
                    <div className="block">
                        <h1>Our purpose</h1>
                        <div className="paragraph">
                            <p>Automating the extraction, organization, 
                                and tracking of warranty data, Warrify aims 
                                to solve critical pain points for companies, 
                                enabling them to save time, reduce costs, and 
                                improve operational efficiency.</p>
                        </div>
                        <h3>Eliminate Manual Hassles</h3>
                        <p><b>Problem:</b> Businesses waste hours manually scanning emails, 
                        spreadsheets, or paper records for warranty details.</p>
                        <p><b>Purpose:</b> Automate tedious data entry and 
                        reduce human error, freeing teams to focus on higher-value work.</p>
                        <h3>Centralize Scattered Data</h3>
                        <p><b>Problem:</b> Warranty information is often buried in emails, 
                        PDFs, or disorganized systems, leading to missed deadlines or lost coverage.</p>
                        <p><b>Purpose:</b> Create a single source of truth for all warranty data, 
                        ensuring easy access, searchability, and audit readiness.</p>
                        <h3>Support Scalable Growth</h3>
                        <p><b>Problem:</b> Problem: Manual processes become unsustainable as businesses grow 
                        (i.e. handling 1,000 vs. 100,000 warranties).</p>
                        <p><b>Purpose:</b> Provide a cloud-based, scalable solution that grows with the business, 
                        reducing administrative bottlenecks.</p>
                    </div>
                </div>
                <div className="color"></div>
            </div>
        </>
    )
}
export default About