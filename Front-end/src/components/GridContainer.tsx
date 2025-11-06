import './GridContainer.css'
import { useState,useEffect,useRef } from 'react';
import GmailButton from './GmailLogin';
import FileImport from './ImportFile'

const specs =
{
    pachet: "Premium",
    lastRefreshDays: 5,
    nrWarranties: 15,
    nrExpire: 10,
}
    ;

function GridContainer() {
    const [showImportModal, setShowImportModal] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    // Handler pentru click în afara modalului
    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setShowImportModal(false);
        }
    };
    useEffect(() => {
        if (showImportModal) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showImportModal]);

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
                        Remaining warranties
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
                    <button onClick={() => setShowImportModal(true)} className='button buttoninvert grid'>Import</button>
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
                        <svg fill="#FF0000" className="danger-symbol" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 30.334 30.334">
                            <g>
                                <rect width="100%" height="100%" fill="white" />
                                <path d="M15.167,0C6.805,0,0.001,6.804,0.001,15.167c0,8.362,6.804,15.167,15.166,15.167c8.361,0,15.166-6.805,15.166-15.167
                               C30.333,6.804,23.528,0,15.167,0z M17.167,25.667h-4v-4.5h4V25.667z M17.167,19.542h-4V5.167h4V19.542z"/>
                            </g>
                        </svg>
                    }
                </div>
            </div>
            {showImportModal && (
                <div className="modal-overlay">
                    <div className="modal-content" ref={modalRef}>
                        <div className="modal-header">
                            <h2>Import Warranties</h2>
                            <button
                                onClick={() => setShowImportModal(false)}
                                className="modal-close"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                        <GmailButton />
                        {/* <button className='button buttoninvert grid-modal'>
                            Import Manual
                            < FileImport />
                        </button> */}
                        < FileImport />
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}
export default GridContainer