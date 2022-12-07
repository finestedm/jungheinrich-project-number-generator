import KN from '../images/avatars/KN.jfif'
import RP from '../images/avatars/RP.jfif'

const users = [
    { value: 'Marcin Rączkowski', label: 'Marcin Rączkowski' },
    { value: 'Rafał Popielarski', label: 'Rafał Popielarski', photo: RP },
    { value: 'Michał Tupacz', label: 'Michał Tupacz' },
    { value: 'Marcin Golasiński', label: 'Marcin Golasiński' },
    { value: 'Krzysztof Grubka', label: 'Krzysztof Grubka' },
    { value: 'Mariusz Ślusarek', label: 'Mariusz Ślusarek' },
    { value: 'Piotr Kruk', label: 'Piotr Kruk' },
    { value: 'Krystian Nowak', label: 'Krystian Nowak', photo: KN },
    { value: 'Bartosz Marszula', label: 'Bartosz Marszula' },
]

//sorting of the users alphabetically by last name

users.sort(function(a, b){
    if(a.value.substring(a.value.indexOf(' ')) < b.value.substring(b.value.indexOf(' '))) { return -1; }
    if(a.value.substring(a.value.indexOf(' ')) > b.value.substring(b.value.indexOf(' '))) { return 1; }
    return 0;
})

export { users }