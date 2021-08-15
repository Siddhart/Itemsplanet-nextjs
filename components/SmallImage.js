const SmallImage = ({ image, changeMainImage, imageAlt }) => {
  return (
    <a onClick={() => changeMainImage(image)}>
      <img alt={imageAlt} src={image} />
    </a>
  );
};

export default SmallImage;