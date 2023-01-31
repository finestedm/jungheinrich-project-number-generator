import UserToggler from '../components/UserToggler'
import StatusToggler from '../components/StatusToggler'
import { Dropdown, Form, Stack } from 'react-bootstrap'
import { MdOutlineFilterList } from 'react-icons/md'

export default function FiltersDropdown({changeSalesPersonInFilters, changeStatusInFilters, filters}) {
    return (
        <Dropdown className='p-0 m-0 h-100' autoClose="outside">
            <Dropdown.Toggle className='btn-ps-outline-border h-100 d-flex justify-content-between align-items-center' id="dropdown-basic">
                <MdOutlineFilterList size={'1.25em'} /><span className='d-none d-md-inline ms-2'>Filtry</span>
            </Dropdown.Toggle>
            
                
            <Dropdown.Menu>
                <div className='d-flex flex-column gap-3'>
                    <UserToggler changeSalesPersonInFilters={changeSalesPersonInFilters} filters={filters} />
                    <StatusToggler changeStatusInFilters={changeStatusInFilters} filters={filters} />
                </div>
            </Dropdown.Menu>
    </Dropdown>
    )
}

