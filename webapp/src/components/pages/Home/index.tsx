import { useQuery } from '@apollo/client';
import { Button, PageTemplate, Select, Title } from '@components';
import { useLanguageContext } from '@context';
import { RouteComponentProps } from '@reach/router';
import { BookCollection } from '@types';
import React, { FC, MouseEvent } from 'react';
import { QUERY_BOOK_LIST } from 'src/core/graphql/queries';
import { useTheme } from 'src/tools/hooks';

import { options } from './utils';

interface HomePageProps extends RouteComponentProps {}

export const Home: FC<HomePageProps> = () => {
    const { loading, error, data } = useQuery<BookCollection>(QUERY_BOOK_LIST);
    const { theme, setTheme } = useTheme();
    const { translate, changeLanguage, language } = useLanguageContext();

    const computedTheme = theme === 'light' ? 'dark' : 'light';

    const setCurrentTheme = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setTheme(computedTheme);
    };

    const handleChangeLanguage = () => {
        changeLanguage(language === 'fr' ? 'en' : 'fr');
    };

    const renderData = () => {
        if (loading) return <div>Loading...</div>;
        if (error) return <p>ERROR</p>;
        if (!data) return <p>Not found</p>;

        return (
            <>
                {data?.books.map(({ author, title, id }) => {
                    return (
                        <div key={id}>
                            <div>{title}</div>
                            <div>{author}</div>
                        </div>
                    );
                })}
            </>
        );
    };

    return (
        <PageTemplate>
            <Title>{translate('app.title')}</Title>
            {renderData()}
            <Button label="Change theme" onClick={setCurrentTheme} />
            <Select options={options} onChange={handleChangeLanguage} name="language" value={language} />
        </PageTemplate>
    );
};
