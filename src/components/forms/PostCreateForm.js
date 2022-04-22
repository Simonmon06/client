
const PostCreateForm = (props) => {
    const {values, handleChange, handleImageChange, handleSubmit} = props
    const {title, content} = values;
    return (
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label className='btn btn-outline-secondary btn-block m-2 text-left'>
                    Image
                    <input 
                        type='file' 
                        name='image' 
                        onChange={handleImageChange} 
                        accept='image/*' 
                        hidden
                    />
                </label>

                <input 
                    type='text' 
                    name= 'title' 
                    onChange={handleChange} 
                    placeholder='Title' 
                    className='form-control m-2' 
                    value={title}
                />

                <textarea 
                    name= 'content' 
                    onChange={handleChange} 
                    placeholder='Content' 
                    className='form-control m-2' 
                    value={content}
                />
            </div>

            <button className='btn btn-outline-primary m-2'>Save</button>
        </form>

    )
}

export default PostCreateForm;