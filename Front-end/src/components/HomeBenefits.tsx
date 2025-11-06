import './HomeBenefits.css'

function HomeBenefits() {
    return (
        <section className="garantii-benefits-home">
            <h2 className="title-benefit-home">Why choose us to manage your guarantees?</h2>
            <div className="flex-benefit-home">
                <div className="benefit-home-card">
                    <h3 className="benefit-home-title">Accessing your guarantees is effortless</h3>
                    <p className="benefit-home-description">
                    You or your authorized individuals are the only 
                    ones who can access all documents and warranty 
                    data stored in one secure place.
                    </p>
                </div>

                <div className="benefit-home-card">
                    <h3 className="benefit-home-title">Protection against loss</h3>
                    <p className="benefit-home-description">
                    You get automatic backup and security versions for your documents. 
                    The warranty is still valid in our system even if you lose the original invoice.
                    </p>
                </div>

                <div className="benefit-home-card">
                    <h3 className="benefit-home-title">Smart notifications</h3>
                    <p className="benefit-home-description">
                    Get notifications automatically when your warranty expires, 
                    renews, or undergoes periodic revisions, regardless of the 
                    device you use (mobile apps, desktop, or web notifications).
                    </p>
                </div>
            </div>
        </section>
    );
};

export default HomeBenefits