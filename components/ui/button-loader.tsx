import type { ComponentProps, FC } from 'react';
import { Button } from './button';
import { Spinner } from './spinner';

type Props = ComponentProps<typeof Button> & {loader?: boolean}

export const ButtonLoader: FC<Props> = ({ loader = false, children, disabled, ...props}) => {
  return <Button disabled={disabled ? disabled : loader} {...props}>
    {loader ? <Spinner   /> : null}
    {children}
  </Button>
};