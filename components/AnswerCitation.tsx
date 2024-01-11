import { cn } from '../utils/cn';
import { usePageContext } from '../utils/usePageContext';

type Props = {
  reference: string;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
};

export const AnswerCitation = ({ reference }: Props) => {
  const { selectedCitation, setSelectedCitation } = usePageContext();

  return (
    <a
      href={selectedCitation === `${reference}` ? `#${reference}` : undefined}
      onClick={() => {
        if (selectedCitation === `${reference}`) {
          setSelectedCitation(null);
        } else {
          setSelectedCitation(`${reference}`);
        }
      }}
    >
      {' '}
      <button
        className={cn(
          'px-[6px] relative -top-[2px] rounded-sm bg-white text-sm font-semibold text-[#0a3366] hover:bg-[#0a3366] hover:text-white transition ease-linear',
          selectedCitation === reference && 'bg-[#0a3366] text-white'
        )}
      >
        {reference}
      </button>
    </a>
  );
};
