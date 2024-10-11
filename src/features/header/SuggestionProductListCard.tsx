import { Product } from '../../services/apiProducts';
import { useNavigate } from 'react-router-dom';

type SuggestionProductListCardProps = {
  suggestion: Product;
  onSuggestionClick: () => void; // New callback prop
};

function SuggestionProductListCard({
  suggestion,
  onSuggestionClick,
}: SuggestionProductListCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product-detail?productId=${suggestion.id}`);
    onSuggestionClick();
  };

  return (
    <li
      className="flex cursor-pointer items-center space-x-4 p-4 transition-colors duration-200 hover:bg-sellers-background"
      onClick={handleClick}
    >
      <img
        src={suggestion.thumbnail}
        alt={suggestion.title}
        className="h-16 w-16 rounded-lg object-cover"
      />
      <h4 className="text-md font-semibold text-text">{suggestion.title}</h4>
    </li>
  );
}

export default SuggestionProductListCard;
