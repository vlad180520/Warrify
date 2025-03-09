import './Warranties.css'

const warranties = [
    {
        prdName: "MacBook Pro M3",
        dataExp: "18.05.2027",
        dataCump: "16.12.2023",
        comp: "Istyle"

    },
    {
        prdName: "Asus ROG Zephyrus",
        dataExp: "29.03.2028",
        dataCump: "16.12.2024",
        comp: "Altex"
    },
    {
        prdName: "Acer Nitro 5",
        dataExp: "28.02.2026",
        dataCump: "16.12.2023",
        comp: "Emag"
    }
];


function Warranties() {
    return (
        <div className="warr-container">
            <ul className="warr-header">
                <li>Product Name</li>
                <li>Date bought</li>
                <li>Date of expirance</li>
                <li>Product provider</li>
            </ul>
            {warranties.map((warranty, index) => (
                <div key={index} className="warr-entry">
                    <ul className="warr-line">
                        <li className="warr-element-prdName">{warranty.prdName}</li>
                        <li className="warr-element-dataCump">{warranty.dataCump}</li>
                        <li className="warr-element-dataExp">{warranty.dataExp}</li>
                        <li className="warr-element-com">{warranty.comp}</li>
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default Warranties