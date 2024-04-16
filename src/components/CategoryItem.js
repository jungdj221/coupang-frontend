import {
  FaCaretRight,
  FaShirt,
  FaPumpSoap,
  FaBaby,
  FaBowlFood,
  FaMugSaucer,
  FaBottleDroplet,
  FaCouch,
  FaCar,
} from "react-icons/fa6";

const CategoryItem = ({ category }) => {
  return (
    <div className="category-item">
      {category.cateCode === 1 ? (
        <FaShirt />
      ) : category.cateCode === 2 ? (
        <FaPumpSoap />
      ) : category.cateCode === 3 ? (
        <FaBaby />
      ) : category.cateCode === 4 ? (
        <FaBowlFood />
      ) : category.cateCode === 5 ? (
        <FaMugSaucer />
      ) : category.cateCode === 6 ? (
        <FaBottleDroplet />
      ) : category.cateCode === 7 ? (
        <FaCouch />
      ) : (
        <FaCar />
      )}
      <span>{category.cateName}</span>
      <FaCaretRight />
      <div className="category-sub-item">
        <ul>
          {category.subCategories.map((sub) => (
            <li key={sub.cateCode}>
              <a href="#">{sub.CateName}</a>
            </li>
          ))}
        </ul>
        <img src={category.cateUrl} />
      </div>
    </div>
  );
};
export default CategoryItem;
