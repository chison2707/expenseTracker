import { message } from 'antd';
import { FaTrash } from "react-icons/fa";
import { delAcc } from '../../services/accountService';


const DelAcc = (props) => {
    const { token, handleReload, acc } = props
    const handleDel = async (id) => {
        const result = await delAcc(id, token);

        if (result.status === 422) {
            result.errors.forEach((err) => message.error(err));
            return;
        }

        if (result.status === 400) {
            message.error(result.message);
            return;
        }

        message.success(result.message);
        handleReload();
    };
    return (
        <>
            <button
                className="text-red-500 hover:text-red-700 cursor-pointer"
                onClick={() => handleDel(acc.id)}
            >
                <FaTrash />
            </button>
        </>
    )
}

export default DelAcc