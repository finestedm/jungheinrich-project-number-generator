import UserToggler from '../components/UserToggler'
import StatusToggler from '../components/StatusToggler'
import { Dropdown, Form } from 'react-bootstrap'
import { MdOutlineFilterList } from 'react-icons/md'

export default function FiltersDropdown({changeSalesPersonInFilters, changeStatusInFilters, filters}) {
    return (
        <Dropdown className='p-0 m-0 h-100' autoClose="outside">
            <Dropdown.Toggle className='btn-ps-new h-prim' id="dropdown-basic">
                <span><MdOutlineFilterList /> <span className='d-none d-md-inline'>Filtry</span> </span>
            </Dropdown.Toggle>
            
                
            <Dropdown.Menu>
                <UserToggler changeSalesPersonInFilters={changeSalesPersonInFilters} filters={filters} />
                <StatusToggler changeStatusInFilters={changeStatusInFilters} filters={filters} />
            </Dropdown.Menu>
    </Dropdown>
    )
}

