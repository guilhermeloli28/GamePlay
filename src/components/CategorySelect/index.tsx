import React from "react";
import { styles } from './styles';
import { ScrollView } from 'react-native';
import { categories } from '../../utils/categories';
import Category from '../CategorySelect/Category';

type Props = {
    categorySelected: string;
    setCategory: (categoryId: string) => void;
    hasCheckBox?: boolean;
}

function CategorySelect({ categorySelected, setCategory, hasCheckBox = false }: Props) {
    return (
        <ScrollView
            horizontal
            style={styles.container}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 46 }}
        >
            {categories.map(category => (
                <Category
                    key={category.id}
                    title={category.title}
                    icon={category.icon}
                    checked={category.id === categorySelected}
                    onPress={() => setCategory(category.id)}
                    hasCheckBox={hasCheckBox}
                />
            ))}
        </ScrollView>
    )
}

export default CategorySelect;