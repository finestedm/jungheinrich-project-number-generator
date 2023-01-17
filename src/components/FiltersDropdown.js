import UserToggler from '../components/UserToggler'
import StatusToggler from '../components/StatusToggler'
import { Dropdown, Form } from 'react-bootstrap'
import { MdOutlineFilterList } from 'react-icons/md'
import { activeStatusCounter } from '../components/StatusToggler'

export default function FiltersDropdown({changeSalesPersonInFilters, changeStatusInFilters, filters}) {
    return (
        <Dropdown autoClose="outside">
            <Dropdown.Toggle className='btn-ps-new' id="dropdown-basic">
                <span><MdOutlineFilterList /> Filtry </span> {activeStatusCounter(filters)}
            </Dropdown.Toggle>
            
                
            <Dropdown.Menu>
                <UserToggler changeSalesPersonInFilters={changeSalesPersonInFilters} filters={filters} />
                <StatusToggler changeStatusInFilters={changeStatusInFilters} filters={filters} />
            </Dropdown.Menu>
    </Dropdown>
    )
}

