export const numberFormatter =(num: number): string => {
    let formatter = Intl.NumberFormat('en', { notation: 'compact' });
    return formatter.format(num);
}
    

    
