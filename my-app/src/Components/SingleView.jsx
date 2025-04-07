const SingleView = (props) => {
  const {item, setSelectedItem} = props;
  return (
    // TODO: Add JSX for displaying a mediafile here
    // - use e.g. a <dialog> element for creating a modal
    // - use item prop to render the media item details
    // - use img tag for displaying images
    // - use video tag for displaying videos

    // {item && (
    //   <div className="modal">
    //     <h2>{item.title}</h2>
    //     <p>{item.description}</p>
    //     {item.media_type.startsWith('image/') ? (
    //       <img src={item.filename} alt={item.title} />
    //     ) : (
    //       <video controls>
    //         <source src={item.filename} type={item.media_type} />
    //         Your browser does not support the video tag.
    //       </video>
    //     )}
    //     <button onClick={() => setSelectedItem(null)}>Close</button>
    //   </div>
    // )}

    // item && truthy check :3 should not be falsy :3 uwu

    <>
    {item && (
      <dialog open>
        {item.media_type.includes('video') ? <video src={item.filename} controls/> : <img src={item.filename} alt={item.title} />}
        <button onClick={() => setSelectedItem(null)}>&#10006;</button>
        <img src={item.filename} alt={item.title} />
        <h2>{item.title}</h2>
        <p>{item.description}</p>
      </dialog>
      )}
    </>
  );
};
export default SingleView;
