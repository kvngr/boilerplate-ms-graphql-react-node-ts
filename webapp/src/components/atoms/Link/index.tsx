import { Link as RouterLink } from '@reach/router';
import { LinkProps } from '@types';
import React, { memo } from 'react';
import styled from 'styled-components';

const NavLink = styled(RouterLink)``;

const A = styled.a``;

export const Link = memo(<T extends {}>({ to, children, ...rest }: LinkProps<T>) => {
    if ('href' in rest) return <A {...rest}>{children}</A>;
    return <NavLink to={to}>{children}</NavLink>;
});
