import { cn } from '@/lib/utils';
import { TypographyBlockquote, TypographyInlineCode, TypographyLead, TypographyMuted, TypographyP, TypographySmall } from './ui/typography';

type ScoreDisplayProps = React.ComponentProps<'div'> & {
  label: string;
  score: number;
};

function ScoreDisplay({
  className,
  label,
  score,
  ...props
}: ScoreDisplayProps) {
  return (
    <div
      className={cn(
        'bg-card flex flex-col py-2 px-3 rounded-xl border shadow-sm text-center',
        className
      )}
      {...props}
    >
      <TypographyMuted>{label}</TypographyMuted>
      <TypographyMuted className='font-semibold'>{score}</TypographyMuted>
    </div>
  );
}

export { ScoreDisplay };
