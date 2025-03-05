import './GarantiiBenefits.css'

function GarantiiBenefits() {
    return (
        <section className="garantii-benefits">
            <h2 className="title-benefit">De ce să îți organizezi garanțiile la noi</h2>
            <div className="flex-benefit">
                <div className="benefit-card">
                    <h3 className="benefit-title">Garanțiile tale sunt centralizate</h3>
                    <p className="benefit-description">
                        Toate documentele și datele despre garanții sunt stocate într-un singur loc sigur,
                        cu acces permis doar ție sau persoanelor autorizate de tine.
                    </p>
                </div>

                <div className="benefit-card">
                    <h3 className="benefit-title">Protecție împotriva pierderii</h3>
                    <p className="benefit-description">
                        Beneficiezi de backup automat și versiune de securitate pentru documente.
                        Chiar dacă pierzi factura originală, garanția rămâne valabilă în sistemul nostru.
                    </p>
                </div>

                <div className="benefit-card">
                    <h3 className="benefit-title">Notificări inteligente</h3>
                    <p className="benefit-description">
                        Primești alerte automate pentru expirarea garanțiilor, reînnoire sau revizii periodice,
                        indiferent de device-ul folosit (aplicații mobile, desktop sau notificări pe web).
                    </p>
                </div>
            </div>
        </section>
    );
};

export default GarantiiBenefits