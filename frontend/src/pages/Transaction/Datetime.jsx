import { useNavigate } from 'react-router-dom';

const Datetime = (props) => {
    const { setStartDate, setEndDate } = props;
    const navigate = useNavigate();
    const handleDateChange = (type, value) => {
        const params = new URLSearchParams(location.search);
        if (type === 'df') {
            setStartDate(value);
            params.set("df", value);
        } else {
            setEndDate(value);
            params.set("dt", value);
        }

        navigate({ search: params.toString() });
    }
    return (
        <>
            <div className="flex items-center gap-2 text-sm">
                <label>Filter</label>
                <input type="date"
                    className="border rounded px-2 py-1"
                    onChange={(e) => handleDateChange('df', e.target.value)} />
                <span>to</span>
                <input type="date"
                    className="border rounded px-2 py-1"
                    defaultValue={new Date().toISOString().split("T")[0]}
                    onChange={(e) => handleDateChange('dt', e.target.value)} />
            </div>
        </>
    )
}

export default Datetime