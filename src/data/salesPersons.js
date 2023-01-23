import KN from '../images/avatars/KN.jfif'
import RP from '../images/avatars/RP.jfif'
import MR from '../images/avatars/MR.png'
import MS from '../images/avatars/MS.png'
import MT from '../images/avatars/MT.png'
import PK from '../images/avatars/PK.png'
import unknown from '../images/avatars/unknown.svg'


const salesPersons = [
    { value: 'Marcin Rączkowski', label: 'Marcin Rączkowski', photo: MR },
    { value: 'Rafał Popielarski', label: 'Rafał Popielarski', photo: RP },
    { value: 'Michał Tupacz', label: 'Michał Tupacz', photo: MT},
    { value: 'Marcin Golasiński', label: 'Marcin Golasiński', photo: unknown },
    { value: 'Krzysztof Grubka', label: 'Krzysztof Grubka', photo: unknown },
    { value: 'Mariusz Ślusarek', label: 'Mariusz Ślusarek', photo: MS },
    { value: 'Piotr Kruk', label: 'Piotr Kruk', photo: PK},
    { value: 'Krystian Nowak', label: 'Krystian Nowak', photo: KN },
    { value: 'Bartosz Marszula', label: 'Bartosz Marszula', photo: unknown },
]

//sorting of the users alphabetically by last name

salesPersons.sort(function(a, b){
    if(a.value.substring(a.value.indexOf(' ')) < b.value.substring(b.value.indexOf(' '))) { return -1; }
    if(a.value.substring(a.value.indexOf(' ')) > b.value.substring(b.value.indexOf(' '))) { return 1; }
    return 0;
})

export { salesPersons }