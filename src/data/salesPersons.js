import KN from '../images/avatars/KN.jfif'
import RP from '../images/avatars/RP.jfif'
import MR from '../images/avatars/MR.png'
import MS from '../images/avatars/MS.png'
import MT from '../images/avatars/MT.png'
import PK from '../images/avatars/PK.png'
import unknown from '../images/avatars/unknown.svg'


const salesPersons = [
    { id: 1, value: 'Marcin Rączkowski', label: 'Marcin Rączkowski', photo: MR },
    { id: 2, value: 'Rafał Popielarski', label: 'Rafał Popielarski', photo: RP },
    { id: 3, value: 'Michał Tupacz', label: 'Michał Tupacz', photo: MT},
    { id: 4, value: 'Marcin Golasiński', label: 'Marcin Golasiński', photo: unknown },
    { id: 5, value: 'Krzysztof Grubka', label: 'Krzysztof Grubka', photo: unknown },
    { id: 6, value: 'Mariusz Ślusarek', label: 'Mariusz Ślusarek', photo: MS },
    { id: 7, value: 'Piotr Kruk', label: 'Piotr Kruk', photo: PK},
    { id: 8, value: 'Krystian Nowak', label: 'Krystian Nowak', photo: KN },
    { id: 9, value: 'Bartosz Marszula', label: 'Bartosz Marszula', photo: unknown },
]

//sorting of the users alphabetically by last name

salesPersons.sort(function(a, b){
    if(a.value.substring(a.value.indexOf(' ')) < b.value.substring(b.value.indexOf(' '))) { return -1; }
    if(a.value.substring(a.value.indexOf(' ')) > b.value.substring(b.value.indexOf(' '))) { return 1; }
    return 0;
})

export { salesPersons }