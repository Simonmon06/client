import { currencyFormatter } from '../../actions/utils'
import { useHistory, Link } from 'react-router-dom'


const ItemCard = ({item, handleItemDelete, owner, showViewMoreButton,}) => {
    const history = useHistory()
    const hasImg = item.image && item.image.contentType
    return (
        <div className='col mb-4'>
        <div className="card text-white bg-dark">
            <div className='row-8'>
            {
                hasImg ?
                <img 
                    className = 'card-image img img-fluid'
                    src={`${process.env.REACT_APP_API}/item/image/${item._id}`}
                    alt='item image'
                />
                :
                <img 
                    className = 'card-image img img-fluid'
                    src='https://via.placeholder.com/800x500.png?text=NO+PICTURE' 
                    alt='default item image'
                />
            }
            </div>
            <div className='row-4'>
                <div className="card-body ">
                    <h3 className="card-title text-white">{item.title}</h3>
                    <p className="card-text">{`${item.content.substring(0,200)}...`}</p>
                    <p className="card-text" >{item.condition}</p>
                    {item.paid && (
                         <p className="card-text" style={{color: 'red'}}>Sold out</p>
                    )}
                    
                    <p className='card-text'>
                                            {
                                                currencyFormatter({
                                                    amount: item.price,
                                                    currency: 'cad'
                                                })
                                            }
                    </p>
                    { showViewMoreButton && (
                        <button 
                            
                            onClick={() => history.push(`/item/${item._id}`)} 
                            className="btn btn-secondary float-right">
                            Details
                        </button>
                    )}
                    {
                        owner && (
                            <div>
                            <Link to={`/item/edit/${item._id}`}>
                            <a className='bi bi-wrench-adjustable-circle h3'/>
                            </Link>

                            <a 
                                onClick={()=> handleItemDelete(item._id)}
                                className='bi bi-trash-fill h3'
                            />
                            </div>
                        )
                    }
                </div>
        </div>
      </div>
    </div>
    )
}

export default ItemCard
