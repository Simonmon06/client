import { currencyFormatter } from '../../actions/utils'

import { useHistory, Link } from 'react-router-dom'
import {useState} from 'react'
import OrderModal from '../modals/OrderModal'

const OrderCard = ({item, session, orderedBy}) => {
    const [showModal, setShowModal] = useState(false)
    console.log('item info: ====>', item)
    const history = useHistory()
    return (
        <>
            <div className='card mb-3 '>
                <div className='row no-gutters'>
                    <div className='col-md-4'>
                        { item.image && item.image.contentType ? (
                            <img 
                                className = 'card-image img img-fluid'
                                src={`${process.env.REACT_APP_API}/item/image/${item._id}`}
                                alt='item image'
                            />
                        ) : (
                            <img 
                                className = 'card-image img img-fluid'
                                src='https://via.placeholder.com/800x500.png?text=NO+PICTURE' 
                                alt='default item image'
                            />
                        )}
                    </div>

                    <div className='col-md-8'>
                        <div className='card-body'>
                            <h3 className="card-title">
                                {item.title}{' '}
                                <span className='float-right text-primary'>
                                    {
                                        currencyFormatter({
                                            amount: item.price,
                                            currency: 'cad'
                                        })
                                    }
                                </span>{' '}
                            </h3>
                            <p className= 'card-text'>{item.size}</p>
                            <p className='alert alert-info'>{item.location}</p>
                            <p className= 'card-text'>{`${item.content.substring(0,200)}...`}</p>
                            <p className='card-text'>{item.condition}</p>

                            {showModal && (
                                <OrderModal
                                session={session}
                                orderedBy={orderedBy}
                                showModal={showModal}
                                setShowModal={setShowModal}
                                />
                            )}
                            <div className="d-flex justify-content-between h4">
                                <button
                                    onClick={() => setShowModal(!showModal)}
                                    className="btn btn-primary"
                                >
                                    Show Payment info
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderCard
