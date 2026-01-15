import { VscSettings } from "react-icons/vsc";
import "./ButtonFilterBar.css";

type ButtonFilterBarProps = {
  onOpen: () => void;
};

export default function ButtonFilterBar({ onOpen }: ButtonFilterBarProps) {
  return (
    <div className="filter-btn-wrapper">
      <button type="button" onClick={onOpen} className="filter-trigger-btn">
        filtrer <VscSettings size={18} />
      </button>
    </div>
  );
}
