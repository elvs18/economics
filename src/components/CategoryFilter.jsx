import { useLanguage } from '../context/LanguageContext';
import { CATEGORIES } from '../constants/categories';
import {
  Layers,
  Store,
  Globe,
  Landmark,
  TrendingUp,
  Compass,
  Sparkles
} from 'lucide-react';

const ICON_MAP = {
  Layers,
  Store,
  Globe,
  Landmark,
  TrendingUp,
  Compass,
  Sparkles
};

export default function CategoryFilter({ selectedCategory, onSelectCategory, terms = [] }) {
  const { getCategoryLabel } = useLanguage();

  const getCount = (catId) => {
    if (catId === 'all') return terms.length;
    return terms.filter(t => t.category === catId).length;
  };

  return (
    <div className="category-filter-wrap" role="toolbar" aria-label="Фильтр по категориям">
      <div className="category-scroll-container">
        {CATEGORIES.map(cat => {
          const IconComponent = ICON_MAP[cat.icon] || Sparkles;
          const isSelected = selectedCategory === cat.id;
          const count = getCount(cat.id);

          return (
            <button
              key={cat.id}
              type="button"
              className={`category-chip ${isSelected ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat.id)}
            >
              <IconComponent size={15} className="category-icon" />
              <span className="category-text">{getCategoryLabel(cat.id)}</span>
              <span className="category-badge">{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
