import { FC, MouseEventHandler, ReactElement } from 'react';
import { cn } from '@/lib/utils';

type ActionButtonProps = {
    handleClick: MouseEventHandler<HTMLButtonElement>;
    children: ReactElement;
    className?: string;
}

const ActionButton: FC<ActionButtonProps> = ({ handleClick, children, className }) => {
    return (
        <button
            className={cn(
                'min-w-[20px] p-1 text-neutral-400 hover:text-neutral-600',
                className
            )}
            onClick={handleClick}
        >
            {children}
        </button>
    );
};

export default ActionButton;