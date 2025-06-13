import { useNavigate } from 'react-router-dom';

const Search = (props) => {
    const { setSearch } = props;
    const navigate = useNavigate();
    const handleInput = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const params = new URLSearchParams(location.search);
            params.set("s", e);
            navigate({ search: params.toString() });
        }
    }
    return (
        <>
            <input
                type="text"
                placeholder="Search now..."
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleInput}
                className="border px-3 py-1 rounded text-sm w-64"
            />
        </>
    )
}

export default Search