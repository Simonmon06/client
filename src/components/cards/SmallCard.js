import {currencyFormatter} from '../../actions/stripe'
import { diffDays } from '../../actions/item'
import { useHistory, Link } from 'react-router-dom'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'

const SmallCard = ({item, handleItemDelete, owner= false, showViewMoreButton = true,}) => {
    console.log(item.price)
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
                            <p className='alert alert-info'>{item.location}</p>
                            <p className= 'card-text'>{`${item.content.substring(1,200)}...`}</p>
                            <p className='card-text'>
                                <span className='float-right text-primary'>
                                    {diffDays(item.from, item.to)}
                                    {diffDays(item.from, item.to) <=1? ' day ': ' days '}
                                    left
                                </span>
                            </p>
                            <p className='card-text'>{item.condition}</p>


                            <div className='d-flex justify-content-between h4'>
                                { showViewMoreButton && (
                                    <button 
                                        onClick={() => history.push(`/item/${item._id}`)} 
                                        className="btn btn-primary">
                                        Show more...
                                    </button>
                                )
                                }
                                {
                                    owner && (
                                        <>
                                        <Link to={`/item/edit/${item._id}`}>
                                        <EditOutlined className='text-warning'/>
                                        </Link>

                                        <DeleteOutlined 
                                            onClick={()=> handleItemDelete(item._id)}
                                            className='text-danger'
                                        />
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SmallCard
