import './GridContainer.css'

const specs =
{
    pachet: "Premium",
    lastRefreshDays: 5,
    nrWarranties: 15,
    nrExpire: 10,
}
    ;

function GridContainer() {
    return (
        <div className="grid-container">
            <div className="grid-item grid-item-1 flex">
                <div className="item-1">
                    <div className='big-number'>
                        {specs.lastRefreshDays}
                    </div>
                    <div className='item-1-text'>
                        Days since last check
                    </div>
                </div>

            </div>
            <div className="grid-item grid-item-2">
                <div className='item-2-row-1 flex'>
                    <div className="big-number">
                        {specs.nrWarranties}
                    </div>
                    <div className="item-1-text">
                        Managed warranties
                    </div>
                </div>
            </div>
            <div className="grid-item grid-item-2">
                <div className='item-2-row-1 flex'>
                    <div className="big-number">
                        {specs.nrWarranties}
                    </div>
                    <div className="item-1-text">
                        Managed warranties
                    </div>
                </div>
            </div>
            <div className="grid-item grid-item-3">
                <div className={`item-2-row-2 flex ${specs.nrExpire && 'pericol'}`}>
                    <div className={`big-number`}>
                        {specs.nrExpire}
                    </div>
                    <div className="item-1-text">
                        Warranties with less than 7 days before expiring
                    </div>
                    {specs.nrExpire &&
                        <svg className="danger-symbol" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 22H22L12 2Z" fill="#FFD700" stroke="#856404" stroke-width="2" />
                            <circle cx="12" cy="17" r="1" fill="#856404" />
                            <path d="M12 6V14" stroke="#856404" stroke-width="2" stroke-linecap="round" />
                        </svg>
                    }
                </div>
            </div>
        </div>
    )
}
export default GridContainer